"use client";
import DataTable, { DataItem } from "@/app/components/data_table";
import TableLoader from "@/app/components/table_loader";
import { Activities } from "@/app/domain/dto/actitivities";
import { fetcher } from "@/utils/fetcher";
import { Button, Card, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { MdAdd } from "react-icons/md";
import useSWR from "swr";
import HandleError from "../_components/handle_error";

const Page = () => {
  const router = useRouter();
  const { data, isLoading, error, mutate } = useSWR<Activities, Error>(
    "/api/activity",
    fetcher
  );

  if (isLoading) return <TableLoader />;
  if (error)
    return <HandleError error={`Error: ${error}`} onRefresh={() => mutate()} />;
  if (!data) return <Text>No data from server</Text>;

  return (
    <Card padding={4}>
      <DataTable
        actionWidget={
          <Button
            rightIcon={<MdAdd />}
            onClick={() => router.push("/dashboard/activity/new")}
            colorScheme="blue"
          >
            Add activity
          </Button>
        }
        searchBy="title"
        title="Activities"
        desc="List activities"
        data={data.data.activities as unknown as DataItem[]}
      />
    </Card>
  );
};
export default Page;
