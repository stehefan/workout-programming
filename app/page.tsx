import Exercise from "./components/Exercise/Exercise";
import exercisesData from '../data/exercises.json';
import {ExerciseProgram} from "@/types/Exercise";

export default function Home() {
    const exercises: ExerciseProgram = exercisesData;

    return (
        <div className='p-6'>
            {exercises.map((workout, index) => (
                <section key={index} className='pt-4 first:pt-0'>
                    <h2>{workout.name}</h2>
                    {workout.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex}>
                            <h3 className='pt-4'>{section.name}</h3>
                            <div className='text-base font-thin pb-2'>
                                {section.roundCount} Round{section.roundCount > 1 ? 's' : '' }
                            </div>
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
