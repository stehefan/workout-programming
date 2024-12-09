'use client';

import {ExerciseEntry, MeasureUnits} from "@/types/Exercise";
import {useActionState} from "react";
import {updateExerciseEntry} from "@/app/actions";
import {CancelButton} from "@/components/ui/CancelButton/CancelButton";
import {SaveButton} from "@/components/ui/SaveButton/SaveButton";

export type ExerciseEditFormProps = {
    workout: ExerciseEntry,
    cancelFn?: () => void,
}

export default function ExerciseEditForm({workout, cancelFn}: ExerciseEditFormProps) {
    const [state, update, actionIsPending] = useActionState<ExerciseEntry, FormData>(updateExerciseEntry, workout);
    const showCancelButton = cancelFn !== undefined;

    return (
        <div className={`w-full relative transition-opacity duration-300 ${actionIsPending && 'opacity-50'}`}>
            <form className='w-full h-full'>
                <fieldset disabled={actionIsPending}
                          className='grid grid-cols-3 gap-2 w-full content-center items-center'>
                    <input type="hidden" name="id" value={state.id}/>
                    <label className='text-lg mr-5' htmlFor="exerciseName">Exercise Name:</label>
                    <input type="text" className='col-span-2' name="exerciseName" defaultValue={state.exerciseName}/>
                    <label className='text-lg mr-5' htmlFor="measureUnit">Unit of Measurement:</label>
                    <div className='inline-flex gap-5 col-span-2'>
                        {Object.keys(MeasureUnits).map((unit) => (
                            <span key={`${unit}-radio`} className='inline-flex flex-row justify-center items-center'>
                            <input name='measureUnit' id={`measure-${unit}`} value={unit} type='radio'
                                   defaultChecked={unit === state.measureUnit}/>
                            <label className='ml-2 leading-none' htmlFor={`measure-${unit}`}>{unit}</label>
                        </span>
                        ))}
                    </div>
                    <label className='text-lg mr-5' htmlFor="measureCount">Number of 'Units':</label>
                    <input type="text" className='col-span-2' name="measureCount" defaultValue={state.measureCount}/>
                    <label className='text-lg mr-5' htmlFor="videoUrl">URL to the YouTube Video:</label>
                    <input type="text" className='col-span-2' name="videoUrl" defaultValue={state.videoUrl || ''}/>
                    <label className='text-lg mr-5' htmlFor="previewImageUrl">URL to the Preview-Image:</label>
                    <input type="text" className='col-span-2' name="previewImageUrl"
                           defaultValue={state.previewImageUrl || ''}/>
                    <SaveButton submitFn={update} isSaving={actionIsPending}
                                additionalClassNames={`${showCancelButton ? 'col-span-2' : 'col-start-2 col-span-1'}`}/>
                    {showCancelButton &&
                        <CancelButton cancelFn={cancelFn}/>
                    }
                </fieldset>
            </form>
        </div>
    )
};