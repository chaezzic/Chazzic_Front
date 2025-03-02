# 채찍(채용트렌드를 찍어주다)

상태: 완료
나의 역할: 프론트엔드 개발, 서버 구축
공동 작업자: 백엔드 개발자 2명, AI 개발자 1명, 디자이너 1명
기술: AWS EC2, LLM, React, SpringBoot, Tibero
날짜: 2023년 11월 1일 → 2023년 12월 18일

![Image](https://github.com/user-attachments/assets/653b49a7-c492-474a-adfc-5dc6935f31af)

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

![채찍 다이어그램.drawio.png](%EC%B1%84%EC%B0%8D_%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8.drawio.png)

## 🎨디자인 설계

![홈 페이지(서비스 소개).png](%ED%99%88_%ED%8E%98%EC%9D%B4%EC%A7%80(%EC%84%9C%EB%B9%84%EC%8A%A4_%EC%86%8C%EA%B0%9C).png)

![image.png](image.png)

![image.png](image%201.png)

![image.png](image%202.png)

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
- 관련 코드 : https://github.com/chaezzic/Chazzic_Front

# 고찰

---

### 프로젝트 개요

TABA Academy에서 진행한 프로젝트는 실무 환경을 경험하며 팀원들과 협업하여 웹 애플리케이션을 개발하는 과정이었다. 본 프로젝트에서 나는 **프론트엔드 개발과 클라우드 서버 배포**를 담당했으며, JavaScript, React, AWS, RESTful API 등을 활용하여 웹 서버를 구축하고 프론트엔드와 백엔드 간 원활한 데이터 전송을 구현하였다.

### 기술적 도전과 해결 과정

프로젝트 진행 중 여러 기술적 도전에 직면하였으며, 이를 해결하는 과정에서 많은 것을 배울 수 있었다.

1. **프론트엔드와 백엔드 간 데이터 통신 문제**
    - 문제: API 호출 시 비효율적인 데이터 처리로 인해 속도가 저하되는 문제가 발생했다.
    - 해결: RESTful API 설계를 개선하고, 캐싱 전략을 적용하여 성능을 최적화하였다.
2. **클라우드 서버 배포 및 유지보수**
    - 문제: AWS를 활용한 서버 배포 과정에서 네트워크 설정 오류와 보안 이슈가 발생했다.
    - 해결: IAM 정책을 최적화하고, 보안 그룹 설정을 조정하여 안전한 서버 운영 환경을 구축하였다.
3. **예상치 못한 팀원 이탈 문제**
    - 문제: 프로젝트 중반, 한 명의 팀원이 개인 사정으로 인해 프로젝트에서 이탈하면서 일정 관리에 차질이 생겼다.
    - 해결: 팀원 간 업무를 재분배하고, 우선순위를 조정하여 남은 기간 내에 목표한 기능을 구현할 수 있도록 조정하였다.

### 협업 경험과 커뮤니케이션

이번 프로젝트를 통해 협업과 커뮤니케이션의 중요성을 다시금 깨닫게 되었다. 코드 리뷰를 정기적으로 진행하면서 팀원 간 코드 스타일을 맞추고, 문서화를 철저히 하여 유지보수성을 높였다. 또한, Git을 활용한 협업 방식을 익히면서 브랜치 전략과 충돌 해결 방법을 익힐 수 있었다.

### 배운 점과 향후 발전 방향

- **실무에서 요구되는 기술 스택을 익힘**: React 및 AWS 활용 경험을 쌓으며, 실무에서 활용할 수 있는 기술력을 향상시켰다.
- **문제 해결 능력 강화**: 예상치 못한 오류와 문제를 해결하는 과정에서 문제 해결 능력이 향상되었다.
- **효율적인 협업 방법 습득**: 효과적인 팀워크와 원활한 의사소통이 프로젝트 성공에 핵심적인 요소임을 깨달았다.

향후에는 **DevOps 및 클라우드 인프라 관리 기술을 더욱 심화 학습하고**, 프론트엔드 개발뿐만 아니라 **백엔드와 데이터베이스 설계까지 경험을 확장**하여 보다 균형 잡힌 개발자로 성장하고자 한다.
