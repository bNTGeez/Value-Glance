export const formatNumbersWithCommas = (num) => {
  if (num == null || num == undefined) return "N/A";
  return num.toLocaleString();
};
