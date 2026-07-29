import { LoaderIcon } from "lucide-react";

interface FullscreenLoaderProps {
  label?: string;
};

/**
 * Full-viewport centered loading spinner with an optional descriptive label.
 * Used during async boundaries (e.g. auth, Liveblocks room setup) to block UI.
 */
export const FullscreenLoader = ({ label }: FullscreenLoaderProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2">
      <LoaderIcon className="size-6 text-muted-foreground animate-spin" />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  );
};
