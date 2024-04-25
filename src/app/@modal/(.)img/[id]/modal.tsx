"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { CgCloseR } from "react-icons/cg";
export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className=" flex h-full  w-full items-center justify-center bg-primary/30 text-primary"
      onClose={onDismiss}
    >
      <div className="relative h-[95%]  w-[95%] rounded-md bg-muted shadow-md p-8">
        {children}
        <button
          onClick={onDismiss}
          className="close-button absolute right-3 top-3 text-secondary-foreground/90 hover:text-destructive"
        >
          <CgCloseR fontSize={"1.5rem"} />
        </button>
      </div>
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
