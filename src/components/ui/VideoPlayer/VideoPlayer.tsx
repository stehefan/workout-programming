'use client';

import ReactPlayer from "react-player/lazy";
import React, { useEffect, useRef } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";

export type VideoPlayerProps = {
    videoUrl: string;
    closeFn: () => unknown
}

export default function VideoPlayer(props: VideoPlayerProps) {
    const modalRef = useRef(null);

    useEffect(() => {
        if (modalRef.current) {
            // @ts-expect-error modalRef.current.focus() is not null
            modalRef.current.focus();
        }
    })

    return (
        <div onKeyDown={(keyDown) => {
            if (keyDown.key === 'Escape') {
                props.closeFn()
            }
        }}
            className='fixed left-0 top-0 right-0 bottom-0 z-50 bg-black flex flex-col items-center justify-center'>
            <button
                ref={modalRef}
                className='outline-hidden font-bold mb-6 text-xl flex items-center'
                onClick={props.closeFn}>
                <XCircleIcon className='size-10 pr-2' /> close
            </button>
            <ReactPlayer
                url={props.videoUrl}
                width={'75%'}
                height={'75%'}
                playsinline={true}
                controls={true}
                config={{
                    youtube: {
                        playerVars: {
                            cc_lang_pref: 'de',
                            cc_load_policy: 1
                        }
                    }
                }} />
        </div>
    )
}