"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import UserMenuTrigger from "./UserMenuTrigger";
import UserMenuDropdown from "./UserMenuDropdown";

const UserMenu = ({ user }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        close();
      }
    };
    // Use mousedown so the click that opened doesn't immediately close it
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, close]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, close]);

  return (
    <div ref={containerRef} className="relative">
      <UserMenuTrigger user={user} open={open} onClick={toggle} />

      <AnimatePresence>
        {open && (
          <motion.div
            // Anchored to bottom-right of trigger
            className="absolute top-full right-0 mt-3 z-50"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.175, ease: "easeOut" }}
          >
            <UserMenuDropdown user={user} onClose={close} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
