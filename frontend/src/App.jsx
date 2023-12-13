import useFetch from "./hooks/useFetch";
import Input from "./components/Input";
import Status from "./components/Status";

const App = () => {
  const { fetchScreenshot, loading, error, downloadUrl } = useFetch();

  return (
    <main>
      <Input onSubmit={fetchScreenshot} />
      <Status loading={loading} error={error} downloadUrl={downloadUrl} />
    </main>
  );
};

export default App;
