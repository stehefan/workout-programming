'use client';

import ReactPlayer from "react-player/lazy";
import React from "react";

export type VideoPlayerProps = {
    videoUrl: string;
}

export default function VideoPlayer(props: VideoPlayerProps) {
    return (
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
            }}/>
    )
}