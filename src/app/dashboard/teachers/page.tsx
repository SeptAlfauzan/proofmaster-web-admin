"use client";
import DataTable, { DataItem } from "@/app/components/data_table";
import TableLoader from "@/app/components/table_loader";
import { Teachers } from "@/app/domain/dto/teachers";
import { fetcher } from "@/utils/fetcher";
import {
  Box,
  Button,
  Card,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import useSWR from "swr";
import HandleError from "../_components/handle_error";
import { useRouter } from "next/navigation";
import Dialog from "@/app/components/dialog";
import React, { useState } from "react";

const Page = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const { data, isLoading, error, mutate } = useSWR<Teachers, Error>(
    "/api/teachers",
    fetcher
  );
  const [clickedItemId, setClickedItemId] = useState<string | undefined>();

  if (isLoading) return <TableLoader />;
  if (error)
    return (
      <HandleError
        error={`Error: ${error.message}`}
        onRefresh={() => mutate()}
      />
    );
  if (!data) return <Text>No data from server</Text>;

  return (
    <Card padding={4}>
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        cancelref={cancelRef}
        componentsActions={
          <Box>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                console.log(clickedItemId);
                onClose();
              }}
              ml={3}
            >
              Delete
            </Button>
          </Box>
        }
        title={`Delete this teacher data?`}
        text={
          "Deleting this data will make the record dissapear from our server"
        }
      />
      <DataTable
        recordActionComponents={(id) => (
          <Box>
            <IconButton
              background={"none"}
              color={"blue"}
              icon={<MdEdit />}
              aria-label="edit"
            />
            <IconButton
              onClick={() => {
                setClickedItemId(id);
                onOpen();
              }}
              color={"red"}
              background={"none"}
              icon={<MdDelete />}
              aria-label="delete"
            />
          </Box>
        )}
        actionComponent={
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
