import React, { useEffect, useState } from "react";
import Header from "../components/header.js";
import '../style/AiOutput.css';

function Ai_output() {
  const [isLoading, setIsLoading] = useState(true);
  const [repositoryContent, setRepositoryContent] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem('responseFromServer');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setRepositoryContent(parsedData);
      setIsLoading(false);
    } else {
      console.error('Error fetching data from local storage: Data not found');
      setIsLoading(false);
    }
  }, []); // Empty dependency array ensures that this effect runs once after the initial render

  const filterTextAfterColon = (text) => {
    const indexOfColon = text.indexOf(":");
    return indexOfColon !== -1 ? text.substring(indexOfColon + 1).trim() : text;
  };

  const renderContent = (content) => {
    // Render your content based on the fetched data
    // Modify this part based on the structure of your data
    return (
      <div>
      {content.map((item, index) => (
        <div key={index} className="QuestionListFrame">
          <div className="PortfolioNumber">포트폴리오 {index + 1}</div>
          <div className="QuestionBox">
            {item.map((question, subIndex) => (
              <div key={subIndex} className="QuestionFrame">
                <div className="QuestionNumber">질문 {subIndex + 1}</div>
                <div className="QuestionTypo" key={subIndex}>{filterTextAfterColon(question)}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    );
  };

  return (
    <div className="AiOutputBody">
      <Header />
      <div className="OutputFrame">
        <div className="OutputTitleBox">
          <div style={{color: '#4285F4', fontSize: 18, fontFamily: 'Heebo', fontWeight: '700', wordWrap: 'break-word'}}>면접 예상 질문</div>
        </div>
        {isLoading ? <p>Loading...</p> : renderContent(repositoryContent)}
      </div>
    </div>
  );
}

export default Ai_output;
