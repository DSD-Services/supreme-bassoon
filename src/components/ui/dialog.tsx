import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./button";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  backdropClassName?: string;
  className?: string;
};

export const Dialog = ({
  isOpen,
  onClose,
  title,
  children,
  backdropClassName,
  className,
}: DialogProps) => {
  useEffect(() => {
    const dialog = document.querySelector("[role='dialog']");

    const focusableElement = dialog?.querySelector("button");

    if (focusableElement) {
      (focusableElement as HTMLElement).focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "bg-opacity-80 fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm",
        backdropClassName,
      )}
      onClick={onClose}
      aria-labelledby="dialog-title"
      aria-hidden={!isOpen}
    >
      <div
        className={cn(
          "w-full max-w-[425px] rounded-lg border bg-white p-6",
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-describedby="dialog-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          id="dialog-content"
          className="mb-4 flex items-center justify-between"
        >
          <h3 id="dialog-title" className="text-xl font-bold tracking-tight">
            {title}
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <FontAwesomeIcon icon={faX} />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};
