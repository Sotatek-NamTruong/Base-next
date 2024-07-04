import { clsx } from "clsx";

export default function ContainerProvider({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div className={clsx(`app-container flex-1 ${className}`)}>
      <div className="app-content">
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
}
