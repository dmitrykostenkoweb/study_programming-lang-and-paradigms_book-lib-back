export const generateCurrentDate = (): string => {
  const currentDate: Date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return currentDate.toLocaleDateString("pl-PL", options);
};
