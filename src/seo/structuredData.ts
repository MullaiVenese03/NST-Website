export function toJsonLdScript(data: object | object[]): string {
  const list = Array.isArray(data) ? data : [data];
  if (list.length === 1) return JSON.stringify(list[0]);
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": list,
  });
}
