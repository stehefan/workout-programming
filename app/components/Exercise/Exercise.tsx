'use client';

import ReactPlayer from 'react-player/lazy'
import React, {useState} from "react";
import Image from "next/image";

export default function Exercise() {
    const [display, setDisplay] = useState(false);
    const [textArea, setTextArea] = useState('this is a note')

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextArea(event.target.value);
    };
    return (
        <div className={'w-96 flex flex-col rounded-lg border border-neutral-700'}>
            <div className={'relative aspect-video rounded-t-lg cursor-pointer'}>
                <Image
                    src={`https://picsum.photos/1080/721?random=${Math.random().toString(36).substring(7)}`}
                    alt={'Woman holding dumbbell in white crew neck t-shirt'}
                    width={1080}
                    height={721}
                    onClick={() => setDisplay(!display)}
                    className={'rounded-t-lg object-cover w-96 h-52'}/>
                <span
                    className='w-16 h-16 text-5xl absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 text-white inline-flex justify-center items-center rounded-full bg-neutral-800/75'
                >
                    &#9205;
                </span>
            </div>
            <div>

                <div>Pelvis Tilts</div>
                <div>7 repetitions</div>
                <textarea
                    className='resize-none w-full p-2 bg-slate-100 dark:bg-neutral-800 border border-neutral-800 dark:border-slate-100 dark:text-slate-100 text-neutral-800'
                    value={textArea} onChange={handleChange} rows={5}></textarea>
            </div>
            {display && (
                <div
                    className='fixed left-0 top-0 right-0 bottom-0 z-50 bg-black flex flex-col items-center justify-center'>
                    <button onClick={() => setDisplay(!display)}>close</button>
                    <ReactPlayer
                        url='https://www.youtube.com/watch?v=5mGuCdlCcNM'
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
                </div>
            )}
        </div>);
}