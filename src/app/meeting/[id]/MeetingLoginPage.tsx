import Button, { buttonClassName } from "@/src/components/Button";
import { cn } from "@/src/lib/utils";
import { SignInButton } from "@clerk/nextjs";
import  Link  from "next/link";

export default function MeetingLoginPage() {
  return (
    <div className="mx-auto w-fit space-y-3">
      <h1 className="text-center text-2xl font-bold ">Join Meeting</h1>
      <SignInButton>
        <Button className="w-44">Sign In</Button>
      </SignInButton>
      <Link
        href="?guest=true"
        className={cn(buttonClassName, "w-44  bg-gray-500")}
      >
        Continue as guest
      </Link>
    </div>
  );
}
