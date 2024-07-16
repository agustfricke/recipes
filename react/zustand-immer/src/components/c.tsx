// src/components/ComponentC.tsx
import React, { useState } from 'react';
import useStore from '../store/useStore';

const ComponentC: React.FC = () => {
  const { addData1, addData2 } = useStore((state) => ({
    addData1: state.addData1,
    addData2: state.addData2,
  }));
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const handleAdd = () => {
    addData1(input1);
    addData2(input2);
    setInput1('');
    setInput2('');
  };

  return (
    <div>
      <h1>Component C</h1>
      <input 
        type="text" 
        placeholder="Data 1" 
        value={input1} 
        onChange={(e) => setInput1(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Data 2" 
        value={input2} 
        onChange={(e) => setInput2(e.target.value)} 
      />
      <button onClick={handleAdd}>Add Both Data</button>
    </div>
  );
};

export default ComponentC;
