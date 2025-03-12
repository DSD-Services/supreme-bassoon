import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./button";
import { faX } from "@fortawesome/free-solid-svg-icons";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export const Dialog = ({ isOpen, onClose, title, children }: DialogProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="bg-opacity-80 fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[425px] rounded-lg border bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold tracking-tight">{title}</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <FontAwesomeIcon icon={faX} />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};
