import {notFound} from "next/navigation";
import {auth} from "@clerk/nextjs/server";
import {AppUser, getUserForClerkUserId} from "@/app/utils";
import ExerciseEditForm from "@/components/ui/ExerciseEditForm/ExerciseEditForm";
import {ExerciseEntry} from "@/types/Exercise";
import {PrismaClient} from "@prisma/client";

type ExercisePageParams = Promise<{ exerciseId: string }>;
const prisma = new PrismaClient();

export default async function ExercisePage({params}: { params: ExercisePageParams }) {
    const {exerciseId} = await params;

    if (Number.isNaN(exerciseId)) {
        return notFound();
    }

    const {userId} = await auth();
    const appUser: AppUser | undefined = await getUserForClerkUserId(userId!);

    if (!appUser) {
        throw new Error('You need to be logged in and have a clerk user assigned to you');
    }

    const workout = await prisma.exercise.findFirst({
        where: {
            id: Number.parseInt(exerciseId),
            userId: appUser.id,
        }
    });

    if (!workout) {
        return notFound()
    }

    return (
        <div className='flex items-center max-w-3xl min-w-2xl'>
            <ExerciseEditForm workout={workout as ExerciseEntry}/>
        </div>
    )
}