export function floatToString(floatNum: number) {
  // Convert float to string with 2 decimal places
  let str = floatNum.toFixed(2);

  // Remove trailing zeroes
  str = str.replace(/\.?0*$/, '');

  // Remove decimal point if no decimal places left
  if (str.endsWith('.')) {
    str = str.slice(0, -1);
  }

  return str;
}
