export default function keyMirror(obj) {
  const result = {};
  for (const key in obj) {
    result[key] = key;
  }
  return result;
}
