"use client";
import DataTable, { DataItem } from "@/app/components/data_table";
import TableLoader from "@/app/components/table_loader";
import { LearningMaterials } from "@/app/domain/dto/learning_materials";
import { fetcher } from "@/utils/fetcher";
import { Button, Card, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { MdAdd } from "react-icons/md";
import useSWR from "swr";
import HandleError from "../_components/handle_error";

const Page = () => {
  const router = useRouter();
  const { data, isLoading, error, mutate } = useSWR<LearningMaterials>(
    "/api/learning-materials",
    fetcher
  );

  if (isLoading) return <TableLoader />;
  if (error) return <HandleError error={error} onRefresh={() => mutate()} />;
  if (!data) return <Text>No data from server</Text>;

  return (
    <Card padding={4}>
      <DataTable
        actionWidget={
          <Button
            rightIcon={<MdAdd />}
            onClick={() => router.push("/dashboard/learning-materials/new")}
            colorScheme="blue"
          >
            Add new learning material
          </Button>
        }
        searchBy="title"
        title="Activities"
        desc="List activities"
        data={data.data as unknown as DataItem[]}
      />
    </Card>
  );
};
export default Page;
