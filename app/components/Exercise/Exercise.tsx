'use client';

import React, {useState} from "react";
import Image from "next/image";
import VideoPlayer from "@/app/components/VideoPlayer/VideoPlayer";

const RANDOM_NOTES = [
    undefined,
    undefined,
    undefined,
    'Lorem ipsum odor amet, consectetuer adipiscing elit.',
    'Lorem ipsum odor amet, consectetuer adipiscing elit. Potenti vestibulum interdum elementum tellus dui felis porttitor mauris.',
    'Lorem ipsum odor amet, consectetuer adipiscing elit. Fringilla libero faucibus interdum elit lacinia; ac justo condimentum. Fermentum rutrum sollicitudin rutrum ridiculus tempor lobortis tempor a.',
    'Lorem ipsum odor amet, consectetuer adipiscing elit. Leo leo rutrum placerat quis interdum vehicula aliquet. Imperdiet commodo taciti urna suscipit blandit mus hendrerit primis.',
]

const RANDOM_EXERCISE_NAMES = [
    'Pelvis Tilts',
    'Rolle',
    'Bear Plank Serratus',
    'Kneeling Lean Back',
    'Vierfuessler Pull',
    'Half Knee Drive',
    'Drop Push Up',
    'Split Squat Jumps',
    'Front Squat',
    'Sit To Jump',
    'Reziprok Chest Pres',
    'Ausfallschritt Kombi',
    'Seated Windmill Ohp',
    'Renegade Row Kneel',
    'Pelvis Tilts',
    'Hamstring Bridge Ff',
    'Heel Forefoot Bridg',
    'Kneeling Hip Hinge',
    'Seitstuetz Hip Ext',
    'Power Step Up',
    'Vierfuessler Jump',
    'Kickstance Wallball',
    'Tbar Kickstance',
    'Low Seated Pulldown',
    'Hinge Clean Press',
    'Faultier Row',
    'Triceps Klappmesser',
]



export default function Exercise() {
    const randomNote = RANDOM_NOTES[Math.floor(Math.random() * RANDOM_NOTES.length)];
    const randomExerciseName = RANDOM_EXERCISE_NAMES[Math.floor(Math.random() * RANDOM_EXERCISE_NAMES.length)];

    const [display, setDisplay] = useState(false);
    const [textArea, setTextArea] = useState(randomNote);

    const reps = Math.floor(Math.random() * 100);
    const measureConfig = {
        'reps': '#',
        'seconds': '⏱︎',
    }
    const measureTypes = Object.keys(measureConfig);
    const measure: string = measureTypes[Math.floor(Math.random() * measureTypes.length)];
    const iconForMeasure = measureConfig[measure as keyof typeof measureConfig];


    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextArea(event.target.value);
    };
    return (
        <div className={'w-96 flex flex-col rounded-lg border border-neutral-700'}>
            <div className={'relative aspect-video rounded-t-lg cursor-pointer'} onClick={() => setDisplay(!display)}>
                <Image
                    src={`https://picsum.photos/1080/721?random=${Math.random().toString(36).substring(7)}`}
                    alt={'Woman holding dumbbell in white crew neck t-shirt'}
                    width={1080}
                    height={721}
                    className={'rounded-t-lg object-cover w-96 h-52'}/>
                <span
                    className='w-16 h-16 text-5xl absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 text-white inline-flex justify-center items-center rounded-full bg-neutral-800/75'
                >
                    &#9205;
                </span>
            </div>
            <div className='p-2 flex flex-row justify-between'>
                <div className='font-bold text-xl'>{randomExerciseName}</div>
                <div className='inline-flex items-center gap-1'>
                    <span className='font-extrabold text-xl'>{iconForMeasure}</span> {reps} <small>{measure}</small>
                </div>
            </div>
            <textarea
                className='resize-none m-2 p-2 bg-slate-100 dark:bg-neutral-900 dark:text-slate-100 text-neutral-800 focus:outline-none'
                value={textArea}
                onChange={handleChange}
                placeholder='Your notes'
                rows={5}/>
            {display && (
                <div
                    className='fixed left-0 top-0 right-0 bottom-0 z-50 bg-black flex flex-col items-center justify-center'>
                    <button onClick={() => setDisplay(!display)}>close</button>
                    <VideoPlayer videoUrl='https://www.youtube.com/watch?v=5mGuCdlCcNM'/>
                </div>
            )}
        </div>);
}