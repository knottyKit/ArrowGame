import React from "react";
import { BiX } from "react-icons/bi";
import { Snippet } from "@nextui-org/snippet";

type ModalProps = {
  onClose?: () => void;
};

const MultiplayerModal = ({ onClose }: ModalProps) => {
  return (
    <div
      role="dialog"
      tabIndex={-1}
      className="flex flex-col relative z-50 w-full box-border bg-white outline-none mx-1 my-1 sm:mx-6 sm:my-16 max-w-md rounded-md shadow-small overflow-y-hidden"
    >
      <button
        role="button"
        type="button"
        className="absolute appearance-none select-none top-1 right-1 p-2 z-50 text-foreground-500 rounded-full hover:bg-default-100 active:bg-default-200 tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 close-btn"
        onClick={() => {
          if (onClose) {
            onClose();
          }
        }}
      >
        <BiX fontSize={"20px"} />
      </button>
      <div className="py-4 px-6 flex-initial text-large font-semibold flex flex-col gap-1"></div>
      <div className="px-2 w-full">
        <div className="flex justify-center flex-col items-center">
          <p>Share the link below to play with your friend</p>
          <Snippet>npm install @nextui-org/react</Snippet>
          <button type="button">Create a Room</button>
        </div>
      </div>
    </div>
  );
};

export default MultiplayerModal;
