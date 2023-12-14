import { useState } from "react";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const fetchScreenshot = async (url) => {
    setLoading(true);
    setError(null);
    setDownloadUrl(null);
    try {
      const response = await fetch(`http://localhost:3000/shoot?url=${url}`);
      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setDownloadUrl(data.screenshotUrl);
        } else {
          const text = await response.text();
          setError(text);
        }
      } else {
        const errorText = await response.json();
        setError(errorText.error);
      }
    } catch (e) {
      setError("Failed to fetch screenshot: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return { fetchScreenshot, loading, error, downloadUrl };
};

export default useFetch;
