import React, {useEffect} from "react";
import "../style/login.css"
import imageLogo from "../image/chaezzic-logo 1.png"
import { useNavigate } from "react-router-dom";

const CLIENT_ID = "Client_ID"
const redirectURL="http://localhost:3000/"
const GITHUB_AUTH_SERVER = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectURL}`;


function handleLoginClick(){
  window.location.href = GITHUB_AUTH_SERVER;
}

function Login(){
  const navigate = useNavigate();

  const navigatetoHome=()=>{
    navigate("/");
  };

    return(
        <div className="Loginbody">
            <div className="Logobody">
                <nav className="LoginLogoMenuNav">
                  <div className="LoginLogo" onClick={navigatetoHome}>
                    <img src={imageLogo} alt="logoImg" />
                    <div className="LogintitleWrapper">채찍</div>
                  </div>
                  <div className="loginWrapper">로그인</div>
                </nav>
            </div>
            <div className="LoginTypoFrame">
              <div className="LoginTypo">
                <div className="LoginMainTypo">간편하게 가입하고<br/>채찍의 서비스 이용하기</div>
                <div className="LoginSloganTypo">채용 트렌드를 찍어주다, 채찍</div>
              </div>
              <button className="NavLoginButton" onClick={handleLoginClick}>
                <div className="LoginButtonTypo">깃허브 계정으로 계속하기</div>
              </button>
            </div>
        </div>
    )
}

export default Login;