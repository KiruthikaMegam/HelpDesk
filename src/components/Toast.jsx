import "./Toast.css";

function Toast({ message, type }) {
  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-symbol">
        {type === "error" ? "!" : "✓"}
      </div>

      <div>
        <strong>
          {type === "error" ? "Error" : "Success"}
        </strong>

        <span>{message}</span>
      </div>
    </div>
  );
}

export default Toast;