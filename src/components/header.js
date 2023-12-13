import React,{useState, useEffect} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import "../style/header.css"
import imageLogo from "../image/chaezzic-logo 1.png"

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      // 페이지 로딩 시 세션 스토리지에서 액세스 토큰을 확인하여 로그인 상태 설정
      const accessToken = sessionStorage.getItem("access_token");
      setIsLoggedIn(!!accessToken);
    }, []);

    const navigatetoLogin=()=>{
      navigate("/login");
    };

    const navigatetoHome=()=>{
      navigate("/");
    };

    const HandleLogin=()=>{
      navigate("/login");
      setIsLoggedIn(true)
    };

    const HandleLogout=()=>{
      sessionStorage.removeItem('access_token');
      setIsLoggedIn(false)
    };

    return(
      <div className="body">
        <nav className="LogoMenuNav">
          <div className="Logo" onClick={navigatetoHome}>
            <img src={imageLogo} alt="logoImg" />
            <div className="titleWrapper">채찍</div>
          </div>
          <div className="sloganWrapper">채용 트렌드를 찍어주다</div>
        </nav>
        <nav className="MenuLinkNav">
          <ul className="LinkNav">
            <nav className="textWrapper">
              <NavLink className={({isActive})=>"nav-link" + (isActive ? "a" : "")} to="/">서비스 소개</NavLink>
            </nav>
            <div className="textWrapper">
              <NavLink className={({isActive})=>"nav-link" + (isActive ? "a" : "")} to="/jobtrend">채용 트렌드</NavLink>
            </div>
            <div className="textWrapper">
              <NavLink className={({isActive})=>"nav-link" + (isActive ? "a" : "")} to="/interviewai">면접 질문 예측</NavLink>
            </div>
          </ul>
          <div>
            {isLoggedIn ? (
              <button className="Logout" onClick={HandleLogout}>
                <div className="LogouttextWrapper">로그아웃</div>
              </button>
            ) : (
              <button className="Login" onClick={navigatetoLogin}>
                <div className="LogintextWrapper">로그인 | 회원가입</div>
              </button>
            )}
          </div>
        </nav>
      </div>
    )
}

export default Header;