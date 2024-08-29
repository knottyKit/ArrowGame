"use client";
import React, { ReactElement } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: ReactElement;
  parentRef?: Element | null;
};

const ModalWrapper = ({ children, parentRef }: ModalProps) => {
  return (
    <>
      {createPortal(
        <section tabIndex={-1} className="z-50">
          <div className=" bg-black/20 backdrop-opacity-disabled w-screen h-screen fixed inset-0"></div>
          <div className="flex w-screen h-[100dvh] fixed inset-0   justify-center [--scale-enter:100%] [--scale-exit:100%] [--slide-enter:0px] [--slide-exit:80px] sm:[--scale-enter:100%] sm:[--scale-exit:103%] sm:[--slide-enter:0px] sm:[--slide-exit:0px] items-end sm:items-center overflow-hidden">
            {children}
          </div>
        </section>,
        parentRef ? parentRef : document.body
      )}
    </>
  );
};

export default ModalWrapper;
