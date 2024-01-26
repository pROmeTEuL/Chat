<<<<<<< HEAD
import * as React from "react"

import { cn } from "~/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
=======
import * as React from "react";

import { cn } from "~/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  key?: string;
}
>>>>>>> heart

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
<<<<<<< HEAD
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
=======
          "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
>>>>>>> heart
        )}
        ref={ref}
        {...props}
      />
<<<<<<< HEAD
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
=======
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
>>>>>>> heart
