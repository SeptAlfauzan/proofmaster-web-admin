import { PostActivityResult } from "@/app/domain/dto/post_acitivity_result";
import { useCallback, useState } from "react";
import { ActivitySchemaType } from "../new/page";

export const usePostActivity = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<PostActivityResult | undefined>();

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

      const content = await rawResponse.json();
      const parsed: PostActivityResult = content;
      setData(parsed);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const dismissError = useCallback(() => setError(undefined), []);

  return [loading, error, data, submit, dismissError] as const;
};
