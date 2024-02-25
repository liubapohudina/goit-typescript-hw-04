import React, { useEffect, useRef } from 'react';

// Опишіть Props

type Props = {
  children: React.ReactNode;
  onContentEndVisible: Function;
}
export function Observer({ children, onContentEndVisible }: Props) {
  // Вкажіть правильний тип для useRef зверніть увагу, в який DOM елемент ми його передаємо
  const endContentRef = useRef<HTMLDivElement>(null);
/*------------TYPE FOR OPTIONS-------------*/
//   type Options = {
//   rootMargin: string;
//   threshold: number;
//   root: HTMLElement | null;
  // };
  class Options {
  rootMargin: string;
  threshold: number;
  root: HTMLElement | null;

  constructor(rootMargin: string, threshold: number, root: HTMLElement | null) {
    this.rootMargin = rootMargin;
    this.threshold = threshold;
    this.root = root;
  }
}
  useEffect(() => {
    // Вкажіть правильний тип для options, підказка, клас також можна вказувати як тип
    const options: Options = new Options('0px', 1.0, null)

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
