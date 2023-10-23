import { useState, useEffect } from "react";
import QuizQuestion from "./components/QuizQuestion";
import { decode } from "html-entities";

export default function App() {
  const [quiz, setQuiz] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(9);
  const [difficulty, setDifficulty] = useState("easy");
  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.trivia_categories));
  }, []);

  const handleCategoryChange = (e) => {
    let value = e.target.value;
    setCategory(value);
    console.log(value);
  };

  const handleDifficultyChange = (e) => {
    let value = e.target.value;
    setDifficulty(value);
    console.log(value);
  };

  const handleStartQuiz = async () => {
    setLoading(true);
    await fetch(
      `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => {
        setQuiz(decode(data.results));
        setLoading(false);
        setQuizStarted(true);
      });
  };

  return (
    <>
      {quizStarted ? (
        <QuizQuestion quiz={quiz} />
      ) : (
        <div className='flex justify-center mt-20'>
          <div className='flex items-center flex-col w-3/5'>
            <h1 className='text-3xl text-black font-karla mb-10'>
              Test Your Knowledge
            </h1>
            <form className='flex flex-col font-karla w-full mb-6'>
              <label className='block font-inter mb-4 text-center text-2xl font-bold'>
                Select a category
              </label>
              <div className='mb-4 flex flex-wrap gap-1 justify-center'>
                {categories.map((x) => (
                  <label
                    key={x.id}
                    className='block relative rounded-lg border-indigo-950 border-7.9'
                  >
                    <input
                      type='radio'
                      name='category'
                      value={x.id}
                      checked={category === x.id}
                      onChange={handleCategoryChange}
                      className='mr-2 sr-only'
                    />
                    <div
                      className={`${
                        category === x.id.toString() ? "bg-morumsu" : ""
                      } rounded-lg p-2 px-4 hover:bg-morumsu cursor-pointer`}
                    >
                      {x.name}
                    </div>
                  </label>
                ))}
              </div>
              <label className='block font-inter mb-4 text-center text-2xl font-bold font-karla'>
                Select difficulty
              </label>
              <div className='mb-4 flex flex-wrap gap-1 justify-center'>
                {["easy", "medium", "hard"].map((x) => (
                  <label
                    key={x}
                    className='block relative rounded-lg border-indigo-950 border-7.9'
                  >
                    <input
                      type='radio'
                      name='difficulty'
                      value={x}
                      checked={difficulty === x}
                      onChange={handleDifficultyChange}
                      className='mr-2 sr-only'
                    />
                    <div
                      className={`${
                        difficulty === x ? "bg-morumsu" : ""
                      } rounded-lg p-2 px-4 hover:bg-morumsu cursor-pointer`}
                    >
                      {x}
                    </div>
                  </label>
                ))}
              </div>
            </form>
            <button
              onClick={handleStartQuiz}
              disabled={loading}
              className='rounded-lg bg-mor p-4 px-12 hover:bg-morumsu rounded-2xl border-indigo-950 border-7.9'
            >
              Start Quiz
            </button>
          </div>
        </div>
      )}
    </>
  );
}
