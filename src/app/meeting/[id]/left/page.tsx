import { buttonClassName } from "@/src/components/Button";
import  Link  from "next/link";

interface PageProps {
  params: { id: string };
}

export default function Page({ params: { id } }: PageProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-semibold"> You left this meeting</p>

      <Link href={`/meeting/${id}`} className={buttonClassName}>
        Rejoin
      </Link>
    </div>
  );
}
