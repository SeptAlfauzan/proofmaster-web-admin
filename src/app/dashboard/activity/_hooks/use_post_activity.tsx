import { useCallback, useState } from "react";
import { ActivitySchemaType } from "../new/page";

export const usePostActivity = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<string | undefined>();

  const submit = useCallback(async (schema: ActivitySchemaType) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", schema.file);
      formData.append("name", schema.name);
      const rawResponse = await fetch("/api/activity", {
        method: "POST",
        body: formData,
      });

      if (rawResponse.status != 200) throw Error(rawResponse.statusText);

      await rawResponse.json();
      setData("success created new activity!");
    } catch (e) {
      console.log(e);
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const dismissError = useCallback(() => setError(undefined), []);

  return [loading, error, data, submit, dismissError] as const;
};
