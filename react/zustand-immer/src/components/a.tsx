// src/components/ComponentA.tsx
import React, { useState } from 'react';
import useStore from '../store/useStore';

const ComponentA: React.FC = () => {
  const { data1, addData1 } = useStore((state) => ({
    data1: state.data1,
    addData1: state.addData1,
  }));
  const [input, setInput] = useState('');

  const handleAdd = () => {
    addData1(input);
    setInput('');
  };

  return (
    <div>
      <h1>Component A</h1>
      <ul>
        {data1.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <button onClick={handleAdd}>Add to Data 1</button>
    </div>
  );
};

export default ComponentA;
