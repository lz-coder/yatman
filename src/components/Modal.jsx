import { IoClose } from "react-icons/io5";

const Modal = ({
  title,
  children,
  closeHandler,
  onKeyUp,
  titlebarClasses,
  dialogClasses,
}) => {
  return (
    <div
      className="fixed left-0 top-0 grid h-full w-full place-items-center overflow-hidden bg-black bg-opacity-20"
      onClick={closeHandler}
    >
      <div
        className={`mx-auto mb-40 flex min-w-80 max-w-xs flex-col border-2 border-solid border-slate-700 bg-slate-600 p-2 text-white md:max-w-xl ${dialogClasses}`}
        onClick={(e) => e.stopPropagation()}
        onKeyUp={onKeyUp}
      >
        <div className={`relative mb-6 ${titlebarClasses}`}>
          <p className="text-center text-lg font-bold">{title}</p>
          <button
            className="absolute right-0 top-0 hover:text-red-500"
            onClick={closeHandler}
          >
            <IoClose size={32} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
