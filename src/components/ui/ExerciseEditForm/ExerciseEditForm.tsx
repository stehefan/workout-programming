import {ExerciseEntry, MeasureUnits} from "@/types/Exercise";

export type ExerciseEditFormProps = {
    workout: ExerciseEntry
}

export default function ExerciseEditForm({workout}: ExerciseEditFormProps) {
    return (
        <form className='w-full'>
            <div className='grid grid-cols-3 gap-2 w-full content-center items-center'>
                <label className='text-lg mr-5' htmlFor="name">Exercise Name:</label>
                <input type="text" className='col-span-2' name="name" value={workout.exerciseName}/>
                <label className='text-lg mr-5' htmlFor="measureUnit">Unit of Measurement:</label>
                <div className='inline-flex gap-5 col-span-2'>
                    {Object.keys(MeasureUnits).map((unit) => (
                        <span className='inline-flex flex-row justify-center items-center'>
                            <input name='measureUnit' id={`measure-${unit}`} type='radio' checked={unit === workout.measureUnit}/>
                            <label className='ml-2 leading-none' htmlFor={`measure-${unit}`}>{unit}</label>
                        </span>
                    ))}
                </div>
                <label className='text-lg mr-5' htmlFor="measureCount">Number of 'Units':</label>
                <input type="text" className='col-span-2' name="measureCount" value={workout.measureCount}/>
                <label className='text-lg mr-5' htmlFor="videoUrl">URL to the YouTube Video:</label>
                <input type="text" className='col-span-2' name="videoUrl" value={workout.videoUrl || ''}/>
                <label className='text-lg mr-5' htmlFor="previewImageUrl">URL to the Preview-Image:</label>
                <input type="text" className='col-span-2' name="previewImageUrl" value={workout.previewImageUrl || ''}/>
                <button className='bg-green-800 col-span-2'>Save</button>
                <button className='opacity-50'>Discard</button>
            </div>
        </form>
    )
};