import type {Metadata} from "next";
import "./globals.css";
import {ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import Link from "next/link";
import {dark} from "@clerk/themes";

export const metadata: Metadata = {
    title: "Hardly Working Out",
    description: "Manage your workouts",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <ClerkProvider
            appearance={{
                baseTheme: [dark],
            }}>
            <html lang="en">
            <body className='flex flex-col items-center h-dvh'>
            <nav className='flex w-full justify-center dark:bg-neutral-800 bg-neutral-200'>
                <div className='flex justify-between content-center max-w-screen-lg w-full p-4'>
                    <Link href='/' className='text-lg font-bold text-amber-500'>Hardly Working Out</Link>
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton/>
                    </SignedOut>
                </div>
            </nav>
            <main className='w-full max-w-screen-lg p-4 h-full'>
                {children}
            </main>
            </body>
            </html>
        </ClerkProvider>
    );
}
