import { useEffect, useState } from 'react';

export const useSliderScroll = (ref) => {
  const [isButtonsDisabled, setIsButtonsDisabled] = useState({
    left: true,
    right: false,
  });

  const scrollRight = () => {
    const cardWidth = ref.current.firstChild.clientWidth;
    ref.current.scrollBy({
      top: 0,
      left: cardWidth,
      behavior: 'smooth',
    });
  };

  const scrollLeft = () => {
    const cardWidth = ref.current.firstChild.clientWidth;
    ref.current.scrollBy({
      top: 0,
      left: -cardWidth,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const scrollBar = ref.current;
    const scrollHandler = () => {
      const scrollWidth = ref.current.scrollWidth;
      const scrollLeft = ref.current.scrollLeft;
      const scrollProgress = ref.current.clientWidth + ref.current.scrollLeft;
      const isScrollEnd = scrollWidth - scrollProgress < 2 ? true : false;

      if (isScrollEnd) {
        setIsButtonsDisabled({ left: false, right: true });
      } else if (scrollLeft === 0) {
        setIsButtonsDisabled({ left: true, right: false });
      } else {
        setIsButtonsDisabled({ left: false, right: false });
      }
    };

    scrollBar.addEventListener('scroll', scrollHandler, { signal: controller.signal });

    return () => controller.abort();
  }, [ref]);

  return { scrollLeft, scrollRight, isButtonsDisabled };
};
