"use client";
import DataTable, { DataItem } from "@/app/components/data_table";
import TableLoader from "@/app/components/table_loader";
import { Teachers } from "@/app/domain/dto/teachers";
import { fetcher } from "@/utils/fetcher";
import { Button, Card, Text } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import useSWR from "swr";
import HandleError from "../_components/handle_error";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { data, isLoading, error, mutate } = useSWR<Teachers>(
    "/api/teachers",
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
            colorScheme="blue"
            onClick={() => router.push("/dashboard/teachers/new")}
          >
            Add teacher
          </Button>
        }
        searchBy="name"
        title="Teachers User"
        desc="List teacher user data"
        data={data.data.teachers as unknown as DataItem[]}
      />
    </Card>
  );
};
export default Page;
