import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = 3000;

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));

function containsSensitive(text = "") {
  const rrn = /\b\d{6}-?\d{7}\b/;      // 주민등록번호
  const cardOrAcct = /\b\d{12,19}\b/;  // 카드/계좌 가능성 긴 숫자
  return rrn.test(text) || cardOrAcct.test(text);
}

app.post("/api/chat", async (req, res) => {
  try {
    const message = (req.body?.message || "").toString().trim();
    if (!message) return res.status(400).json({ answer: "질문이 비어있어요." });

    if (containsSensitive(message)) {
      return res.status(400).json({
        answer:
          "개인정보(주민등록번호/계좌번호 등)가 포함된 것으로 보여요. 개인정보는 입력하지 말고 담당 부서로 문의해 주세요."
      });
    }
    const apiKey = (process.env.OPENAI_API_KEY || "").trim();
if (!apiKey.startsWith("sk-") || apiKey.length < 20) {
  return res.json({
    answer:
`[데모모드]
전입신고(예시) 안내:
1) 요약: 전입 후 14일 이내 신고가 원칙입니다.
2) 절차: (온라인/방문) 신청 → 서류 확인 → 처리
3) 필요서류: 신분증(방문), 임대차계약서(필요 시)
4) 처리기간/수수료: 보통 즉시(기관별 상이)
5) 접수방법: 정부24(온라인) 또는 동주민센터(방문)
※ 실제 기준은 해당 구청/주민센터 안내를 확인하세요.`
  });
}

    const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID?.trim();

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
`너는 대한민국 구청 홈페이지의 '민원 안내 챗봇'이다.
원칙:
- 답변은 항상 아래 순서로 정리한다:
  1) 요약(한 줄)
  2) 절차(단계별)
  3) 필요서류(체크리스트)
  4) 수수료/처리기간(알면 명시, 모르면 '확인 필요')
  5) 접수방법(온라인/방문/우편) + 유의사항(대리인, 예외)
  6) 담당부서/문의 안내(모르면 '해당 업무 담당부서 확인 필요')
- 근거가 부족하면 추측하지 말고 '확인 필요'라고 말한다.
- 개인정보를 요구하지 말고 입력하지 말라고 안내한다.
- 법령/조례/지침은 변경될 수 있으므로 최종 확인을 권고한다.`
        },
        { role: "user", content: message }
      ],
      tools: vectorStoreId
        ? [{ type: "file_search", vector_store_ids: [vectorStoreId] }]
        : []
    });

    return res.json({ answer: response.output_text || "답변을 생성하지 못했어요." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ answer: "서버 오류가 발생했어요." });
  }
});

app.listen(port, () => {
  console.log(`✅ Local server running: http://localhost:${port}`);
});
