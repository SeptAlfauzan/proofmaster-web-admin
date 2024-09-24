"use client";
import DataTable, { DataItem } from "@/app/components/data_table";
import { Students } from "@/app/domain/dto/students";
import { fetcher } from "@/utils/fetcher";
import { Button, Card, Text } from "@chakra-ui/react";
import { MdAdd, MdRefresh } from "react-icons/md";
import useSWR from "swr";

const Page = () => {
  const { data, isLoading, error, mutate } = useSWR<Students>(
    "/api/students",
    fetcher
  );

  if (isLoading) return <Text>Loading data..</Text>;
  if (error)
    return (
      <Card p={4}>
        <Text>Error: {error}</Text>
        <Button rightIcon={<MdRefresh />} onClick={() => mutate()}>
          Refresh
        </Button>
      </Card>
    );

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
