import "./Form.css";

function Form({ children, submitFn, input, dispatch }) {
  return (
    <form onSubmit={submitFn}>
      <input
        placeholder="Letter..."
        onChange={(e) =>
          dispatch({ type: "setLetter", payload: e.target.value })
        }
        value={input}
      ></input>
      {children}
    </form>
  );
}

export default Form;
