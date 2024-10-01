"use client";
import DataTable, { DataItem } from "@/app/components/data_table";
import Dialog from "@/app/components/dialog";
import TableLoader from "@/app/components/table_loader";
import { Activities } from "@/app/domain/dto/actitivities";
import { fetcher } from "@/utils/fetcher";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import useSWR from "swr";
import HandleError from "../_components/handle_error";
import { useDeleteActivity } from "./_hooks/use_delete_activity";

const Page = () => {
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const [clickedItemId, setClickedItemId] = useState<string | undefined>();
  const { data, isLoading, error, mutate } = useSWR<Activities, Error>(
    "/api/activity",
    fetcher
  );

  const [loadingDelete, errorDelete, deleteResponse, onDelete] =
    useDeleteActivity();

  useEffect(() => {
    if (errorDelete || deleteResponse) {
      onClose();
      toast({
        title: errorDelete
          ? "Error delete activity"
          : deleteResponse
          ? "Success delete activity"
          : "-",
        description: errorDelete
          ? `Error: ${errorDelete}`
          : deleteResponse
          ? "Your activity successfully deleted!"
          : "-",
        status: errorDelete ? "error" : deleteResponse ? "success" : "info",
        duration: 1000,
        onCloseComplete: () => mutate(),
        isClosable: true,
      });
    }
  }, [errorDelete, deleteResponse, toast, mutate, onClose]);

  if (isLoading) return <TableLoader />;
  if (error)
    return <HandleError error={`Error: ${error}`} onRefresh={() => mutate()} />;
  if (!data) return <Text>No data from server</Text>;

  return (
    <Card padding={4}>
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        cancelref={cancelRef}
        componentsActions={
          <Box>
            <Button disabled={loadingDelete} ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={loadingDelete}
              colorScheme="red"
              onClick={() => {
                if (!clickedItemId) return;
                onDelete(clickedItemId);
              }}
              ml={3}
            >
              {loadingDelete ? <CircularProgress size={8} /> : "Delete"}
            </Button>
          </Box>
        }
        title={`Delete this activity data?`}
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
              onClick={() => router.push(`/dashboard/activity/${id}`)}
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
