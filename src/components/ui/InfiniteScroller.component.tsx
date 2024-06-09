import React, { ReactNode, useEffect, useRef } from "react";

interface InfiniteScrollerProps {
  children?: ReactNode
  loader?: ReactNode
  fetchMore: () => void
  hasMore: boolean
  endMessage?: ReactNode
  className?: string
}

export const InfiniteScrollerComponent: React.FC<InfiniteScrollerProps> = (
  { children, className, endMessage, fetchMore, hasMore, loader }
) => {
  const pageEndRef = useRef(null)

  useEffect(() => {
    if (hasMore) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { // check element in viewport ?
          console.log("Intersecting...")
          fetchMore();
        }
      });

      if (pageEndRef.current) {
        observer.observe(pageEndRef.current);
      }

      return () => {
        if (pageEndRef.current) {
          observer.unobserve(pageEndRef.current);
        }
      };
    }
  }, [hasMore]);

  return <div className={className}>
    {children}
    {hasMore ? <div ref={pageEndRef}>{loader}</div> : <p>{endMessage}</p>}
  </div>
}
