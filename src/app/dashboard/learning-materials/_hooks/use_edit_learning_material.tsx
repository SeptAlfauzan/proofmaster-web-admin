import { EditLearingMaterialResponse } from "@/app/domain/dto/edit_learning_material";
import { PostActivityResult } from "@/app/domain/dto/post_acitivity_result";
import { useCallback, useState } from "react";
import { LearningMaterialSchemaType } from "../new/page";

export const useEditLearningMaterial = (id: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<PostActivityResult | undefined>();

  const submit = useCallback(
    async (schema: LearningMaterialSchemaType) => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", schema.file);
        formData.append("title", schema.title);
        formData.append("icon", schema.icon);
        formData.append("description", schema.description);
        console.log(formData);

        const rawResponse = await fetch(`/api/learning-materials/${id}`, {
          method: "PUT",
          body: formData,
        });

        if (rawResponse.status != 200) throw Error(rawResponse.statusText);

        const content = await rawResponse.json();
        const parsed: EditLearingMaterialResponse = content;
        setData(parsed);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  const dismissError = useCallback(() => setError(undefined), []);

  return [loading, error, data, submit, dismissError] as const;
};
