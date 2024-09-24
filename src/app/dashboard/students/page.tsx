"use client";
import DataTable, { DataItem } from "@/app/components/data_table";
import { Students } from "@/app/domain/dto/students";
import { fetcher } from "@/utils/fetcher";
import { Button, Card, Text } from "@chakra-ui/react";
import { MdAdd, MdRefresh } from "react-icons/md";
import useSWR from "swr";
import HandleError from "../_components/handle_error";

const Page = () => {
  const { data, isLoading, error, mutate } = useSWR<Students>(
    "/api/students",
    fetcher
  );

  if (isLoading) return <Text>Loading data..</Text>;
  if (error) return <HandleError error={error} onRefresh={() => mutate()} />;

  if (data == undefined) return <Text>No data from server</Text>;
  return (
    <Card padding={4}>
      <DataTable
        actionWidget={
          <Button ml={4} rightIcon={<MdAdd />} colorScheme="blue">
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
