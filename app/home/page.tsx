"use client";
import ModalWrapper from "@/components/modal/ModalWrapper";
import React, { useState } from "react";
import MultiplayerModal from "./MultiplayerModal";

const page = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  return (
    <section className="bg-white max-w-[1200px] py-[120px] mx-auto">
      <div className="flex justify-center">
        <h1>Welcome to Arrow Dash</h1>
      </div>
      <div className="flex items-center flex-col">
        <h6>Choose a mode:</h6>
        <div className="flex gap-3 flex-col">
          <button type="button">
            <h5>Arcade Mode</h5>
          </button>
          <button
            type="button"
            onClick={() => {
              openModal();
            }}
          >
            <h5>Multiplayer Mode</h5>
          </button>
        </div>
      </div>{" "}
      {isModalOpen && (
        <ModalWrapper>
          <MultiplayerModal
            onClose={() => {
              setIsModalOpen(false);
            }}
          ></MultiplayerModal>
        </ModalWrapper>
      )}
    </section>
  );
};

export default page;
