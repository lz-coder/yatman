import Modal from "./Modal";
import IconLabelButton from "./widgets/IconLabelButton";

const ConfirmationDialog = ({
  title,
  message,
  isDestructive,
  closeDialogCallback,
  confirmationCallback,
}) => {
  const messageClasses = isDestructive ? "text-red-400" : "text-white";
  const confirmButtonClasses = isDestructive
    ? "bg-red-600 hover:bg-red-400"
    : "bg-green-600 over:bg-green-400";
  const buttonsClasses = "px-3 py-1";

  return (
    <Modal
      title={title}
      closeHandler={closeDialogCallback}
      onKeyUp={closeDialogCallback}
      titlebarClasses={`${isDestructive && "bg-orange-400"}`}
      dialogClasses="h-fit"
    >
      <div>
        <p className={`text-center text-lg font-semibold ${messageClasses}`}>
          {message}
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <IconLabelButton
            label="Delete"
            showIcon={false}
            onClick={confirmationCallback}
            className={`${buttonsClasses} ${confirmButtonClasses}`}
          />
          <IconLabelButton
            label="Cancel"
            showIcon={false}
            className={`${buttonsClasses} bg-blue-600 hover:bg-blue-400`}
            onClick={closeDialogCallback}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;
