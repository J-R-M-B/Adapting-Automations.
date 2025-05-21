"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SparklesCore } from "./sparkles";

export function SolutionsBanner() {
  return (
    <div className="h-[40vh] md:h-[50vh] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Particles background */}
      <div className="w-full absolute inset-0 h-full">
        <SparklesCore
          id="solutionsSparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={70}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={0.8}
        />
      </div>
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center justify-center relative z-20 px-4"
      >
        <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-white to-purple-200 text-center text-5xl md:text-7xl font-bold tracking-tight flex items-center gap-3">
          Our Solutions <Sparkles className="w-8 h-8 text-purple-400" />
        </h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-6 mb-6 flex justify-center"
        >
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center text-xl text-gray-300 max-w-3xl"
        >
          Explore our range of AI-powered automation solutions designed to transform your business operations
        </motion.p>
      </motion.div>
      
      {/* Gradients */}
      <div className="absolute inset-x-20 bottom-1/4 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-[2px] w-3/4 blur-sm" />
      <div className="absolute inset-x-20 bottom-1/4 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-px w-3/4" />
      <div className="absolute inset-x-60 bottom-1/4 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-[5px] w-1/4 blur-sm" />
      <div className="absolute inset-x-60 bottom-1/4 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px w-1/4" />
      
      {/* Radial Gradient to prevent sharp edges */}
      <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(600px_400px_at_center,transparent_20%,black)]"></div>
    </div>
  );
}