# 채찍(채용트렌드를 찍어주다)

상태: 완료
나의 역할: 프론트엔드 개발, 서버 구축
공동 작업자: 백엔드 개발자 2명, AI 개발자 1명, 디자이너 1명
기술: AWS EC2, LLM, React, SpringBoot, Tibero
날짜: 2023년 11월 1일 → 2023년 12월 18일

![Image](https://github.com/user-attachments/assets/ebdf01b9-3bc5-47a8-92d1-ddcbfc06feba)
# 📝 기획

---

개발자들을 대상으로 기업규모, 기술 스택, 우대사항, 근무지역

최근에 개발 분야에 따른 요구 기술과 자격증에 트렌드 정보 제공

- 제공할 서비스
    - 기업이 가장 많이 원하는 기술 스택, 우대 사항 보여주기 (트렌드 제공)
    - ~~기업의 자기소개서 정보 제공 ( 확장성 )~~
    - Git 리포지토리를 분석하여 면접 질문 생성

# 📜 설계

---

## 🌐AWS 설계

![Image](https://github.com/user-attachments/assets/653b49a7-c492-474a-adfc-5dc6935f31af)

## 🎨디자인 설계

![Image](https://github.com/user-attachments/assets/ebdf01b9-3bc5-47a8-92d1-ddcbfc06feba)
![Image](https://github.com/user-attachments/assets/96210682-4314-422e-ab07-ed4ea6fb12f4)

![Image](https://github.com/user-attachments/assets/4a0f5130-60bc-4beb-87c7-dbdd6a225bab)

![Image](https://github.com/user-attachments/assets/3a776270-1fa1-4703-bd5d-280200268d32)

# 👨🏻‍💻담당 구현

---

- React를 활용하여 웹페이지 구현
- Restful API를 이용하여 백엔드 및 AI 서버 연결
- Git OAuth 및 API 연결
- AWS를 활용하여 서버 구축
- 활용한 라이브러리
    - octokit : 3.1.2
    - react : 18.2.0
    - react-dom : 6.20.0
    - react-scripts : 5.0.1
    - react-select : 5.8.0
    - styled-components : 6.1.1
