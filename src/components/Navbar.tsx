// _app.js or _app.tsx
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import "tailwindcss/tailwind.css";

export default function Navbar() {
  return (
    <header className="shadow">
      <div className=" mx-auto flex h-20 max-w-5xl items-center justify-between p-3 font-normal">
        <Link href="/">New Meeting</Link>
        <SignedIn>
          <div className="flex items-center gap-5">
            <Link href="/meetings">Meetings</Link>
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <SignedIn />
        </SignedOut>
      </div>
    </header>
  );
}
