import React, { useState } from "react";
import "./App.css";
import Exercise from "./Exercise";
import Introduction from "./Introduction";

enum State {
  Introduction = 0,
  Exercise = 1,
  Summary = 2,
}

export interface Question {
  question: string;
  choices: Array<string>;
}

// Assumption: configuration JSON file or load from the server
const questions: Question[] = [
  {
    question: "what does your dad do?",
    choices: [
      "He didn't do that.",
      "He often exercises.",
      "He is a teacher",
      "He is going home.",
      "Not sure.",
    ],
  },
  {
    question: "how did you find the meal?",
    choices: [
      "It was not far from here.",
      "We asked for it",
      "it was horrible",
      "I made it myself.",
      "Not sure.",
    ],
  },
];

export default function App() {
  const [currentState, setCurrentState] = useState<State>(State.Introduction);

  const renderStateComponent = (state: State) => {
    switch (state) {
      case State.Introduction:
        return (
          <Introduction
            questions={questions}
            onClickStart={() => setCurrentState(State.Exercise)}
          />
        );
      case State.Exercise:
        return (
          <Exercise
            questions={questions}
            onClickSubmit={() => setCurrentState(State.Summary)}
          />
        );
      case State.Summary:
        return <>Summary</>;
      default:
        return null;
    }
  };

  return (
    <div className="App flex flex-col ibm-plex-sans-thai-regular">
      <div id="header" className="fixed top-0 left-0 right-0 bg-white flex">
        <span
          id="header-text"
          className="w-full pl-20 py-6 text-3xl text-left font-bold content-center"
        >
          EDSY.
        </span>
      </div>
      <div className="content bg-white mx-52 my-36 rounded-3xl">
        {renderStateComponent(currentState)}
      </div>
    </div>
  );
}
