import {PrismaClient} from "@prisma/client";
import {notFound} from "next/navigation";
import Exercise from "@/app/components/Exercise/Exercise";
import {mapToDomainExercise, sortByIdASC} from "@/app/utils";

const prisma = new PrismaClient()

export default async function Page({params}: { params: { workoutId: string } }) {
    if (Number.isNaN(params.workoutId)) {
        return notFound()

    }

    const workout = await prisma.workout.findFirst({
        include: {
            sections: {
                include: {
                    exercises: true
                }
            }
        },
        orderBy: {
            id: 'asc'
        },
        where: {
            id: Number.parseInt(params.workoutId)
        }
    });

    if (!workout) {
        return notFound()
    }

    return (
        <section>
            <span className='text-4xl'>{workout.name}</span>
            {workout.sections.sort(sortByIdASC).map((section, sectionIndex) => (
                <div key={sectionIndex}>
                    <h3 className='pt-4'>{section.name}</h3>
                    <div className='text-base font-thin pb-2'>
                        {section.roundCount} Round{section.roundCount > 1 ? 's' : ''}
                    </div>
                    <div className='flex flex-wrap gap-4'>
                        {section.exercises.sort(sortByIdASC).map(exercise => (
                            <Exercise key={exercise.id} exercise={mapToDomainExercise(exercise)}/>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    )
}