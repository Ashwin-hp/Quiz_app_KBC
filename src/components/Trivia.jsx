import React, { useState, useEffect } from "react";
import play from "../assets/play.mp3";
import correct from "../assets/correct.wav";
import wrong from "../assets/wrong.mp3";
import useSound from "use-sound";
export default function Trivia(props) {
  const [question, setQuestion] = useState(null);
  const [selectAnswer, setSelectAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);
  useEffect(() => {
    letsPlay();
  }, [letsPlay]);
  useEffect(() => {
    setQuestion(props.data[props.questionNumber - 1]);
  }, [props.data, props.questionNumber]);
  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };
  const handleClick = (a) => {
    setSelectAnswer(a);
    setClassName("answer active");
    delay(3000, () =>
      setClassName(a.correct ? "answer correct" : "answer wrong")
    );
    delay(5000, () => {
      if (a.correct) {
        correctAnswer();
        delay(1000, () => {
          props.setQuestionNumber((prev) => prev + 1);
          setSelectAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          props.setStop(true);
        });
      }
    });
  };
  return (
    <div className="Trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a) => (
          <div
            className={selectAnswer === a ? className : "answer"}
            onClick={() => handleClick(a)}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}
