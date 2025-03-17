import React, { useState, useEffect } from "react";

const Status = ({ loading, error, downloadUrl }) => {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDotCount((prevCount) => (prevCount + 1) % 4);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [loading]);

  return (
    <div id="status">
      {loading && <p>Loading{".".repeat(dotCount)}</p>}
      {error && <p>{error}</p>}
      {downloadUrl && (
        <a href={downloadUrl} download>
          Download Screenshot
        </a>
      )}
    </div>
  );
};

export default Status;
