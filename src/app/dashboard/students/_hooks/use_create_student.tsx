import { PostActivityResult } from "@/app/domain/dto/post_acitivity_result";
import { useCallback, useState } from "react";
import { StudentSchemaType } from "../new/page";

export const useCreateStudent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<PostActivityResult | undefined>();

  const submit = useCallback(async (schema: StudentSchemaType) => {
    try {
      setLoading(true);
      const rawResponse = await fetch("/api/students", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(schema),
      });
      if (rawResponse.status != 200) throw Error(rawResponse.statusText);

      const content = await rawResponse.json();
      setData(content);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const dismissError = useCallback(() => setError(undefined), []);

  return [loading, error, data, submit, dismissError] as const;
};
