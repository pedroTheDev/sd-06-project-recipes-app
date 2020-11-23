export default function findMatchInKeys(string, object) {
  return Object
    .keys(object).find((key) => key.match(string));
}
