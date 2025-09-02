"use client";
import { useEffect, useState, useRef } from "react";

export const useHash = () => {
  const [hash, setHash] = useState("");
  const originalMethods = useRef<{
    pushState: typeof window.history.pushState;
    replaceState: typeof window.history.replaceState;
  } | null>(null);

  useEffect(() => {
    const onHashChanged = () => setHash(window.location.hash);
    onHashChanged();

    // Store original methods
    const { pushState, replaceState } = window.history;
    originalMethods.current = { pushState, replaceState };

    // Override methods
    window.history.pushState = function (...args) {
      pushState.apply(window.history, args);
      setTimeout(() => setHash(window.location.hash), 0);
    };

    window.history.replaceState = function (...args) {
      replaceState.apply(window.history, args);
      setTimeout(() => setHash(window.location.hash), 0);
    };

    window.addEventListener("hashchange", onHashChanged);

    return () => {
      window.removeEventListener("hashchange", onHashChanged);

      // ✅ Restore original methods
      if (originalMethods.current) {
        window.history.pushState = originalMethods.current.pushState;
        window.history.replaceState = originalMethods.current.replaceState;
      }
    };
  }, []);

  return hash;
};
