import React, { useEffect, useState } from "react";
import Select from "react-select";
import { NavLink, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Header from "../components/header.js"
import "../style/companylist.css"

const SkillcustomSelect ={
    control: (provided) =>({
      ...provided,
      width: "250px",
      paddingTop: "5px",
      paddingBottom: "5px",
      paddingLeft: "10px",
      border: '1px #DDDDDD solid',
      justifyContent: 'flex-start',
      alignItems: 'center',
      display: 'inline-flex',
      cursor: 'pointer'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#4285F4" : state.isFocused ? "#ACCBFF": "#fff",
      color: state.isSelected ? "#fff" : "#000",
      cursor: 'pointer'
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none"
    }),
  };

function CompanyList(){
    const [Skilloptions, setSkillOptions] = useState([]);
    const [CompanyList, setCompanyList] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const companiesPerPage = 20;
    
    useEffect(()=>{
        const fetchSkillData = async() => {
            try{
                const response = await fetch(`http://localhost:8080/jobs/allSkills`);
                const data = await response.json();

                const transformedOptions = data
                .filter((item) =>
                !/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(item.name))
                .map((item, index) => ({
                  value: index,
                  label: item.name
                }));
                setSkillOptions(transformedOptions);
                console.log(Skilloptions)
            }
            catch(error){
                console.error('Fetching data failed:', error);
            }
        }
        fetchSkillData()
    }, [])
    const [SkillselectedOption, setSelectedOption] = useState(null);

    const SkillhandleChange = (SkillselectedOption) => {
        setSelectedOption(SkillselectedOption);
        console.log(SkillselectedOption)
      };

  const buttonHandler = async() => {
    if (!SkillselectedOption){
      alert('옵션을 선택해주세요');
      return;
    }
    try{
      const response = await fetch(`http://localhost:8080/jobs/showCompanyList/${encodeURIComponent(SkillselectedOption.label)}`);
      const data = await response.json();
      setCompanyList(data);
      setCurrentPage(1);
      console.log(data)
    }
    catch(error){
      console.error('데이터 요청 실패', error);
    }
  };

    // 페이지를 변경하는 함수
    const handlePageChange = (newPage) => {
      if (CompanyList.length === 0) {
        return;
      }
      setCurrentPage(newPage);
    };
  
    // 현재 페이지에 표시할 기업 리스트
    const currentCompanies = CompanyList.slice(
      (currentPage - 1) * companiesPerPage,
      currentPage * companiesPerPage
    );

    return(
      <div className="CompanyListBody">
        <Header/>
        <div className="CompanyListMainBody">
          <div className="LinkSelect">
            <div className="TrendSelect">
              <div className="TrendWrapper">
                <NavLink className={({isActive})=>"nav-link" + (isActive ? "a" : "")} to="/jobtrend/jobskill">직무별 기술 스택</NavLink>
              </div>
              <div className="TrendWrapper">
                <NavLink className={({isActive})=>"nav-link" + (isActive ? "a" : "")} to="/jobtrend/companylist">기술별 기업 리스트</NavLink>
              </div>
            </div>
          </div>
          <div className="CompanyListSkillSelect">
            <div className="CompanyListSubtitleBox">
              <div className="CompanyListSubtitleText">기술별 기업 리스트</div>
            </div>
            <div className="CompanySkillSelectFrame">
              <div className="SkillSelectFrame">
                <div className="SkillSelectTitle">기술 스택</div>
                  <Select
                    className="Selection"
                    classNamePrefix="select"
                    name="Job"
                    options={Skilloptions}
                    isSearchable={true}
                    styles={SkillcustomSelect}
                    onChange={SkillhandleChange}
                  />
              </div>
              <button className="ButtonStyle" onClick={buttonHandler}>
                <span className="ButtonTextWrapper">적용하기</span>
              </button>
            </div>
          </div>
          <div className="CompanyListFrame">
            <div className="ListTitle">기업 리스트</div>
            <div className="CompanyNumber">기업 수 : {CompanyList.length}</div>
            <div className="CompanyList">
              {currentCompanies.map((company, index) => (
                <div key={index} className="CompanyName">
                  {company}
                </div>
              ))}
            </div>
            <div className="Pagination">
              {/* 이전 페이지로 이동하는 버튼 */}
              <button
                className="PageButton"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                style={{ backgroundColor: '#fff', color: '#007BFF', border: 'none'}}
              >
                <FaChevronLeft />
              </button>
              {/* 페이지 번호 표시 */}
              <span>{currentPage}</span>
              {/* 다음 페이지로 이동하는 버튼 */}
              <button
                className="PageButton"
                disabled={currentPage === Math.ceil(CompanyList.length / companiesPerPage)}
                onClick={() => handlePageChange(currentPage + 1)}
                style={{ backgroundColor: '#fff', color: '#007BFF', border: 'none'}}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>            
      </div>
    )
};

export default CompanyList;