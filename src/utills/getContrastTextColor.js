export const getContrastTextColor = (bgColor) => {
  let hex = bgColor.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const brightness = r * 0.299 + g * 0.587 + b * 0.114;
  return brightness > 186 ? "#000000" : "#FFFFFF";
};
