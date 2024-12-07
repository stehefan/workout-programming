import {ExerciseEntry} from "@/types/Exercise";

export type ExerciseEditFormProps = {
    workout: ExerciseEntry
}

export default function ExerciseEditForm({workout}: ExerciseEditFormProps) {
    // TODO: use type to get value for measureUnit
    return (
        <form>
            <div className='grid grid-cols-2 '>
                <label htmlFor="name">Exercise</label>
                <input className="text-black" type="text" name="name" value={workout.exerciseName}/>
                <label htmlFor="measureUnit">Measure Unit</label>
                <select className="text-black" name="measureUnit" id="measureUnit">
                    <option>reps</option>
                    <option>seconds</option>
                </select>
                <label htmlFor="measureCount">Count</label>
                <input className="text-black" type="text" name="measureCount" value={workout.measureCount}/>
                <label htmlFor="videoUrl">videoUrl</label>
                <input className="text-black" type="text" name="videoUrl" value={workout.videoUrl || ''}/>
                <label htmlFor="previewImageUrl">previewImageUrl</label>
                <input className="text-black" type="text" name="previewImageUrl" value={workout.previewImageUrl || ''}/>
            </div>
        </form>
    )
};