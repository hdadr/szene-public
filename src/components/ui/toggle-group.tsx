import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import * as React from "react";

import { toggleVariants } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  size: "default",
  variant: "default",
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root ref={ref} className={cn("flex items-center justify-center gap-1", className)} {...props}>
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);
  const classes = `text-xs rounded-2xl border hover:data-[state=off]:text-muted-foreground hover:data-[state=off]:bg-transparent
                  data-[state=off]:text-muted-foreground data-[state=on]:shadow-sm data-[state=on]:bg-purple-50 
`;
  return (
    <motion.div whileTap={{ scale: 0.9 }} initial={{ scale: 1 }}>
      <ToggleGroupPrimitive.Item
        ref={ref}
        className={cn(
          toggleVariants({
            variant: context.variant || variant,
            size: context.size || size,
          }),
          className,
          classes
        )}
        {...props}>
        {children}
      </ToggleGroupPrimitive.Item>
    </motion.div>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
