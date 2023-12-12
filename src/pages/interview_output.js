import React, { useEffect, useState } from "react";
import { Octokit } from "octokit";
import Header from "../components/header.js";

function Ai_output() {
    const [repositoryContent, setRepositoryContent] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const octokit = new Octokit({ auth: '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' });

    useEffect(() => {
        const repoData = localStorage.getItem('selectedRepository');
        if (repoData) {
            const repo = JSON.parse(repoData);
            fetchRepositoryContent(repo.full_name);
        }
    }, []);

    const fetchRepositoryContent = async (fullName, path = '') => {
        setIsLoading(true);
        try {
            const response = await octokit.request(`GET /repos/${fullName}/contents/${path}`);
            const content = response.data;
            if (Array.isArray(content)) {
                for (const item of content) {
                    if (item.type === 'dir') {
                        const subdirectoryContent = await fetchRepositoryContent(fullName, item.path);
                        item.content = subdirectoryContent;
                    }
                }
                setRepositoryContent(prevContent => [...prevContent, ...content]);
            }
            console.log(content)
        } catch (error) {
            console.error('Error fetching repository content:', error);
        }
        setIsLoading(false);
    };

    const renderContent = (content) => (
        <ul>
            {content.map(item => (
                <li key={item.sha}>
                    {item.type === 'file' ? 'File' : 'Directory'}: {item.name}
                    {item.type === 'dir' && item.content ? renderContent(item.content) : null}
                </li>
            ))}
        </ul>
    );

    return (
        <div>
            <Header />
            <h1>Repository Content</h1>
            {isLoading ? <p>Loading...</p> : renderContent(repositoryContent)}
        </div>
    );
}

export default Ai_output;
