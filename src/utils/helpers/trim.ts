export function trim(string: string, symbols = '\\s\\xA0'): string {
  const leftTrim = new RegExp(`^[${symbols}]*`);
  const rightTrim = new RegExp(`[${symbols}]*$`);

  return string.replace(leftTrim, '').replace(rightTrim, '');
}
