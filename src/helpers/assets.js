export default function findMatchInKeys(string, object) {
  return Object
    .keys(object).find((key) => key.match(string));
}

export function filterMatchInKeys(string, object) {
  return Object
    .keys(object).filter((key) => key.match(string));
}
