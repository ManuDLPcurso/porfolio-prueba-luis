import { useState, useEffect, useRef, useCallback } from 'react';

export function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStored(prev => {
      const next = value instanceof Function ? value(prev) : value;
      localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  }, [key]);

  return [stored, setValue];
}

export function useClickCounter(callback: () => void, threshold: number = 5, delay: number = 2000) {
  const countRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleClick = useCallback(() => {
    countRef.current++;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countRef.current >= threshold) {
      callback();
      countRef.current = 0;
    }
    timerRef.current = setTimeout(() => { countRef.current = 0; }, delay);
  }, [callback, threshold, delay]);

  return handleClick;
}
