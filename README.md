🏛️ Gu Office Web + Civil Service Chatbot (Local MVP)

구청 홈페이지 메인화면에
민원 신청 절차 / 필요서류 / 수수료 / 처리기간 등을 안내하는 AI 챗봇을 연동한 로컬 테스트 프로젝트

📌 Project Overview

본 프로젝트는 구청 홈페이지 메인화면에
대국민 민원 안내용 AI 챗봇을 추가하기 위한 MVP(Local Test Version) 입니다.

목표:

민원 신청 절차 안내 자동화

필요서류/수수료/처리기간 구조화 응답

대리 신청 / 예외사항 안내

향후 문서 기반 RAG 확장 가능 구조 설계

🏗️ Architecture
Browser (index.html)
        │
        │ fetch('/api/chat')
        ▼
Node.js Express Server (server.js)
        │
        │ OpenAI Responses API
        ▼
OpenAI API

📂 Project Structure
office/
│
├── server.js              # Express 서버 + OpenAI API 연결
├── .env                   # API 키 환경변수
├── package.json
│
└── public/
    └── index.html         # 구청 메인화면 + 챗봇 위젯

🚀 Features Implemented
✅ 1. 구청 메인화면 UI 구현

상단 네비게이션

공지사항

민원 바로가기

공공기관 스타일 반응형 레이아웃

✅ 2. 민원 안내 챗봇 UI

우측 하단 고정 버튼

모달 채팅 패널

사용자/봇 말풍선 구분

입력창 + 전송 버튼

자동 스크롤 처리

✅ 3. Node.js Express Backend

/api/chat POST 엔드포인트

OpenAI Responses API 연동

JSON 기반 통신

✅ 4. 보안 처리 (기본)

주민등록번호 패턴 감지 차단

긴 숫자(계좌/카드 가능성) 감지 차단

API 키 .env 관리

프론트에 API 키 노출 없음

✅ 5. 시스템 프롬프트 설계

챗봇은 다음 규칙을 따르도록 설계됨:

항상 아래 구조로 응답:

1) 요약
2) 절차 (단계별)
3) 필요서류 (체크리스트)
4) 수수료 / 처리기간
5) 접수방법 (온라인/방문/우편)
6) 담당부서 안내


근거 없으면 추측 금지

개인정보 요구 금지

법령 변경 가능성 안내

⚙️ Installation & Local Run
1️⃣ 패키지 설치
npm init -y
npm install express openai dotenv

2️⃣ .env 설정
OPENAI_API_KEY=sk-발급받은_실제_API키

3️⃣ 서버 실행
node server.js


접속:

http://localhost:3000

🧪 Error Handling Experience
❗ 1. Invalid API Key (401)

가짜 키(sk-abc) 사용 시 401 발생

서버에서 catch → "서버 오류" 반환

❗ 2. ByteString Error

.env에 한글/BOM/특수문자 포함 시 발생

해결: UTF-8 저장 + ASCII만 사용

🔮 Next Steps (Planned Improvements)
🔹 1. RAG (Document-based Answering)

민원사무편람 PDF 업로드

Vector Store 연결

file_search 도입

근거 기반 응답 강화

🔹 2. Production-Level Security

Rate limiting

Logging system

Abuse detection

IP throttling

🔹 3. 실제 구청 시스템 연동

로그인 후 민원 처리 상태 조회

내부 API 연동

권한 기반 응답 제어

🔹 4. 배포

Vercel Serverless

Cloudflare Workers

AWS Lambda

🧠 Lessons Learned

API 키는 프론트에 두면 절대 안 됨

공공 서비스는 "정확성 > 창의성"

RAG 없이는 민원 안내 정확도 확보 어려움

시스템 프롬프트 설계가 매우 중요

로컬 테스트 → 서버리스 확장이 가장 안정적

📎 Tech Stack

HTML / CSS

JavaScript (Vanilla)

Node.js

Express

OpenAI Responses API

📌 Status
[✔] UI 구현 완료
[✔] 로컬 서버 연동 완료
[✔] OpenAI API 연결 테스트 완료
[ ] RAG 적용 예정
[ ] 배포 예정

👨‍💻 Author

Local MVP for Civil Service AI Chatbot
Built for Government Website Integration Experiment
