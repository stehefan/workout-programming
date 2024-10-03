'use client';

import ReactPlayer from 'react-player/lazy'
import React, {useState} from "react";

export default function Exercise() {
    const [display, setDisplay] = useState(false);
    const [textArea, setTextArea] = useState('this is a note')

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextArea(event.target.value);
    };

    return (
        <div className={'bg-slate-100 dark:bg-neutral-800 p-2 w-96 grid grid-cols-[30%_70%] gap-2 rounded-lg'}>
            <div className='font-bold'>Name</div>
            <div className='font-thin'>Pelvis Tilts</div>
            <div className='font-bold'>Repetitions</div>
            <div className='font-thin'>⊘</div>
            <div className='font-bold'>Notes</div>
            <div className='pr-2'>
                <textarea className='resize-none w-full p-2 bg-slate-100 dark:bg-neutral-800 border border-neutral-800 dark:border-slate-100 dark:text-slate-100 text-neutral-800' value={textArea} onChange={handleChange} rows={5}></textarea>
            </div>
            <div className='font-bold'>
                Video
            </div>
            <div>
                <button onClick={() => setDisplay(!display)}>show</button>
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