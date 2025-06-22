import { notFound } from "next/navigation";
import Exercise from "@/components/ui/Exercise/Exercise";
import { AppUser, getUserForClerkUserId, mapToDomainExercise, sortByIdASC } from "@/app/utils";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

type Params = Promise<{ workoutId: string }>;

export default async function Page({ params }: { params: Params }) {
    const { workoutId } = await params;

    if (Number.isNaN(workoutId)) {
        return notFound();
    }

    const { userId } = await auth();
    if (!userId) {
        throw new Error('You must be signed in to update notes');
    }

    const appUser: AppUser | undefined = await getUserForClerkUserId(userId);
    if (!appUser) {
        throw new Error('You need to be logged in and have a clerk user assigned to you');
    }

    const workout = await prisma.workout.findFirst({
        include: {
            sections: {
                include: {
                    exercises: {
                        include: {
                            image: true
                        }
                    }
                }
            }
        },
        orderBy: {
            id: 'asc'
        },
        where: {
            id: Number.parseInt(workoutId),
            userId: appUser.id,
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
                    <div className='grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] justify-items-center gap-4'>
                        {section.exercises.sort(sortByIdASC).map(exercise => (
                            <Exercise key={exercise.id} exercise={mapToDomainExercise(exercise)} />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    )
}