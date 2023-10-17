export const dateToAnsiDate = (parameter: Date | string | null | undefined) => {
  if (!parameter) {
    return "";
  }

  const date = new Date(parameter);

  return (
    date.getFullYear().toString().padStart(4, "0") +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0")
  );
};
