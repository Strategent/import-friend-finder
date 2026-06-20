"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(10, 10, 14)",
  gradientBackgroundEnd = "rgb(18, 16, 26)",
  firstColor = "120, 110, 150",
  secondColor = "90, 80, 120",
  thirdColor = "140, 130, 170",
  fourthColor = "70, 65, 95",
  fifthColor = "110, 100, 140",
  pointerColor = "150, 130, 200",
  size = "80%",
  blendingValue = "soft-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  const interactiveRef = useRef<HTMLDivElement | null>(null);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) return;
      setCurX((c) => c + (tgX - c) / 20);
      setCurY((c) => c + (tgY - c) / 20);
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    }
    move();
  }, [tgX, tgY, curX, curY]);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  const styleVars = {
    ["--gradient-background-start" as any]: gradientBackgroundStart,
    ["--gradient-background-end" as any]: gradientBackgroundEnd,
    ["--first-color" as any]: firstColor,
    ["--second-color" as any]: secondColor,
    ["--third-color" as any]: thirdColor,
    ["--fourth-color" as any]: fourthColor,
    ["--fifth-color" as any]: fifthColor,
    ["--pointer-color" as any]: pointerColor,
    ["--size" as any]: size,
    ["--blending-value" as any]: blendingValue,
  } as React.CSSProperties;

  return (
    <div
      style={styleVars}
      className={cn(
        "relative overflow-hidden top-0 left-0 w-full h-full",
        "[background:linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName,
      )}
    >
      <style>{`
        @keyframes bga-first { 0%,100% { transform: translate(calc(50% - 50%), calc(50% - 50%)); } 50% { transform: translate(calc(50% - 50% + 200px), calc(50% - 50% - 200px)); } }
        @keyframes bga-second { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes bga-third { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes bga-fourth { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-200px, 200px); } }
        @keyframes bga-fifth { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .bga-anim-first { animation: bga-first 30s ease infinite; }
        .bga-anim-second { animation: bga-second 20s reverse infinite; }
        .bga-anim-third { animation: bga-third 40s linear infinite; }
        .bga-anim-fourth { animation: bga-fourth 40s ease infinite; }
        .bga-anim-fifth { animation: bga-fifth 20s ease infinite; }
      `}</style>
      <svg className="hidden">
        <defs>
          <filter id="bga-blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn("", className)}>{children}</div>
      <div
        className={cn(
          "gradients-container h-full w-full blur-lg",
          isSafari ? "blur-2xl" : "[filter:url(#bga-blurMe)_blur(40px)]",
        )}
      >
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_0.8)_0,_rgba(var(--first-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
            "[transform-origin:center_center] bga-anim-first opacity-100",
          )}
        />
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
            "[transform-origin:calc(50%-400px)] bga-anim-second opacity-100",
          )}
        />
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
            "[transform-origin:calc(50%+400px)] bga-anim-third opacity-100",
          )}
        />
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
            "[transform-origin:calc(50%-200px)] bga-anim-fourth opacity-70",
          )}
        />
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)] w-[calc(var(--size)*2)] h-[calc(var(--size)*2)] top-[calc(50%-var(--size))] left-[calc(50%-var(--size))]",
            "[transform-origin:calc(50%-800px)_calc(50%+800px)] bga-anim-fifth opacity-100",
          )}
        />
        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className={cn(
              "absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]",
              "[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2 opacity-70",
            )}
          />
        )}
      </div>
    </div>
  );
};