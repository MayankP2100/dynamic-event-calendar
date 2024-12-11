import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface TooltipButtonProps {
  buttonName: string;
  tooltipTitle: string;
  className?: string;
}

export function TooltipButton({
  buttonName,
  tooltipTitle,
  className,
}: TooltipButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="default" className={cn("p-3", className)}>
            {buttonName}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipTitle}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
