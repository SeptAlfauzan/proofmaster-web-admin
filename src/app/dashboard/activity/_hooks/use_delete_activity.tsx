import { useCallback, useState } from "react";

export const useDeleteActivity = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<string | undefined>();

  const submit = useCallback(async (activityId: string) => {
    try {
      setLoading(true);
      const rawResponse = await fetch(`/api/activity/${activityId}`, {
        method: "DELETE",
      });

      if (rawResponse.status != 200) throw Error(rawResponse.statusText);

      await rawResponse.json();
      setData("success delete activity!");
    } catch (e) {
      console.log(e);
      setError((e as Error).message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, []);

  const dismissError = useCallback(() => setError(undefined), []);

  return [loading, error, data, submit, dismissError] as const;
};
