"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Avatar } from "@/app/ui/avatar/avatar";

export default function Page() {
  const targetRef = useRef(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.05], [0.8, 1]);
  const xRow1 = useTransform(scrollYProgress, [0.15, 0.83], [0, -300]);
  const xRow2 = useTransform(scrollYProgress, [0.15, 0.83], [0, 300]);
  const xRow3 = useTransform(scrollYProgress, [0.15, 0.83], [0, -400]);
  const opacity = useTransform(scrollYProgress, [0.66, 0.72], [1, 0]);

  return (
    <div className="min-h-dvh flex-center">
      <div
        className="relative aspect-2/1 w-240 overflow-clip overflow-y-auto rounded-24 bg-demo-bg"
        ref={containerRef}
      >
        <div className="h-screen" />
        <div className="h-[200vh]" ref={targetRef}>
          <div className="sticky top-1/2 -translate-y-1/2">
            <motion.ul
              className="flex items-center gap-4"
              ref={targetRef}
              style={{ opacity, scale, x: xRow1 }}
            >
              {Array.from(
                [
                  "Rauno Freiberg",
                  "John Doe 9",
                  "Thomas Wilkinson",
                  "Robert Demure 3",
                ],
                (name) => (
                  <li className="flex items-center gap-2" key={name}>
                    <Avatar.Fallback>{name}</Avatar.Fallback>
                    <p className="text-nowrap text-40">{name}</p>
                  </li>
                )
              )}
            </motion.ul>
            <motion.ul
              className="flex items-center gap-4"
              style={{ opacity, scale, x: xRow2 }}
            >
              {Array.from(
                [
                  "Rauno Freiberg",
                  "John Doe 9",
                  "Thomas Wilkinson",
                  "Robert Demure 3",
                ],
                (name) => (
                  <li className="flex items-center gap-2" key={name}>
                    <Avatar.Fallback>{name}</Avatar.Fallback>
                    <p className="text-nowrap text-40">{name}</p>
                  </li>
                )
              )}
            </motion.ul>
            <motion.ul
              className="flex items-center gap-4"
              ref={targetRef}
              style={{ opacity, scale, x: xRow3 }}
            >
              {Array.from(
                [
                  "Rauno Freiberg",
                  "John Doe 9",
                  "Thomas Wilkinson",
                  "Robert Demure 3",
                ],
                (name) => (
                  <li className="flex items-center gap-2" key={name}>
                    <Avatar.Fallback>{name}</Avatar.Fallback>
                    <p className="text-nowrap text-40">{name}</p>
                  </li>
                )
              )}
            </motion.ul>
          </div>
        </div>
        <div className="h-screen" />
      </div>
    </div>
  );
}
