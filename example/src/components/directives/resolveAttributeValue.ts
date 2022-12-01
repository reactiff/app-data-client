export default function resolveAttributeValue(value?: any) {
  if (!value) return value;
  return value.hex ? value.hex() : value;
}
