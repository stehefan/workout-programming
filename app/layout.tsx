import {UserProvider} from '@auth0/nextjs-auth0/client';
import type {Metadata} from "next";
import "./globals.css";


export const metadata: Metadata = {
    title: "Hardly Working Out",
    description: "Manage your workouts",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <UserProvider>
            <body className={'antialiased'}>
            {children}
            </body>
        </UserProvider>
        </html>
    );
}
