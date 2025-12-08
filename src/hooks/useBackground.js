import { useEffect, useState } from 'react';

export const useBackground = (weather, currentTheme) => {
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    const weatherIcon = weather?.main?.icon?.slice(0, 2) || '01';
    const image = `url(${require(`../assets/img/backgrounds/${currentTheme}/${weatherIcon}.jpg`)})`;

    setBackgroundImage(image);
  }, [currentTheme, weather]);

  return backgroundImage;
};
