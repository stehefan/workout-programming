'use client';

import React, {useState} from "react";
import Image from "next/image";
import VideoPlayer from "@/app/components/VideoPlayer/VideoPlayer";
import {ExerciseEntry} from "@/types/Exercise";
import PreviewImagePlaceholder from "@/app/components/Exercise/PreviewImagePlaceholder";
import {updateNote} from "@/app/actions";

export type ExerciseProps = {
    exercise: ExerciseEntry;
}

export default function Exercise(props: ExerciseProps) {
    const [display, setDisplay] = useState(false);
    const [note, setNote] = useState(props.exercise.note);
    const [isSaving, setIsSaving] = useState(false)

    const hasVideo = props.exercise.videoUrl !== undefined;
    const hasPreviewImage = props.exercise.previewImageUrl !== undefined;
    const saveIndicatorIsEnabled = note !== props.exercise.note;

    const handleSave = async (formData: FormData) => {
        try {
            await updateNote(formData)
                .then(() => {
                    setTimeout(() => {
                        setIsSaving(false);
                    }, 2000)
                });
        } catch (e: unknown) {
            console.error(e)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(event.target.value);
    };

    return (
        <div className={'w-96 flex flex-col rounded-lg border border-neutral-300 dark:border-neutral-600'}>
            <div className={'relative aspect-video rounded-t-lg cursor-pointer'} onClick={() => setDisplay(!display)}>
                {hasPreviewImage ? (
                    <Image
                        src={props.exercise.previewImageUrl!}
                        alt={'Woman holding dumbbell in white crew neck t-shirt'}
                        width={1080}
                        height={721}
                        className={'rounded-t-lg object-cover w-96 h-auto'}/>
                ) : (
                    <div className='w-96 h-auto'>
                        <PreviewImagePlaceholder/>
                    </div>
                )}
                {props.exercise.videoUrl && (
                    <span
                        className='w-16 h-16 text-5xl absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 text-white inline-flex justify-center items-center rounded-full bg-neutral-800/75'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="size-6">
                            <path fillRule="evenodd"
                                  d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                                  clipRule="evenodd"/>
                        </svg>
                    </span>
                )}
            </div>
            <form action={handleSave} onSubmit={() => setIsSaving(true)} className={'h-full'}>
                <div className='flex flex-col gap-2 p-2 h-full justify-between relative'>
                    <div className='mb-4'>
                        <div className='font-bold text-xl '>
                            {props.exercise.exerciseName}
                        </div>
                        <div className='inline-flex text-xs items-center'>
                            {props.exercise.measureCount} {props.exercise.measureUnit}
                        </div>
                    </div>
                    <input type={'hidden'} name={'id'} value={props.exercise.id}/>
                    <textarea
                        name={'note'}
                        className='resize-none p-2 bg-neutral-300 dark:bg-neutral-900 dark:text-neutral-300 text-neutral-600 focus:outline-none rounded-b-lg'
                        value={note}
                        onChange={handleChange}
                        placeholder='Your notes'
                        rows={5}
                    />
                    <button type='submit' aria-label='Update note of exercise'
                            aria-disabled={isSaving || !saveIndicatorIsEnabled}
                            disabled={isSaving || !saveIndicatorIsEnabled}
                            className={`w-full flex items-center justify-center bg-neutral-300 dark:bg-neutral-900 dark:text-neutral-300 text-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300`}>
                        {isSaving ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="size-8 inline p-2 animate-spin">
                                <path fillRule="evenodd"
                                      d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                                      clipRule="evenodd"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="size-8 inline p-2">
                                <path fillRule="evenodd"
                                      d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                                      clipRule="evenodd"/>
                            </svg>
                        )}
                        Save
                    </button>
                </div>
            </form>
            {
                display && hasVideo && (
                    <div
                        className='fixed left-0 top-0 right-0 bottom-0 z-50 bg-black flex flex-col items-center justify-center'>
                        <button className='font-bold mb-6 text-xl' onClick={() => setDisplay(!display)}>✖︎ close</button>
                        <VideoPlayer videoUrl={props.exercise.videoUrl!}/>
                    </div>
                )}
        </div>);
}