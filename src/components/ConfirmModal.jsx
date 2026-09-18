import "./ConfirmModal.css";

function ConfirmModal({
  open,
  title,
  message,
  confirmText = "Delete",
  onConfirm,
  onCancel,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="confirm-overlay">
      <div className="confirm-modal">
        <div className="confirm-warning">!</div>

        <h3>{title}</h3>

        <p>{message}</p>

        <div className="confirm-actions">
          <button
            className="confirm-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="confirm-delete"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;