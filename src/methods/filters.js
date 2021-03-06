// 數字轉成千分號格式
export function currency(num) {
  const n = parseInt(num, 10);
  return `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && (a.length - i) % 3 === 0 ? `,${c}` : c))}`;
}

// 日期改成2021/xx/xx
export function date(time) {
  const localDate = new Date(time * 1000);
  return localDate.toLocaleDateString();
}
