import { useEffect, useState } from "react";
import "./App.css";

type Variable = {
  name: string;
  value: string;
};

type Result = {
  output: string | null;
  error: string | null;
};

function App() {
  const [variables, setVariables] = useState<Variable[]>([
    { name: "Name", value: "Octostache" },
  ]);
  const [input, setInput] = useState("Hello, #{Name}!");
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    async function evaluateInput() {
      const { evaluate } = await import("../public/assets/octostache");
      const resultData = await evaluate(input, JSON.stringify(variables));
      setResult(JSON.parse(resultData));
    }
    evaluateInput();
  }, [variables, input]);

  function setVariableName(index: number, name: string) {
    variables[index].name = name;
    setVariables([...variables]);
  }

  function setVariableValue(index: number, value: string) {
    variables[index].value = value;
    setVariables([...variables]);
  }

  function removeVariable(index: number) {
    variables.splice(index, 1);
    setVariables([...variables]);
  }

  function addVariable() {
    setVariables([...variables, { name: "", value: "" }]);
  }

  const Loading = () => <h2>Loading...</h2>;

  return (
    <div>
      <h1>Octostache Playground</h1>
      {!result ? (
        <Loading />
      ) : (
        <div>
          {variables.map((v, i) => (
            <div key={`var-${i}`}>
              <button onClick={() => removeVariable(i)}>-</button>
              <input
                type="text"
                value={v.name}
                onChange={(event) => setVariableName(i, event.target.value)}
              />
              <input
                type="text"
                value={v.value}
                onChange={(event) => setVariableValue(i, event.target.value)}
              />
            </div>
          ))}
          <button onClick={addVariable}>Add Variable</button>
          <p>Input:</p>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <p>Output:</p>
          <p>{result?.output}</p>
          {result?.error && (
            <div>
              <p>Error:</p>
              <p>{result?.error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
