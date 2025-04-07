
import { useState } from 'react';

const questions = [/* ... full question list ... */];

export default function ExamPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const score = questions.reduce((acc, q, i) => acc + (q.answer === answers[i] ? 1 : 0), 0);
  const wrongAnswers = questions.filter((q, i) => answers[i] !== q.answer);
  const correctAnswers = questions.filter((q, i) => answers[i] === q.answer);

  const selectOption = (index: number) => {
    const updated = [...answers];
    updated[current] = index;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const goTo = (index: number) => {
    if (index >= 0 && index < questions.length) setCurrent(index);
  };

  return (
    <div className="w-full h-screen bg-white p-4 text-sm">
      <div className="flex justify-between items-center border-b pb-2">
        <div>
          <h1 className="text-lg font-semibold">자격검정 CBT 웹체험 문제풀이</h1>
        </div>
        <div className="text-right text-xs">
          <p>전체 문제 수: {questions.length}</p>
          <p>안 푼 문제 수: {questions.filter((_, i) => answers[i] === null).length}</p>
        </div>
      </div>

      <div className="flex mt-4 h-[85%] gap-4">
        {/* 문제 영역 */}
        <div className="w-1/2 border rounded p-4 flex flex-col justify-between">
          <div>
            <div className="font-bold mb-2">제{questions[current].number}문제</div>
            <p className="mb-4 whitespace-pre-wrap">{questions[current].question}</p>
            <div className="space-y-2">
              {questions[current].options.map((opt, i) => (
                <label key={i} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`q${current}`}
                    checked={answers[current] === i}
                    onChange={() => selectOption(i)}
                  />
                  <span>{i + 1}. {opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrent(current - 1)}
              disabled={current === 0}
              className="px-4 py-1 border rounded bg-gray-100 hover:bg-gray-200"
            >이전</button>
            <span className="text-xs">{current + 1} / {questions.length}</span>
            <button
              onClick={() => setCurrent(current + 1)}
              disabled={current === questions.length - 1}
              className="px-4 py-1 border rounded bg-gray-100 hover:bg-gray-200"
            >다음</button>
          </div>
        </div>

        {/* 해설 영역 */}
        <div className="w-1/2 border rounded p-4 bg-gray-50">
          <h3 className="font-semibold text-blue-600 mb-2">📘 해설</h3>
          <p className="text-sm whitespace-pre-wrap">{questions[current].explanation}</p>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-600 text-white rounded shadow"
        >
          임시 답안 제출
        </button>
        {submitted && (
          <button
            onClick={() => {
              setShowExplanation(true);
              setSubmitted(false);
              setCurrent(0);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            해설 보기
          </button>
        )}
      </div>
    </div>
  );
}
