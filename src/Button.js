import "./Button.css";

function Button({ value, onClick }) {
  return (
    <button onClick={onClick} type="submit" className="button-53">
      {value}
    </button>
  );
}

export default Button;
