
"use client";

import { useState, useRef, useEffect } from 'react';

const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [node, setNode] = useState<HTMLElement | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new window.IntersectionObserver(([entry]) => setEntry(entry), options);

    const { current: currentObserver } = observer;

    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node, options]);

  return [setNode, entry];
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function AnimatedSection({ children, className, id }: AnimatedSectionProps) {
  const [setNode, entry] = useIntersectionObserver({ threshold: 0.1 }) as [(node: HTMLElement | null) => void, IntersectionObserverEntry | undefined];
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      setNode(sectionRef.current);
    }
  }, [setNode]);

  const isVisible = entry?.isIntersecting;

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`${className} scroll-animated ${isVisible ? 'scrolled-in' : ''}`}
    >
      {children}
    </section>
  );
}
