import Exercise from "./components/Exercise/Exercise";
import exercisesData from '../data/exercises.json';
import {ExerciseProgram} from "@/types/Exercise";

export default function Home() {
    const exercises: ExerciseProgram = exercisesData;

    return (
        <div className='p-6'>
            {exercises.map((workout, index) => (
                <section key={index} className='mt-4'>
                    <h2 className='mt-4'>{workout.name}</h2>
                    {workout.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex}>
                            <h3 className='mt-4 mb-2'>{section.name}</h3>
                            <div className='flex flex-wrap gap-4'>
                                {section.exercises.map((exercise, exerciseIndex) => (
                                    <Exercise key={exerciseIndex} exercise={exercise}/>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            ))
            }
        </div>
    );
}
