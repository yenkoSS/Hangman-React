import "./Text.css";

function Text({ text, className }) {
  return <div className={className}>{text}</div>;
}

export default Text;
