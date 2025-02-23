import React, { useState } from 'react';

const FinanceQuiz = () => {
  // State to store answers
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Emily earns $3,000 per month and follows the 50/30/20 rule. Her rent is $1,200, groceries cost her $300, and she spends $400 on entertainment each month. What should she do to make sure she’s following the rule correctly?",
      options: [
        "Emily is spending too much on entertainment and should cut it down to $100.",
        "Emily is spending too much on entertainment and groceries and should reduce both.",
        "Emily should cut back on entertainment and savings, as the remaining budget is not enough.",
        "Emily is spending too much on rent and should find a cheaper apartment."
      ],
      correctAnswer: 1 // Index of the correct option
    },
    {
      id: 2,
      question: "Dave has $3,000 in monthly expenses, including rent, utilities, and groceries. His income is $3,100. What financial problem is Dave facing?",
      options: [
        "Dave is living below his means and should save more.",
        "Dave is living paycheck to paycheck and has very little room for savings.",
        "Dave is saving a lot of money for future investments.",
        "Dave has a good emergency fund and no financial concerns."
      ],
      correctAnswer: 1 // Index of the correct option
    },
    {
      id: 3,
      question: "Jessica has a savings account with $1,000. She needs $500 for an unexpected medical expense. What should she do with her emergency fund?",
      options: [
        "Withdraw the $500 and keep the balance of $500 for other emergencies.",
        "Use the entire $1,000 and start from scratch.",
        "Borrow money from family instead of using her emergency fund.",
        "Only use $200 and find a way to pay the remaining balance."
      ],
      correctAnswer: 0 // Index of the correct option
    },
    {
      id: 4,
      question: "Mark spends $2,000 on living expenses, including rent, utilities, and groceries. He also owes $1,500 in credit card debt and $1,000 in student loans. If he follows the debt snowball method, which debt should he pay off first?",
      options: [
        "Credit card debt ($1,500)",
        "Student loan debt ($1,000)",
        "Mark should split payments evenly between the two debts.",
        "Mark should focus on saving and pay off the debts later."
      ],
      correctAnswer: 0 // Index of the correct option
    },
    {
      id: 5,
      question: "Julia wants to create a budget to control her spending. She tracks all her expenses for a month and finds she spends $1,000 on needs (rent, utilities), $500 on wants (entertainment, shopping), and $200 on savings. Which of the following steps should she take next?",
      options: [
        "Reduce her savings to $100 and increase her entertainment budget.",
        "Reduce her 'wants' spending to align with her income and make room for more savings.",
        "Keep the budget as is because it’s balanced.",
        "Increase her needs spending to allow more flexibility with entertainment."
      ],
      correctAnswer: 1 // Index of the correct option
    },
    {
      id: 6,
      question: "Steve has $1,000 saved for a vacation, but he receives an unexpected medical bill of $700. What should Steve do?",
      options: [
        "Use the vacation fund for the medical bill and save for the vacation later.",
        "Take out a loan to cover the medical bill and keep the vacation fund intact.",
        "Use the vacation fund and cancel the vacation to avoid paying any medical debt.",
        "Ignore the medical bill and pay it later."
      ],
      correctAnswer: 0 // Index of the correct option
    }
  ];

  // Handle option selection
  const handleOptionChange = (questionId, optionIndex) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  // Calculate the score
  const calculateScore = () => {
    return questions.reduce((score, question) => {
      if (answers[question.id] === question.correctAnswer) {
        score += 1;
      }
      return score;
    }, 0);
  };

  // Display the quiz results
  const showResultsHandler = () => {
    setShowResults(true);
  };

  return (
    <div className="quiz-container">
      <h2>Finance Quiz</h2>
      <form>
        {questions.map((question) => (
          <div key={question.id} className="question">
            <p>{question.question}</p>
            {question.options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={index}
                  checked={answers[question.id] === index}
                  onChange={() => handleOptionChange(question.id, index)}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
      </form>
      <button onClick={showResultsHandler}>Submit</button>

      {showResults && (
        <div className="results">
          <h3>Your Score: {calculateScore()} / {questions.length}</h3>
          <p>{calculateScore() === questions.length ? "Perfect score!" : "Better luck next time!"}</p>
        </div>
      )}
    </div>
  );
};

export default FinanceQuiz;
