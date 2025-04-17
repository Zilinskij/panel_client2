import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";

interface Props {
  start?: number;
  duration?: number;
  end?: number;
}

export default function ProgressBar({
  start = 10,
  duration = 200,
  end = 90,
}: Props) {
  const [progress, setProgress] = useState(start);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(end), duration);
    return () => clearTimeout(timer);
  }, [end, duration]);

  return <Progress value={progress} className="w-[40%] mx-auto mt-4" />;
}
