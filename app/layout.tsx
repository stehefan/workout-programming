import type {Metadata} from "next";
import "./globals.css";


export const metadata: Metadata = {
    title: "Hardly Working Out",
    description: "Manage your workouts",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className={'antialiased'}>
        {children}
        </body>
        </html>
    );
}
