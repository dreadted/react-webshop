import React, { useState } from "react";

const TestForm = () => {
  // const [email, setEmail] = useState("");

  type UseInputState = {
    (initialValue: string | (() => string)): [
      string,
      HandleChange,
      HandleClick
    ];
  };

  const useInputState: UseInputState = initialValue => {
    const [value, setValue] = useState(initialValue);
    const handleChange: HandleChange = e => {
      setValue(e.target.value);
    };
    const reset: HandleClick = e => {
      setValue("");
    };
    return [value, handleChange, reset];
  };

  const [email, updateEmail, resetEmail] = useInputState("");

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value);
  // };
  return (
    <div className="row">
      <div className="col">
        <h1>The value is... {email}</h1>
        <input type="text" value={email} onChange={updateEmail} />
        <button onClick={resetEmail}>reset</button>
      </div>
    </div>
  );
};

export default TestForm;
