'use client';

import ReactPlayer from 'react-player/lazy'
import React from "react";

export default function Exercise() {
    return (
        <div className={'bg-gray-500 p-2 w-96 grid grid-cols-2'}>
            <span className='font-bold'>Pelvis Tilts</span>
            <span className='text-right font-thin'>⊘</span>
            <div className='col-span-2'>
                <textarea className='w-full text-black'>this is a note</textarea>
            </div>
            <div className='col-span-2'>
                <ReactPlayer
                    url='https://www.youtube.com/watch?v=5mGuCdlCcNM'
                    width={'100%'}
                    height={'100%'}
                    playsinline={true}
                    controls={true}
                    config={{
                        youtube: {
                            playerVars: {
                                cc_lang_pref: 'de',
                                cc_load_policy: 1
                            }
                        }
                    }}
                />
            </div>
        </div>);
}