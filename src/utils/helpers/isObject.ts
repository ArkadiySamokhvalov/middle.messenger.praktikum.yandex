export default function isObject(value: unknown): boolean {
  return Object.prototype.toString.call(value) === '[object Object]';
}
