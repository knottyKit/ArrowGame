import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiArrowBack, BiX } from "react-icons/bi";

type ModalProps = {
  onSuccess?: () => void;
  onClose?: () => void;
  setUserName: (name: string) => void;
};

const UserModal = ({ onSuccess, onClose, setUserName }: ModalProps) => {
  const [isUserName, setIsUserName] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  const handleSubmit = () => {
    if (isUserName && isUserName.trim() != " ") {
      setUserName(isUserName);
      if (onClose) {
        onClose();
      }
      if (onSuccess) {
        onSuccess();
      }

      //   onSuccess();
    } else {
      setHasError(true);
      return;
    }
  };

  const handleInputChange = (value: string) => {
    setIsUserName(value);
    if (value) {
      setHasError(false);
    }
  };

  return (
    <div
      role="dialog"
      tabIndex={-1}
      className="flex flex-col relative z-50 w-full box-border bg-white outline-none mx-1 my-1 sm:mx-6 sm:my-16 max-w-md rounded-md shadow-small overflow-y-hidden"
    >
      <div className="p-4 flex-initial ">
        <Link href={`../home`}>
          <button
            type="button"
            className="text-sm flex gap-1 items-center opacity-75 hover:opacity-100 hover:text-orange-500 transition"
          >
            <BiArrowBack />
            back to main menu
          </button>
        </Link>
      </div>
      <div className="px-4 w-full pb-4">
        <div className="flex justify-center flex-col items-center gap-3">
          <p>Please enter a user name</p>
          <Input
            type="text"
            labelPlacement="outside"
            placeholder="AngryBuddy13"
            value={isUserName}
            onValueChange={handleInputChange}
            errorMessage={
              hasError ? "Please enter a valid username" : undefined
            }
            color={hasError ? "danger" : "default"}
            isInvalid={hasError}
          />
          <Button
            radius="md"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            onClick={handleSubmit}
          >
            Start Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
