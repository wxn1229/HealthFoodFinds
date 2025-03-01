// 預先計算並緩存日期相關的常量
export const MONTHS = Object.freeze(
  Array.from({ length: 12 }, (_, i) => i + 1)
);

const CURRENT_YEAR = new Date().getFullYear();
export const YEARS = Object.freeze(
  Array.from({ length: 100 }, (_, i) => CURRENT_YEAR - i)
);

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};
