import { useState } from "react";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const fetchScreenshot = async (url) => {
    setLoading(true);
    setError(null);
    setDownloadUrl(null); // Reset downloadUrl here
    try {
      const response = await fetch(`http://localhost:3000/shoot?url=${url}`);
      const data = await response.json();
      setDownloadUrl(data.screenshotUrl);
    } catch (e) {
      setError("Failed to fetch screenshot");
    } finally {
      setLoading(false);
    }
  };

  return { fetchScreenshot, loading, error, downloadUrl };
};

export default useFetch;
