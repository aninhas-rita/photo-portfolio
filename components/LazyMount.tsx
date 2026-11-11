"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Keeps offscreen tiles out of the DOM until they're close to the
 * viewport, then keeps them mounted once shown (galleries are scrolled
 * forward far more than backward, so there's little value in unmounting
 * again). For a few hundred items this keeps memory flat without pulling
 * in a full virtualization library.
 *
 * At larger scale (many hundreds of items per folder), swap this for a
 * proper windowed list (e.g. react-virtuoso) that also unmounts tiles
 * that scroll far out of view.
 */
export default function LazyMount({
  children,
  minHeight,
}: {
  children: React.ReactNode;
  minHeight: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={ref} style={!visible ? { minHeight } : undefined}>
      {visible ? children : null}
    </div>
  );
}
