export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
};
