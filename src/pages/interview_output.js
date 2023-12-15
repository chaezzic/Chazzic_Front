import React, { useEffect, useState } from "react";
import { Octokit } from "octokit";
import Header from "../components/header.js";
import '../style/AiOutput.css';

function Ai_output() {
  const [isLoading, setIsLoading] = useState(true);
  const [repositoryContent, setRepositoryContent] = useState([]);

  useEffect(() => {
    // Fetch data from the Python server
    const fetchData = async () => {
      try {
        const response = await fetch('http://13.48.130.241:5000/send_data_to_react');
        const data = await response.json();
        console.lof(data);

        // Update state with fetched data
        setRepositoryContent(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array ensures that this effect runs once after the initial render

  const renderContent = (content) => {
    // Render your content based on the fetched data
    // Modify this part based on the structure of your data
    return (
      <div>
        {content.map((item, index) => (
          <div key={index}>{/* Render each item in the content */}</div>
        ))}
      </div>
    );
  };

  return (
    <div className="AiOutputBody">
      <Header />
      {isLoading ? <p>Loading...</p> : renderContent(repositoryContent)}
    </div>
  );
}

export default Ai_output;
