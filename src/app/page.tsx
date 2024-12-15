'use server';

import {ExclamationCircleIcon} from "@heroicons/react/24/solid";
import {Prisma, PrismaClient} from "@prisma/client";
import {ExerciseProgram} from "@/types/Exercise";
import WorkoutPreview from "@/components/ui/WorkoutPreview/WorkoutPreview";
import {AppUser, getUserForClerkUserId, mapToDomainWorkout} from "@/app/utils";
import {currentUser} from "@clerk/nextjs/server";

const prisma = new PrismaClient();


async function getProgramWithRelations() {

    const clerkUser = (await currentUser())!;
    const appUser: AppUser = await getUserForClerkUserId(clerkUser.id);

    if (!appUser) {
        throw new Error("You need to be logged in and have a clerk user assigned to you")
    }

    return prisma.program
        .findFirst({
            include: {
                workouts: {
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
                    }
                }
            },
            where: {
                userId: appUser.id
            },
            orderBy: {
                id: 'asc'
            }
        });
}

type ProgramWithRelations = Prisma.PromiseReturnType<typeof getProgramWithRelations>

export default async function Home() {

    const programWithRelations: ProgramWithRelations = await getProgramWithRelations();

    const program: ExerciseProgram | null = programWithRelations ? {
        id: programWithRelations!.id,
        name: programWithRelations!.name,
        workouts: programWithRelations!.workouts.map(workout => {
            return mapToDomainWorkout(workout);
        })
    } : null


    if (!program) {
        return (
            <div className={'h-full flex justify-center gap-2 pt-10 pb-10'}>
                <ExclamationCircleIcon className='h-12 fill-red-200'/>
                <span className='text-red-200 text-5xl font-bold'>No program found</span>
            </div>
        )
    }

    return (
        <div className={'max-h-full flex flex-col justify-start p-4'}>
            <span className='text-4xl w-full pb-4'>{program.name}</span>
            <div className='grid grid-cols-2 max-md:grid-cols-1 gap-4'>
                {program.workouts && program.workouts.map(workout => (
                    <WorkoutPreview workout={workout} key={workout.id}/>
                ))}
            </div>
        </div>
    )
}