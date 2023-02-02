export function formDataToObj(formData: FormData): Record<string, any> {
  return [...formData].reduce(
    (acc, [key, val]) => ({ ...acc, [key]: val }),
    {}
  );
}
