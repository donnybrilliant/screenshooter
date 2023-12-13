import { useState } from "react";

const Input = ({ onSubmit }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL here"
        autoFocus
      />
      <button type="submit">Shoot</button>
    </form>
  );
};

export default Input;
