import { auth } from "@clerk/nextjs/server";
import { ActionError, ActionErrorType } from "@/types/Error";
import { AppUser, getUserForClerkUserId } from "@/app/utils";

export async function handleAuthentication(): Promise<AppUser> {
    const { userId } = await auth();
    if (!userId) {
        throw new ActionError(ActionErrorType.AuthenticationError, 'You must be signed in to update notes');
    }

    const appUser: AppUser | undefined = await getUserForClerkUserId(userId);
    if (!appUser) {
        throw new ActionError(ActionErrorType.AuthenticationError, 'You need to be logged in and have a clerk user assigned to you');
    }

    return appUser;
}
