import React from "react";

interface TextInputProps {
  id: string;
  name?: string;
  label: string;
  onChange: HandleChange;
  value?: string;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  name,
  label,
  onChange,
  value,
  error
}) => {
  const wrapperClass = error?.length ? "form-group has-error" : "form-group";

  return (
    <div className={wrapperClass}>
      <label htmlFor={id}>{label}</label>
      <div className="field">
        <input
          id={id}
          name={id}
          type="text"
          onChange={onChange}
          className="form-control"
          value={value}
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default TextInput;
