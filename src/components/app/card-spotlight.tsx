"use client";
import { useMotionValue, motion, useMotionTemplate, useReducedMotion } from "motion/react";
import React, { type MouseEvent as ReactMouseEvent, useState } from "react";
import { cn } from "@/lib/utils";

// Aceternity UI — CardSpotlight (simplified, no canvas)
export const CardSpotlight = ({
  children,
  radius = 350,
  color = "color-mix(in oklab, var(--primary) 16%, transparent)",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightBackground = useMotionTemplate`
    radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 80%)
  `;

  function handleMouseMove({ currentTarget, clientX, clientY }: ReactMouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={cn(
        "group/spotlight relative rounded-lg border border-border bg-card p-5",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 rounded-lg opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
          style={{ background: spotlightBackground }}
        />
      )}
      {isHovering && null}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
