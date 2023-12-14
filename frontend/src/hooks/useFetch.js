import { useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  // Check if a string is a valid URL
  const isValidUrl = (url) => {
    try {
      // Check if the URL starts with 'http://' or 'https://'
      if (!url.match(/^(http:\/\/|https:\/\/)/i)) {
        // If not, prepend 'http://' to the URL
        url = `http://${url}`;
      }

      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const fetchScreenshot = async (url) => {
    setLoading(true);
    setError(null);
    setDownloadUrl(null);
    try {
      if (!isValidUrl(url)) {
        return setError("Invalid URL provided");
      }
      const response = await fetch(`${BASE_URL}/shoot?url=${url}`);
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
      setError("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return { fetchScreenshot, loading, error, downloadUrl };
};

export default useFetch;
