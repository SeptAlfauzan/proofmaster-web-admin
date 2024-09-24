import { AuthResult } from "@/app/domain/dto/auth_result";
import { useCallback, useState } from "react";

export const useAuth = <T>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<AuthResult | undefined>();

  const submit = useCallback(async (schema: T) => {
    try {
      setLoading(true);
      const rawResponse = await fetch("/api/auth", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(schema),
      });

      if (rawResponse.status == 401)
        throw Error(
          "Data login anda salah! Pastikan email dan password anda benar"
        );
      if (rawResponse.status != 200) throw Error(rawResponse.statusText);

      const content = await rawResponse.json();
      const parsed: AuthResult = content;
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
