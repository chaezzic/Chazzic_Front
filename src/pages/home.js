import React, {useEffect} from "react";
import axios from "axios";
import Header from "../components/header.js";
import "../style/home.css";

function Home(){
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    console.log(code)

    if (code) {
      fetchAccessToken(code);
    }
  }, []);

  // const getAccessToken = async (code) => {
  //   let server = `http://172.20.14.72:3002`;
  //   let accessInfo = await axios.get(
  //     `${server}/githubLogin?code=${code}`
  //   );

  //   let token = accessInfo.data.token;

  //   const userResponse = await axios.get("https://api.github.com/user", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   console.log(userResponse.data)
  // }
  
  const fetchAccessToken = async (code) => {
    fetch('http://localhost:8080/oauth/github', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ code })
    })
    .then(response => response.json())
    .then(data => {
      const accessToken = data.access_token;
      console.log(data)
      // 액세스 토큰을 사용하여 필요한 작업 수행
    })
    .catch(error => {
      console.error('Access token error', error);
    });
  };

    return(
      <div className="Main">
          <Header />
          <div className="MainIntro1">
            <div className="TrendIntro1">
              <p className="TrendtextWrapper1">“개발자인 당신에게<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;채용 트렌드를 찍어주다”</p>
            </div>
            <div className="TrendIntro2">
              <p className="TrendtextWrapper2">반기 마다 직무별 기술 스택 트렌드 및<br/>직무별 자격증 트렌드 제공</p>
            </div>
          </div>
          <div className="MainIntro2">
            <div className="AiIntro1">
              <img className="IconBrain"/>
              <div className="AitextWrapper1" >AI 모델 학습을 기반으로<br/>포트폴리오에서 면접 예상 질문 추출</div>
            </div>
            <div className="AiIntro2">
              <div className="AitextWrapper2">“채찍만의 독보적인 서비스,<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;포트폴리오로 면접 질문 예측하기”</div>
            </div>
          </div>
      </div>
    )
}

export default Home;