import { RefCallback, RefObject, useCallback, useEffect, useRef, useState } from 'react';

export const useInView = (): [RefCallback<HTMLElement>, boolean] => {
  const [inView, setInView] = useState(false);
  const ref = useCallback((node: HTMLElement) => {
    if (node !== null) {
      const options = {
        threshold: 1.0,
      };
      let observer: IntersectionObserver;
      if (node) {
        observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) setInView(true);
          if (!entries[0].isIntersecting) setInView(false);
        }, options);
        observer.observe(node);
      }
    }
  }, []);
  // useEffect(() => {

  // }, [ref]);

  return [ref, inView];
};
