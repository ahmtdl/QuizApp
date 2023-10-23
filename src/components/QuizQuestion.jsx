import React, { useEffect, useState } from "react";
import { decode } from "html-entities";

export default function QuizQuestion({ quiz }) {
  const [questions, setQuestions] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    const newArr = quiz.map((q, index) => {
      const shuffledAnswers = shuffleArray([
        ...q.incorrect_answers,
        q.correct_answer,
      ]);
      return {
        question: q.question,
        answers: shuffledAnswers,
        correctAnswer: q.correct_answer,
        selectedAnswer: null,
        id: index,
      };
    });

    setQuestions(newArr);
  }, [quiz]);

  function shuffleArray(array) {
    const copyArr = [...array];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]];
    }
    return copyArr;
  }

  const handleAnswerSelection = (questionIndex, selectedAnswer) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].selectedAnswer = selectedAnswer;
      return updatedQuestions;
    });
  };

  const handleSolution = () => {
    const updatedQuestions = questions.map((question) => {
      if (question.selectedAnswer === question.correctAnswer) {
        question.result = "correct";
      } else {
        question.result = "incorrect";
      }
      return question;
    });
    setQuestions(updatedQuestions);
    setShowAnswers(true);
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center mt-20'>
        {questions.map((question, questionIndex) => (
          <div
            key={question.id}
            className='flex flex-col items-center w-11/12 mb-6 border-b-1 border-mor'
          >
            <h2 className='mb-4 text-center text-2xl font-bold font-karla'>
              {decode(question.question)}
            </h2>
            <div className='flex flex-row'>
              {question.answers.map((answer, answerIndex) => (
                <label
                  key={answerIndex}
                  className='mr-3 block relative rounded-lg border-indigo-950 border-7.9 hover:bg-morumsu mb-4'
                >
                  <input
                    type='radio'
                    name={`question_${questionIndex}`}
                    value={answer}
                    checked={question.selectedAnswer === answer}
                    onChange={() =>
                      handleAnswerSelection(questionIndex, answer)
                    }
                    className='sr-only'
                  />
                  <span
                    className={`${
                      showAnswers && question.correctAnswer === answer
                        ? "bg-green"
                        : showAnswers &&
                          question.result === "incorrect" &&
                          question.selectedAnswer === answer
                        ? "bg-red"
                        : question.selectedAnswer === answer
                        ? "bg-morumsu"
                        : ""
                    } flex rounded-lg p-2 px-4`}
                  >
                    {decode(answer)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          className='rounded-lg bg-mor p-4 px-12 hover:bg-morumsu rounded-2xl border-indigo-950 border-7.9 mb-20'
          onClick={handleSolution}
        >
          Check Answers
        </button>
      </div>
    </>
  );
}
