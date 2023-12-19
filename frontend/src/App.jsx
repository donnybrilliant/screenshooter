import { useState, useEffect } from "react";
import useFetch from "./hooks/useFetch";
import Input from "./components/Input";
import Status from "./components/Status";

const App = () => {
  const { fetchScreenshot, loading, error, downloadUrl } = useFetch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Example: Wait for window to load all assets
    window.addEventListener("load", () => {
      setIsLoading(false);
    });

    // Optional: Clean up the listener
    return () => {
      window.removeEventListener("load", () => {
        setIsLoading(false);
      });
    };
  }, []);

  if (isLoading) {
    return <main>Loading...</main>;
  }

  return (
    <main>
      <Input onSubmit={fetchScreenshot} />
      <Status loading={loading} error={error} downloadUrl={downloadUrl} />
    </main>
  );
};

export default App;
