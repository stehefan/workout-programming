import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { AppUser, getUserForClerkUserId, mapToDomainExercise } from "@/app/utils";
import ExerciseEditForm from "@/components/ui/ExerciseEditForm/ExerciseEditForm";
import { ExerciseEntry } from "@/types/Exercise";
import prisma from "@/lib/prisma";

type PageParams = Promise<{ exerciseId: string }>;

export default async function Page({ params }: { params: PageParams }) {
    const { exerciseId } = await params;

    if (Number.isNaN(Number.parseInt(exerciseId))) {
        return notFound();
    }

    const { userId } = await auth();
    if (!userId) {
        throw new Error('You must be signed in to view this page');
    }
    const appUser: AppUser | undefined = await getUserForClerkUserId(userId);

    if (!appUser) {
        throw new Error('You need to be logged in and have a clerk user assigned to you');
    }

    const exercise = await prisma.exercise.findFirst({
        where: {
            id: Number.parseInt(exerciseId),
            userId: appUser.id,
        },
        include: {
            image: true
        }
    });

    if (!exercise) {
        return notFound()
    }

    return (
        <div className='flex items-center max-w-3xl min-w-2xl'>
            <ExerciseEditForm workout={mapToDomainExercise(exercise)} />
        </div>
    )
}