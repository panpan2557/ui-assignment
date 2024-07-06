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
  id: number;
  text: string;
  choices: Array<{ id: number; text: string }>;
}

// Assumption: configuration JSON file or load from the server
const questions: Question[] = [
  {
    id: 0,
    text: "What does your dad do?",
    choices: [
      { id: 0, text: "He didn't do that." },
      { id: 1, text: "He often exercises." },
      { id: 2, text: "He is a teacher" },
      { id: 3, text: "He is going home." },
      { id: 4, text: "Not sure." },
    ],
  },
  {
    id: 1,
    text: "How did you find the meal?",
    choices: [
      { id: 0, text: "It was not far from here." },
      { id: 1, text: "We asked for it" },
      { id: 2, text: "it was horrible" },
      { id: 3, text: "I made it myself." },
      { id: 4, text: "Not sure." },
    ],
  },
  {
    id: 2,
    text: "I find living in the city very stressful.",
    choices: [
      { id: 0, text: "I can't find it." },
      { id: 1, text: "Where do you find it?" },
      { id: 2, text: "So do I." },
      { id: 3, text: "I also live in the city." },
      { id: 4, text: "Not sure." },
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
