# 🏛️ Gu Office Web + Civil Service Chatbot (Local MVP)

구청 홈페이지 메인화면에 민원 신청 절차, 필요서류, 수수료, 처리기간 등을
안내하는 AI 챗봇을 연동한 로컬 테스트 프로젝트입니다.

------------------------------------------------------------------------

## 📌 Project Overview

본 프로젝트는 구청 홈페이지 메인화면에 대국민 민원 안내용 AI 챗봇을
추가하기 위한 **MVP(Local Test Version)** 입니다.

### 🎯 목표

-   민원 신청 절차 자동 안내
-   필요서류 / 수수료 / 처리기간 구조화 응답
-   대리 신청 및 예외사항 안내
-   향후 RAG 기반 문서 검색 시스템 확장 가능

------------------------------------------------------------------------

## 🏗️ Architecture

Browser (index.html)\
↓\
Node.js Express Server (/api/chat)\
↓\
OpenAI Responses API

------------------------------------------------------------------------

## 📂 Project Structure

    office/
    │
    ├── server.js              # Express 서버 + OpenAI API 연결
    ├── .env                   # API 키 환경변수
    ├── package.json
    │
    └── public/
        └── index.html         # 구청 메인화면 + 챗봇 위젯

------------------------------------------------------------------------

## 🚀 Features Implemented

### ✅ 1. 구청 메인화면 UI

-   반응형 레이아웃
-   공지사항 섹션
-   민원 바로가기 메뉴
-   공공기관 스타일 디자인

### ✅ 2. 민원 안내 챗봇 UI

-   우측 하단 고정 버튼
-   모달 채팅 패널
-   사용자/봇 말풍선 구분
-   자동 스크롤 기능

### ✅ 3. Node.js Express Backend

-   `/api/chat` POST 엔드포인트
-   OpenAI Responses API 연동
-   JSON 기반 통신 구조

### ✅ 4. 기본 보안 처리

-   주민등록번호 패턴 감지 차단
-   긴 숫자(계좌/카드 가능성) 감지 차단
-   API 키 .env 관리
-   프론트엔드에 API 키 노출 없음

------------------------------------------------------------------------

## ⚙️ Installation & Local Run

### 1️⃣ 패키지 설치

    npm init -y
    npm install express openai dotenv

### 2️⃣ .env 설정

    OPENAI_API_KEY=sk-발급받은_실제_API키

### 3️⃣ 서버 실행

    node server.js

접속 주소:

    http://localhost:3000

------------------------------------------------------------------------

## 🧪 Error Handling Experience

### ❗ Invalid API Key (401)

-   가짜 키 사용 시 401 오류 발생
-   서버 catch 처리 후 에러 메시지 반환

### ❗ ByteString Error

-   .env 파일에 한글/BOM 포함 시 발생
-   UTF-8 인코딩 저장으로 해결

------------------------------------------------------------------------

## 🔮 Future Improvements

-   📄 Vector Store 기반 RAG 도입
-   🔐 Rate Limiting 및 로깅 시스템
-   🧩 민원 처리 상태 조회 API 연동
-   ☁️ Serverless 배포 (Vercel / AWS Lambda)
-   📊 관리자 대시보드 구축

------------------------------------------------------------------------

## 🧠 Lessons Learned

-   API 키는 절대 프론트엔드에 노출하면 안 됨
-   공공 서비스는 정확성이 최우선
-   문서 기반 RAG가 민원 서비스에 필수적
-   시스템 프롬프트 설계가 품질을 좌우함

------------------------------------------------------------------------

## 🛠 Tech Stack

-   HTML / CSS
-   JavaScript (Vanilla)
-   Node.js
-   Express
-   OpenAI Responses API

------------------------------------------------------------------------

## 📌 Current Status

-   [x] UI 구현 완료
-   [x] 로컬 서버 연동 완료
-   [x] OpenAI API 연결 테스트 완료
-   [ ] RAG 적용 예정
-   [ ] 배포 예정

------------------------------------------------------------------------

## 👨‍💻 Author

Civil Service AI Chatbot Local MVP\
Built for Government Website Integration Experiment
