// src/components/ComponentB.tsx
import React, { useState } from 'react';
import useStore from '../store/useStore';

const ComponentB: React.FC = () => {
  const { data2, addData2 } = useStore((state) => ({
    data2: state.data2,
    addData2: state.addData2,
  }));
  const [input, setInput] = useState('');

  const handleAdd = () => {
    addData2(input);
    setInput('');
  };

  return (
    <div>
      <h1>Component B</h1>
      <ul>
        {data2.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <button onClick={handleAdd}>Add to Data 2</button>
    </div>
  );
};

export default ComponentB;
