'use client';

import {createPortal} from "react-dom";
import {ElementRef, useEffect, useRef} from "react";
import {useRouter} from "next/navigation";

export type ModalProps = {
    children: React.ReactNode;
    showCloseButton?: boolean;
}

export default function Modal({children, showCloseButton = false}: ModalProps) {
    const router = useRouter();
    const dialogRef = useRef<ElementRef<'dialog'>>(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
            document.body.classList.add('modalOpen');
        }
    }, []);

    function onDismiss() {
        router.back();
        document.body.classList.remove('modalOpen');
    }

    return createPortal(
        <div className='absolute top-0 left-0 h-dvh w-dvw z-50 dark:bg-neutral-300/75 bg-neutral-700/75'>
            <dialog ref={dialogRef} className='flex w-3/4 p-10 bg-background text-foreground' onClose={onDismiss}>
                {children}
                {showCloseButton && <button onClick={onDismiss} className="absolute top-0 right-0 p-2">Close</button>}
            </dialog>
        </div>,
        document.getElementById('modal-root')!
    )
}