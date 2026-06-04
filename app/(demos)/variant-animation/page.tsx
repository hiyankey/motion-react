"use client";

import { motion } from "motion/react";
import { useCallback, useState } from "react";
import { Avatar } from "@/app/ui/avatar/avatar";
import { ChevronLeftIcon } from "@/app/ui/icons/chevron-left";
import { ChevronRightIcon } from "@/app/ui/icons/chevron-right";

const quotes = [
  {
    author: "Rauno Freiberg",
    quote: "The best work is done slowly.",
  },
  {
    author: "John Doe 9",
    quote: "You just have to do it tired, annoyed, begrudgingly etc.",
  },
  {
    author: "Thomas Wilkinson",
    quote: "It never gets easier, you just go faster.",
  },
  {
    author: "Robert Demure 3",
    quote: "There's nothing better than building your own work.",
  },
];
export default function Page() {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const lastQuoteIndex = quotes.length - 1;

  const previous = useCallback(() => {
    setActiveQuoteIndex((currentQuoteIndex) =>
      currentQuoteIndex === 0 ? lastQuoteIndex : currentQuoteIndex - 1
    );
  }, [lastQuoteIndex]);

  const next = useCallback(() => {
    setActiveQuoteIndex((currentQuoteIndex) =>
      currentQuoteIndex === lastQuoteIndex ? 0 : currentQuoteIndex + 1
    );
  }, [lastQuoteIndex]);

  return (
    <div className="min-h-dvh flex-center">
      <div className="aspect-2/1 w-240 flex-center rounded-24 bg-demo-bg">
        <motion.div
          animate={`quote_${activeQuoteIndex}`}
          className="relative h-50 w-90 overflow-clip rounded-12 bg-white p-3 shadow-menu dark:bg-gray-2"
          initial="inactive"
          whileHover={["hovered", `quote_${activeQuoteIndex}_highlighted`]}
        >
          <div className="mb-3 flex h-1/3 items-center justify-center -space-x-3">
            {Array.from(quotes, ({ author }, index) => (
              <motion.div
                key={author}
                variants={{
                  [`quote_${index}`]: {
                    scale: 1,
                    zIndex: 10,
                  },
                  [`quote_${index}_highlighted`]: {
                    scale: 1.06,
                    filter: "grayscale(0)",
                  },
                  hovered: {
                    filter: "grayscale(1)",
                    scale: 0.96,
                  },
                }}
              >
                <Avatar.Fallback>{author}</Avatar.Fallback>
              </motion.div>
            ))}
          </div>
          <blockquote className="grid-stack h-2/3 items-start">
            {Array.from(quotes, ({ quote, author }, index) => (
              <motion.p
                className="text-center text-18"
                key={author}
                variants={{
                  [`quote_${index}`]: {
                    opacity: 1,
                    y: 0,
                  },
                  inactive: {
                    opacity: 0,
                    y: 20,
                  },
                }}
              >
                {quote}
              </motion.p>
            ))}
          </blockquote>
          <cite className="translate-center-x grid-stack absolute bottom-4">
            {Array.from(quotes, ({ author }, index) => (
              <motion.span
                className="block text-center font-serif text-14 text-gray-11"
                key={author}
                variants={{
                  [`quote_${index}`]: {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                  },
                  inactive: {
                    opacity: 0,
                    scale: 0.5,
                    filter: "blur(10px)",
                  },
                }}
              >
                {author}
              </motion.span>
            ))}
          </cite>

          <div>
            <motion.button
              className="translate-center-y absolute left-2 size-7 flex-center rounded-full bg-gray-a3 backdrop-blur-[10px]"
              onClick={previous}
              type="button"
              variants={{
                hovered: {
                  x: 0,
                  opacity: 1,
                },
                inactive: {
                  x: -20,
                  opacity: 0,
                },
              }}
            >
              <ChevronLeftIcon />
            </motion.button>
            <motion.button
              className="translate-center-y absolute right-2 size-7 flex-center rounded-full bg-gray-a3 backdrop-blur-[10px]"
              onClick={next}
              type="button"
              variants={{
                hovered: {
                  x: 0,
                  opacity: 1,
                },
                inactive: {
                  x: 20,
                  opacity: 0,
                },
              }}
            >
              <ChevronRightIcon />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
