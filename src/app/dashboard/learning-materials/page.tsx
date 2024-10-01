"use client";
import DataTable, { DataItem } from "@/app/components/data_table";
import Dialog from "@/app/components/dialog";
import TableLoader from "@/app/components/table_loader";
import { LearningMaterials } from "@/app/domain/dto/learning_materials";
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
import { useDeleteLearningMaterial } from "./_hooks/use_delete_learning_material";

const Page = () => {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const [clickedItemId, setClickedItemId] = useState<string | undefined>();
  const { data, isLoading, error, mutate } = useSWR<LearningMaterials, Error>(
    "/api/learning-materials",
    fetcher
  );

  const [loadingDelete, errorDelete, deleteResponse, onDelete] =
    useDeleteLearningMaterial();

  useEffect(() => {
    if (errorDelete || deleteResponse) {
      onClose();
      toast({
        title: errorDelete
          ? "Error delete learning material"
          : deleteResponse
          ? "Success delete learning material"
          : "-",
        description: errorDelete
          ? `Error: ${errorDelete}`
          : deleteResponse
          ? "Your learning material successfully deleted!"
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
                if (!clickedItemId) return;
                onDelete(clickedItemId);
              }}
              ml={3}
            >
              {loadingDelete ? <CircularProgress size={8} /> : "Delete"}
            </Button>
          </Box>
        }
        title={`Delete this learning material data?`}
        text={
          "Deleting this data will make the record dissapear from our server"
        }
      />
      <DataTable
        recordActionComponents={(id) => (
          <Box>
            <IconButton
              onClick={() => router.push(`/dashboard/learning-materials/${id}`)}
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
            onClick={() => router.push("/dashboard/learning-materials/new")}
            colorScheme="blue"
          >
            Add new learning material
          </Button>
        }
        searchBy="title"
        title="Learning Materials"
        desc="List learning materials data"
        data={data.data as unknown as DataItem[]}
      />
    </Card>
  );
};
export default Page;
