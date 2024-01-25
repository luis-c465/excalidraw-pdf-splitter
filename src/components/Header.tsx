import { cn } from "@/lib/utils";
import logo from "/logo.png";

type BaseHeaderProps = {
  big?: boolean;
  children?: React.JSX.Element | React.JSX.Element[];
};

export default function Header({ big = true, children }: BaseHeaderProps) {
  return (
    <header className="flex gap-2">
      <img
        className={cn(big ? "text-9xl" : "text-6xl", "h-[1em]")}
        src={logo}
      />
      <h1
        className={cn(
          "inline-block bg-gradient-to-r from-indigo-400 to-red-400 bg-clip-text text-transparent font-nexa",
          big ? "text-9xl" : "text-6xl"
        )}
      >
        ExcaliDraw to PDF
      </h1>

      <div className="flex flex-row gap-5 items-center">{children}</div>
    </header>
  );
}
