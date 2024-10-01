import { DeleteLearningMaterialResult } from "@/app/domain/dto/delete_learning_materials_result";
import { PostActivityResult } from "@/app/domain/dto/post_acitivity_result";
import { useCallback, useState } from "react";

export const useDeleteLearningMaterial = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<PostActivityResult | undefined>();

  const submit = useCallback(async (id: string) => {
    try {
      setLoading(true);

      const rawResponse = await fetch(`/api/learning-materials/${id}`, {
        method: "DELETE",
      });

      if (rawResponse.status != 200) throw Error(rawResponse.statusText);

      const content = await rawResponse.json();
      const parsed: DeleteLearningMaterialResult = content;
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
