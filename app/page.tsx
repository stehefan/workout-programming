import Exercise from "./components/Exercise/Exercise";
import {Prisma, PrismaClient} from "@prisma/client";
import {ExerciseEntry} from "@/types/Exercise";
import ExerciseGetPayload = Prisma.ExerciseGetPayload;
import ExerciseDefaultArgs = Prisma.ExerciseDefaultArgs;

const prisma = new PrismaClient()

function mapToDomainExercise(exercise: ExerciseGetPayload<ExerciseDefaultArgs>): ExerciseEntry {
    return {
        id: exercise.id,
        exerciseName: exercise.exerciseName,
        measureUnit: exercise.measureUnit,
        measureCount: exercise.measureCount,
        previewImageUrl: exercise.previewImageUrl,
        note: exercise?.note ?? undefined,
        videoUrl: exercise.videoUrl
    };
}

export default async function Home() {
    const program = await prisma.program.findFirst({
        include: {
            workouts: {
                include: {
                    sections: {
                        include: {
                            exercises: true
                        }
                    }
                }
            }
        }
    });

    return (
        <div className='p-6'>
            {program && program.workouts.map((workout, index) => (
                <section key={index} className='pt-4 first:pt-0'>
                    <h2>{workout.name}</h2>
                    {workout.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex}>
                            <h3 className='pt-4'>{section.name}</h3>
                            <div className='text-base font-thin pb-2'>
                                {section.roundCount} Round{section.roundCount > 1 ? 's' : '' }
                            </div>
                            <div className='flex flex-wrap gap-4'>
                                {section.exercises.map(exercise => (
                                    <Exercise key={exercise.id} exercise={mapToDomainExercise(exercise)}/>
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
