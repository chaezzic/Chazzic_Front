import React, {useState} from "react";
import Select from "react-select";
import Header from "../components/header.js"
import { useNavigate } from "react-router-dom";
import "../style/interviewai.css"
import { Octokit } from "octokit";

const joboption=[
    {value: "01", label: "프론트엔드 개발"},
    {value: "02", label: "백엔드 개발"},
    {value: "03", label: "안드로이드 개발"},
    {value: "04", label: "AI 개발"},
    {value: "05", label: "소프트웨어 개발"},
    {value: "06", label: "서버 개발"},
    {value: "07", label: "데이터 엔지니어"}
];

function InterviewAi(){
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchFilesFromDirectory = async (repoName, path='') => {
    try {
      const response = await octokit.request(`GET /repos/${repoName}/contents/${path}`);
      let files = [];
      for (const item of response.data) {
        if (item.type === 'file' && !isBinaryFile(item.name)) {
          const fileResponse = await octokit.request(`GET /repos/${repoName}/contents/${item.path}`);
          files.push({ name: item.name, content: atob(fileResponse.data.content) });
        } else if (item.type === 'dir') {
          const subFiles = await fetchFilesFromDirectory(repoName, item.path);
          files = files.concat(subFiles);
        }
      }
      return files;
    } catch (error) {
      console.error('Error fetching files:', error);
      return [];
    }
  };

  const submitPortfolio = async () => {
    if (!AiSelection) {
      alert('직무를 선택해주세요.');
      return;
    }

    if (selectedRepos.length === 0) {
      alert('포트폴리오를 추가해주세요.');
      return;
    }
    setIsSubmitting(true);
    const portfolioData = await Promise.all(selectedRepos.map(async (repo) => {
      const files = await fetchFilesFromDirectory(repo.full_name);
      return { repoName: repo.full_name, language: repo.language ,files };
    }));
    console.log('Submit Portfolio Data:', {
      job: AiSelection.label,
      portfolio: portfolioData,
    });

    try {
      const response = await fetch('http://localhost:5000/generate_AI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          job: AiSelection.label,
          portfolio: portfolioData }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem('responseFromServer', JSON.stringify(responseData));
        alert('포트폴리오가 성공적으로 제출되었습니다.');
        navigate('/interview/output'); // 리다이렉트 경로
      } else {
        const errorText = await response.text();
        console.error('Error sending portfolio to server:', errorText);
      }
    } catch (error) {
      console.error('Error sending portfolio to server:', error);
    }
    finally {
      setIsSubmitting(false); // 제출이 완료되면 상태 변경
    }
  };

  //불필요한 파일 필터링
  function isBinaryFile(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    const binaryExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'pdf', 'exe', 'bin', 'svg', 'ico', 'ttf', 'zip', 'woff', 'woff2', 'eot', 'otf']; // 확장 가능
    return binaryExtensions.includes(extension);
  };

  const octokit = new Octokit({
    auth: sessionStorage.getItem('access_token')
  });

  const JobcustomSelect ={
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
    }
  const navigate = useNavigate();
  const navigateToOutput = () => {
    if(!AiSelection){
      alert('옵션을 선택해주세요');
      return;
    }
    if(selectedRepos.length > 0){
      localStorage.setItem('selectedRepository', JSON.stringify(selectedRepos[0]));
    }
    navigate("/interviewai/output")
  };

  const [AiSelection, setSelectJobOption] = useState(null);
  const Jobhandler = (AiSelection) => {
    setSelectJobOption(AiSelection);
    console.log(AiSelection);
  };

  const [repos, setRepos] = useState([]);
  const [isRepoModalOpen, setIsRepoModalOpen] = useState(false);
  const [selectedRepos, setSelectedRepos] = useState([]);

  const fetchRepos = async () => {
    try{
      const response = await octokit.request('GET /user/repos');
      console.log(response.data)
      setRepos(response.data);
      setIsRepoModalOpen(true);
    }
    catch(error){
      console.error('Error fetching repositories:', error);
    }
  };

  const handleIncludeButtonClick = () => {
    if (!sessionStorage.getItem('access_token')) {
      alert('로그인이 필요합니다. 로그인 후 다시 시도해주세요.');
      navigate('/login');
      return;
    }
    fetchRepos();
  }

  const renderRepoModal = () => {
    if(!isRepoModalOpen) return null;

  const unselectedRepos = repos.filter(repo => !selectedRepos.some(selectedRepo => selectedRepo.id === repo.id));

  return(
    <div className="modalOverlay">
      <div className="modalContent">
        <div className="modalHeader">
          <h2>저장소 선택</h2>
          <button className="CloseButton" onClick={() => setIsRepoModalOpen(false)}>X</button>
        </div>
        <div className="modalBody">
          {unselectedRepos.map(repo => (
            <div key={repo.id} className="modalItem" onClick={() => selectRepo(repo)}>
              {repo.full_name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
  };

  const removeRepo = (repoId) => {
    setSelectedRepos(prevRepos => prevRepos.filter(repo => repo.id !== repoId));
  };

  const selectRepo = (repo) => {
    setSelectedRepos(prevRepos => [...prevRepos, repo]);
    console.log("Selected repo:", repo.name);
    setIsRepoModalOpen(false);
  };

  const renderPopolList = () => {
    return selectedRepos.map((repo, index) => (
      <div className="PopolItem" key={index}>
        <div className="RepositoryName">{repo.full_name}</div>
        <button className="EraseButton" onClick={() => removeRepo(repo.id)}>x</button>
      </div>
    ));
  };

  return(
      <div className="InterviewAibody">
          <Header/>
          <div className="AiSubtitleBox">
            <div className="AiSubtitleText">포트폴리오 제출</div>
          </div>
          <div className="AiSelectFrame">
            <div className="AiJobSelectFrame">
              <div className="JobSelectTitle">직무</div>
              <Select
                  className="Selection"
                  classNamePrefix="select"
                  name="Job"
                  options={joboption}
                  isSearchable={false}
                  styles={JobcustomSelect}
                  onChange={Jobhandler}
              />
            </div>
            {renderRepoModal()}
            <div className="PopolIncludeList">
              <button className="IncludeButton" onClick={handleIncludeButtonClick}>
                <div className="ButtonTypo">+ 포트폴리오 추가하기</div>
              </button>
              <div className="PopolList">
                {renderPopolList()}
              </div>
            </div>
            <button className="OutputButton" onClick={submitPortfolio} disabled={isSubmitting}>
              <div className="ButtonTypo">
                {isSubmitting ? "제출 중..." : "제출하기"}
              </div>
            </button>
          </div>
      </div>
  )
}

export default InterviewAi;