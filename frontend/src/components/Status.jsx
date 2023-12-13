const Status = ({ loading, error, downloadUrl }) => {
  return (
    <div id="status">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {downloadUrl && (
        <a href={downloadUrl} download>
          Download Screenshot
        </a>
      )}
    </div>
  );
};

export default Status;
