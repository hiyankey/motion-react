"use client";
import { AnimatePresence, motion, stagger } from "motion/react";
import { useState } from "react";
import { Avatar } from "@/app/ui/avatar/avatar";
import { BellIcon } from "@/app/ui/icons/bell";

const notifications = [
  {
    author: "Rauno Freiberg",
    message: "Create something",
    createdAt: "1s",
  },
  {
    author: "John Doe 9",
    message: "Go on a walk",
    createdAt: "2m",
  },
  {
    author: "Thomas Wilkinson",
    message: "Make a playlist",
    createdAt: "1h",
  },
  {
    author: "Robert Demure 3",
    message: "Call a friend",
    createdAt: "4d",
  },
];
export default function Page() {
  const [showNotifications, setShowNotification] = useState(true);
  return (
    <div className="min-h-dvh flex-center">
      <div className="relative aspect-2/1 w-240 flex-center rounded-24 bg-demo-bg">
        <button
          className="translate-center-x absolute top-16 size-7 flex-center rounded-full bg-white shadow-border dark:bg-gray-3"
          onClick={() => setShowNotification((prev) => !prev)}
          type="button"
        >
          <BellIcon />
        </button>
        <AnimatePresence initial={false}>
          {showNotifications && (
            <motion.div
              animate={"open"}
              className="w-64 overflow-clip rounded-12 bg-white shadow-modal dark:bg-gray-2"
              exit={"closed"}
              initial={"closed"}
              variants={{
                open: {
                  opacity: 1,
                  transition: {
                    delayChildren: stagger(0.05, { from: "first" }),
                  },
                },
                closed: {
                  opacity: 0,
                  transition: {
                    delayChildren: stagger(0.025, { from: "last" }),
                  },
                },
              }}
            >
              <div className="border-gray-4 border-b px-3 py-1.5">
                <h4 className="font-mono text-12 text-gray-11">
                  Notifications
                </h4>
              </div>
              <ul className="divide-y divide-gray-4">
                {Array.from(notifications, ({ author, message, createdAt }) => (
                  <motion.li
                    className="flex items-center gap-3 px-3 py-2 max-sm:translate-x-(--x) sm:translate-y-(--y)"
                    key={author}
                    variants={{
                      open: {
                        "--x": 0,
                        "--y": 0,
                      },
                      closed: {
                        "--x": "-100%",
                        "--y": "100%",
                      },
                    }}
                  >
                    <Avatar.Fallback size={32}>{author}</Avatar.Fallback>{" "}
                    <div className="flex w-full items-center">
                      <p className="text-14">{message}</p>
                      <span className="ml-auto font-mono text-12 text-gray-11">
                        {createdAt}
                      </span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
