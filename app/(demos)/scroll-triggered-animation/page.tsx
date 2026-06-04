"use client";

import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useSound } from "@/app/hooks/use-sound";

export default function Page() {
  const targetRef = useRef(null);
  const containerRef = useRef(null);
  const inView = useInView(targetRef, { amount: 0.9, root: containerRef });
  const play = useSound("/sfx/shutter.mp3");

  // biome-ignore lint/correctness/useExhaustiveDependencies: shh!
  useEffect(() => {
    if (!inView) {
      return;
    }
    play();
  }, [inView]);
  return (
    <div className="min-h-dvh flex-center">
      <div
        className="relative aspect-2/1 w-240 overflow-y-auto rounded-24 bg-demo-bg"
        ref={containerRef}
      >
        <div className="h-screen" />
        <motion.div
          animate={inView ? "visible" : "hidden"}
          className="translate-center-x relative aspect-12/9 w-60 border-4 border-white shadow-border-small"
          initial="hidden"
          ref={targetRef}
          variants={{
            visible: {
              rotate: [2, -2, 1, 0],
              scale: 1,
              transition: { duration: 0.3 },
            },
            hidden: {
              rotate: 0,
              scale: 0.96,
            },
          }}
        >
          <Image
            alt="Mountain"
            className="h-full w-full object-cover"
            fill
            src={"/imgs/1.jpg"}
          />
        </motion.div>
        <div className="h-screen" />
      </div>
    </div>
  );
}
