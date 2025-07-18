import React, { useState } from 'react';
import { Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TravelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const TravelButton = React.forwardRef<HTMLButtonElement, TravelButtonProps>(
  ({ children, className, onMouseEnter, ...props }, ref) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isAnimating) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 800);
      }
      onMouseEnter?.(e);
    };

    return (
      <Button
        ref={ref}
        onMouseEnter={handleMouseEnter}
        className={cn(
          // Base styles
          "relative overflow-hidden px-8 py-6 text-lg font-semibold rounded-2xl",
          // Gradient background
          "bg-gradient-to-r from-primary to-accent",
          "hover:from-primary/90 hover:to-accent/90",
          // Shadow effects
          "shadow-lg hover:shadow-xl",
          // Hover transformations
          "transition-all duration-300 hover:scale-[1.02]",
          // Text color
          "text-primary-foreground",
          // Shimmer effect
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
          "before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
          // Glow effect
          "hover:shadow-primary/25",
          className
        )}
        {...props}
      >
        {/* Static plane icon */}
        <Plane 
          className={cn(
            "h-5 w-5 mr-2 transition-opacity duration-200", 
            isAnimating && "opacity-0"
          )} 
        />
        
        {/* Flying plane animation */}
        <Plane 
          className={cn(
            "absolute h-5 w-5 text-primary-foreground pointer-events-none z-10",
            isAnimating ? "animate-plane-fly" : "opacity-0"
          )}
        />
        
        {/* Button text */}
        <span className="relative z-10">{children}</span>
        
        {/* Backdrop glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10" />
      </Button>
    );
  }
);

TravelButton.displayName = 'TravelButton';

export { TravelButton };