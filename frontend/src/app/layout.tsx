// // src/app/layout.tsx
import Link from "next/link";
import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <header className="bg-gray-100 p-4 flex space-x-4">
            <Link href="/events" className="text-blue-600 hover:underline">
              Events
            </Link>
            <Link href="/events/new" className="text-blue-600 hover:underline">
              New Event
            </Link>
          </header>
          <main className="p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
