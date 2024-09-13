import { cn } from "../lib/utils";

export default function Button({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        buttonClassName ,
        className,
      )}
      {...props}
    />
  );
}

export const buttonClassName =
  "flex items-center justify-center gap-2 rounded-xl bg-cyan-500 p-2 text-white";
