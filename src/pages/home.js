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
    
    // 이 함수를 실행하여 OAuth 인증 코드를 사용하여 액세스 토큰을 교환
    // const fetchAccessToken = async() => {
    //   try{
    //     const response = await fetch('http://localhost:8080/oauth/token');
    //     const token = await response.text();
    //     console.log(response)
    //     console.log("받아온 토큰: ", token)
    //   }
    //   catch(error){
    //     console.error('토큰을 받아오는 중 오류 발생:', error)
    //   }
    // }
    // fetchAccessToken();
    // const code = new URLSearchParams(window.location.search).get('code');
    // console.log(code)

    // if (code) {
    //   fetchAccessToken(code);
    // }
    // fetch('http://localhost:8080/oauth/token')
    // .then(response => {
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }
    //   return response.text(); // 텍스트 형식으로 응답 받기
    // })
    // .then(token => {
    //   console.log('받아온 토큰:', token);
    //   // 토큰을 사용하여 다른 동작 수행
    // })
    // .catch(error => console.error('토큰을 받아오는 중 오류 발생:', error));
    

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
      // 액세스 토큰을 사용하여 필요한 작업 수행
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