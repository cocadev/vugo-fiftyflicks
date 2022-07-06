import { useRef } from "react";

export default function useThrottle(callback, delay) {
  const savedTimer = useRef(null);

  function execCallback(...args) {
    // Create a timeout and block other calls until this callback is resolved
    savedTimer.current = setTimeout(() => {
      if (typeof callback === "function") {
        callback(...args);
      }

      savedTimer.current = null;
    }, delay);
  }

  return {
    exec: (...args) => {
      // Execute only if no other callback is waiting
      if (!savedTimer.current) {
        execCallback(...args);
      }
    },
    execForced : (...args) => {
      if (savedTimer.current) {
        clearTimeout(savedTimer)
      }
      execCallback(...args);
    },
    clear: () => {
      // Clear the current timeout
      if (savedTimer.current) {
        clearTimeout(savedTimer.current);
      }
    },
  };
}
