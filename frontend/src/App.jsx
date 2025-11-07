import { useState } from "react";
import InputForm from "./components/InputForm";
import ResultView from "./components/ResultView";
import "./App.css";

const App = () => {
  const [maskedText, setMaskedText] = useState("");

  return (
    <div className="app-container">
      <h1 className="app-title">SafePrompt - Data Masking Chat</h1>

      <InputForm onMask={setMaskedText} />

      {maskedText && <ResultView text={maskedText} />}
    </div>
  );
};

export default App;
