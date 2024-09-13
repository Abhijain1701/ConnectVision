import { Metadata } from "next";
import MeetingPage from "./MeetingPage";
import { currentUser } from "@clerk/nextjs";
import MeetingLoginPage from "./MeetingLoginPage";

interface PageProps {
  params: { id: string };
  searchParams: { guest: string };
}
export function generateMetadata({ params: { id } }: PageProps): Metadata {
  return {
    title: `Meeting ${id}`,
  };
}

export default async function Page({
  params: { id },
  searchParams: { guest },
}: PageProps) {
  const user = await currentUser();

  const guestMode = guest === "true";

  if (!user && !guestMode) {
    <MeetingLoginPage />;
  }

  return <MeetingPage id={id} />;
}
