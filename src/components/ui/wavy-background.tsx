"use client";
import { cn } from "../../lib/utils";
import React, { useEffect, useRef, useState } from "react";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        "h-screen flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      {/* Black background with purple radial gradient */}
      <div 
        className="absolute inset-0 z-0 w-full h-full bg-black"
        style={{
          background: "radial-gradient(circle at center, rgba(147, 51, 234, 0.3) 0%, rgba(0, 0, 0, 1) 70%)"
        }}
      ></div>
      
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};