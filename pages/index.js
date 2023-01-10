import Head from 'next/head';
import Image from 'next/image';
import React, {useState} from 'react';
import Toggle from "./_app"
import { createRoot } from "react-dom/client";


const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userInput}),
    });
  
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
    console.log(`Base: ${basePromptOutput}`);
    console.log(`Second: ${secondPromptOutput}`)
    console.log(`Final: ${finalOutput}`)
  
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  }
  return (
    <div className="root">
      <Head>
        <title>cmndr</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>.cmndr.</h1>
          </div>
          <div className="header-subtitle">
            <h2>Your best friend for Economics</h2>
          </div>
        </div>

        <div className = "prompt-container">
          <textarea 
          placeholder="Enter a topic or question, then click 'Cook'"
          className = "prompt-box"
          value = {userInput}
          onChange = {onUserChangedText}
          />
        
        <div className = "prompt-buttons">
            <a 
              className = {isGenerating ? 'generate-button loading' : 'generate-button'} 
              onClick = {callGenerateEndpoint}
            >
            <div className = "generate">
                {isGenerating ? <span className='loader'> </span> : <button accessKey='o'><b>Cook 🧑‍🍳</b></button>}
            </div>
            </a>
          </div>
          <div className = "output">
            <div className = "output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        </div>
        <div className='warning'>
          <p><b>Results are produced by AI, so may be inconsistent!</b></p>
        </div>
        <div className = "creds">
            <a href = "https://www.solo.to/trishan">Made by Trishan Chudasma</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
