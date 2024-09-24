import { AuthResult } from "@/app/domain/dto/auth_result";
import { useCallback, useState } from "react";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<any>();

  const submit = useCallback(async () => {
    try {
      setLoading(true);
      const rawResponse = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

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
