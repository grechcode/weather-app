export const cn = (...classNames) => {
  const classesList = [...classNames].filter((item) => item);
  return classesList.join(" ");
};
