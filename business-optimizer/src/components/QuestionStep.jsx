import React, { useState } from 'react';

const QuestionStep = ({ question, onSubmit }) => {
  const [value, setValue] = useState('');

  const handle = e => {
    e.preventDefault();
    onSubmit(question.id, value);
    setValue('');
  };

  return (
    <form onSubmit={handle} className="p-4 space-y-2">
      <div>{question.prompt}</div>
      <input value={value} onChange={e=>setValue(e.target.value)} className="border p-2" />
      <button className="bg-blue-500 text-white p-2">Submit</button>
    </form>
  );
};

export default QuestionStep;
