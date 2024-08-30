"use client";
import ModalWrapper from "@/components/modal/ModalWrapper";
import React, { useState } from "react";
import MultiplayerModal from "./MultiplayerModal";
import { Button } from "@nextui-org/react";
import Link from "next/link";

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
          <Link href={`./keys`} className="flex justify-center">
            <Button
              radius="md"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            >
              Arcade Mode
            </Button>
          </Link>

          <Button
            radius="md"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            onClick={() => {
              openModal();
            }}
          >
            Multiplayer Mode
          </Button>
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
