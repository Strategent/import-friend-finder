"use client";
import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React, { type MouseEvent as ReactMouseEvent, useState } from "react";
import { cn } from "@/lib/utils";

// Aceternity UI — CardSpotlight (simplified, no canvas)
export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#262626",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={cn(
        "group/spotlight relative rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-black/40",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 80%)
          `,
        }}
      />
      {isHovering && null}
      <div className="relative z-10">{children}</div>
    </div>
  );
};