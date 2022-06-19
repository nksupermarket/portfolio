import React, { useState, useEffect } from 'react';

export default function useIntersectionObserver(
  elementRef: React.RefObject<HTMLElement>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false
  }
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(
    null
  );

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    const node = elementRef.current;
    const ioSupport = !!window.IntersectionObserver;

    if (!ioSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry);
    }, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, frozen]);

  return entry;
}
