import React from 'react';
import './App.css';
import {ReactComponent as Logo} from './Multiple-choice.svg';

interface Question {
  question: string,
  choices: Array<string>,
}

const questions: Question[] = [
  {question: "what does your dad do?", choices: ["He didn't do that.", "He often exercises.", "He is a teacher", "He is going home.", "Not sure."]},
  {question: "how did you find the meal?", choices: ["It was not far from here.", "We asked for it", "it was horrible", "I made it myself.", "Not sure."]}
]

function App() {
  return (
    <div className="App flex flex-col ibm-plex-sans-thai-regular">
      <div id="header" className='fixed top-0 left-0 right-0 bg-white flex'>
        <span id='header-text' className='w-full pl-20 py-6 text-3xl text-left font-bold content-center'>EDSY.</span>
      </div>
      {/* change states here */}
      <div className='content bg-white mx-52 my-36 rounded-3xl'>
        <div>General English Test</div>
        <div className='general-info'>
          <div className='general-info-box'>
            <div>Total questions</div>
            <div>{questions.length} questions</div>
          </div>
          <div className='general-info-box'>
            <div>Test duration</div>
            <div>5:00 mins</div>
          </div>
        </div>
        <div><Logo /></div>
        <div>
          <button>Start the test</button>
        </div>
      </div> 
    </div>
  );
}

export default App;
