"use client";
import DataTable, { DataItem } from "@/app/components/data_table";
import TableLoader from "@/app/components/table_loader";
import { Students } from "@/app/domain/dto/students";
import { fetcher } from "@/utils/fetcher";
import { Button, Card, Text } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import useSWR from "swr";
import HandleError from "../_components/handle_error";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { data, isLoading, error, mutate } = useSWR<Students>(
    "/api/students",
    fetcher
  );

  if (isLoading) return <TableLoader />;
  if (error) return <HandleError error={error} onRefresh={() => mutate()} />;
  if (!data) return <Text>No data from server</Text>;

  return (
    <Card padding={4} overflowX={{ base: "scroll", md: undefined }}>
      <DataTable
        actionWidget={
          <Button
            rightIcon={<MdAdd />}
            colorScheme="blue"
            onClick={() => router.push("/dashboard/students/new")}
          >
            Add student
          </Button>
        }
        searchBy="name"
        title="Student User"
        desc="List student user data"
        data={data.data.students as unknown as DataItem[]}
      />
    </Card>
  );
};

export default Page;
