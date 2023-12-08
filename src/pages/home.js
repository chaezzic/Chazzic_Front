import React, {useEffect} from "react";
import axios from "axios";
import Header from "../components/header.js";
import "../style/home.css";

function Home(){
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    console.log(code)

    if (code) {
      getAccessToken(code);
    }
  }, []);

  const getAccessToken = async (code) => {
    let server = `http://172.20.14.72:3002`;
    let accessInfo = await axios.get(
      `${server}/githubLogin?code=${code}`
    );

    let token = accessInfo.data.token;

    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(userResponse.data)
  }
  
  const fetchAccessToken = async (code) => {
    try {
      const clientSecret = process.env.GITHUB_CLIENT_SECRET
      const response = await fetch(`http://15.164.171.29:8080/oauth?code=${encodeURIComponent(code)}`);
      console.log(response)
      const data = await response.json();
      console.log(data)
      if (data.access_token) {
        // Store the access token in localStorage or context/state for future use
        localStorage.setItem('github_access_token', data.access_token);
  
        // Update UI to reflect logged-in status
        // For example, redirect to a dashboard or change login button to logout
      } else {
        // Handle any error or data issues here
        console.error('No access token in response:', data);
      }
    } 
    catch (error) {
      console.error('Error fetching access token:', error);
    }
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