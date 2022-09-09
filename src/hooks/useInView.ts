import { RefCallback, useCallback, useState } from 'react';

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

  return [ref, inView];
};
