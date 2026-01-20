export function trimFields(obj) {
  function trim(value) {
    if (Array.isArray(value)) {
      return value.map((item) => trim(item));
    } else if (typeof value === "object" && value !== null) {
      if (value instanceof Date) {
        return value;
      }
      return Object.keys(value).reduce((acc, key) => {
        const fieldValue = value[key];
        acc[key] =
          typeof fieldValue === "string" ? fieldValue.trim() : trim(fieldValue);
        return acc;
      }, {});
    } else {
      return value;
    }
  }

  return trim(obj);
}
