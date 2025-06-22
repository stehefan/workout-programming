'use client';

import React, { useState } from "react";
import Image from "next/image";
import VideoPlayer from "@/components/ui/VideoPlayer/VideoPlayer";
import { ExerciseEntry } from "@/types/Exercise";
import PreviewImagePlaceholder from "@/components/ui/Exercise/PreviewImagePlaceholder";
import { ArrowPathIcon, CloudArrowDownIcon, PlayIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { updateNote } from "@/app/exercise/actions";

export type ExerciseProps = {
    exercise: ExerciseEntry;
}

export default function Exercise({ exercise }: ExerciseProps) {
    const [displayVideoPlayer, setDisplayVideoPlayer] = useState(false);
    const [note, setNote] = useState(exercise.note);
    const [isSaving, setIsSaving] = useState(false)

    const saveIndicatorIsEnabled = note !== exercise.note;

    const handleSave = async (formData: FormData) => {
        try {
            await updateNote(formData)
                .then(() => {
                    setIsSaving(false);
                });
        } catch (e: unknown) {
            console.error(e)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(event.target.value);
    };
    const width: number = 382;
    const height: number = Math.floor(width / 16 * 9);

    const playVideoTitle = `Play video for ${exercise.exerciseName}`;

    return (
        <div
            className={'w-full max-w-96 flex flex-col rounded-lg border border-neutral-300 dark:border-neutral-600 relative'}>
            <Link
                href={`/exercise/${exercise.id}`}
                className='inline-flex items-center size-10 justify-center text-sm absolute z-10 right-0 top-0 m-2 bg-black/40 rounded-md cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground'>
                <span className='size-5'>
                    <PencilSquareIcon />
                </span>
                <span className="sr-only">Edit item</span>
            </Link>
            <div className='relative rounded-t-lg'>
                {exercise.image ? (
                    <Image
                        src={`https://wsrv.nl/?url=${exercise.image.imageUrl}&w=${width}&h=${height}&dpr=2`}
                        alt={'Woman holding dumbbell in white crew neck t-shirt'}
                        width={width}
                        height={height}
                        className={'rounded-t-lg object-cover'} />
                ) : (
                    <div className='w-full h-auto'>
                        <PreviewImagePlaceholder />
                    </div>
                )}
                {exercise.videoUrl && (
                    <button
                        title={playVideoTitle}
                        aria-label={playVideoTitle}
                        className='w-16 h-16 text-5xl cursor-pointer absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 text-white inline-flex justify-center items-center rounded-full! border-none! bg-neutral-800/75!'
                        onClick={() => setDisplayVideoPlayer(!displayVideoPlayer)}
                    >
                        <PlayIcon className='size-6' />
                    </button>
                )}
            </div>
            <div className='flex flex-col gap-2 p-2 h-full justify-between'>
                <div className='mb-4 w-full'>
                    <div className='font-bold text-xl '>
                        {exercise.exerciseName}
                    </div>
                    <div className='inline-flex text-xs items-center'>
                        {exercise.measureCount} {exercise.measureUnit}
                    </div>
                </div>
                <form action={handleSave} onSubmit={() => setIsSaving(true)} className='w-full'>
                    <input type={'hidden'} name={'id'} value={exercise.id} />
                    <textarea
                        name={'note'}
                        className='resize-none w-full p-2 bg-neutral-300 dark:bg-neutral-900 dark:text-neutral-300 text-neutral-600 focus:outline-hidden rounded-b-lg'
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
                            <ArrowPathIcon className='size-8 inline p-2 animate-spin' />
                        ) : (
                            <CloudArrowDownIcon className="size-8 inline p-2" />
                        )}
                        Save
                    </button>
                </form>
            </div>
            {
                displayVideoPlayer && exercise.videoUrl && (
                    <VideoPlayer
                        videoUrl={exercise.videoUrl}
                        closeFn={() => setDisplayVideoPlayer(false)}
                    />
                )}
        </div>);
}