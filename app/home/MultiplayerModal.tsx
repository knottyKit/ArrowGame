import React from "react";
import { BiX } from "react-icons/bi";
import { Snippet } from "@nextui-org/snippet";
import { Button } from "@nextui-org/react";

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
      <div className="px-4 w-full pb-4">
        <div className="flex justify-center flex-col items-center gap-3">
          <p>Share the link below to play with your friend!</p>
          <Snippet symbol="" className="w-full">
            roomID
          </Snippet>
          <Button
            radius="md"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
          >
            Create a room
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MultiplayerModal;
