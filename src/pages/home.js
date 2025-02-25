import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header.js";
import "../style/home.css";

function Home(){
  const navigate = useNavigate();
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    console.log(code)

    if (code) {
      fetchAccessToken(code);
    }

  }, []);
  const fetchAccessToken = async (code) => {
    const formData = new URLSearchParams();
    formData.append('code', code);

    fetch('http://localhost:8080/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData
    })
    .then(response => {
      if (response.headers.get('Content-Type').includes('application/json')) {
      return response.json();
    } else {
      return response.text();
    }})
    .then(data => {
      const accessToken = data.access_token;
      sessionStorage.setItem('access_token', accessToken);
      console.log("데이터?", accessToken)
      navigate("/");
      window.location.reload();
    })
    .catch(error => {
      console.error('Access token error', error);
    });
  }

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