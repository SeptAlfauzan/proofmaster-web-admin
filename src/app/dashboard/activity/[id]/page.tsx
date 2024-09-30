"use client";
import { Activity } from "@/app/domain/dto/activity";
import { fetcher } from "@/utils/fetcher";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  CircularProgress,
  CloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdChevronLeft, MdSave } from "react-icons/md";
import useSWR from "swr";
import { z } from "zod";
import HandleError from "../../_components/handle_error";
import InputFile from "../../_components/input_file";
import { useEditActivity } from "../_hooks/use_edit_activity";

const activitySchema = z.object({
  name: z.string().min(1, "Activity name is required"),
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 4000000, "File size should be less than 4MB")
    .refine(
      (file) => file.type === "application/pdf",
      "Only PDF files are allowed"
    ),
});

export type ActivitySchemaType = z.infer<typeof activitySchema>;

const Page = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, error, mutate } = useSWR<Activity, Error>(
    `/api/activity/${params.id}`,
    fetcher
  );
  const [initialPdfFile, setInitialPdfFile] = useState<File | undefined>();

  const router = useRouter();
  const toast = useToast();
  const [loading, errorEdit, response, submit, dismissError] = useEditActivity(
    params.id
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<ActivitySchemaType>({
    resolver: zodResolver(activitySchema),
  });

  const onSubmit = (data: ActivitySchemaType) => {
    console.log(data);
    submit(data);
  };

  useEffect(() => {
    if (response)
      toast({
        title: "Activity successfully edited.",
        description: "We've edit the current activity for you.",
        status: "success",
        duration: 1000,
        isClosable: true,
        onCloseComplete: () => router.back(),
      });
  }, [response, router, toast]);

  useMemo(() => {
    if (!data) return;
    const setInitialValue = async () => {
      setValue("name", data.data.title);
      const blob = await fetch(data.data.pdf_url).then((r) => r.blob());
      const file = new File([blob], "initial_file.pdf", {
        type: "application/pdf",
      });
      setInitialPdfFile(file);
      setValue("file", file);
    };
    setInitialValue();
  }, [data, setValue]);

  if (isLoading) return <Text>Loading...</Text>;
  if (error)
    return <HandleError error={`${error}`} onRefresh={() => mutate()} />;

  return (
    <Box>
      {errorEdit && (
        <Alert
          status="error"
          width={{ base: "100%", md: "400px" }}
          rounded={"lg"}
        >
          <AlertIcon />
          <Box flex={1}>
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{errorEdit.toString()}</AlertDescription>
          </Box>
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
            onClick={dismissError}
          />
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box w={{ md: "50%", base: "100%" }}>
          <Card p={4}>
            <Heading mb={4}>Edit activity</Heading>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>Activity Name</FormLabel>
              <Input {...register("name")} />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.file}>
              <FormLabel>Upload File</FormLabel>
              <Controller
                name="file"
                control={control}
                render={({ field: { onChange, ...rest } }) => (
                  <InputFile
                    defaultValue={initialPdfFile}
                    fileType=".pdf"
                    onChange={(file: File) => onChange(file)}
                    {...rest}
                  />
                )}
              />
              <FormErrorMessage>
                {errors.file && errors.file.message}
              </FormErrorMessage>
            </FormControl>
          </Card>
          <Box display={"flex"} gap={4} mt={4} justifyContent={"end"}>
            <Button
              leftIcon={<MdChevronLeft />}
              onClick={() => router.back()}
              colorScheme="blue"
              type="button"
            >
              Back
            </Button>
            <Button leftIcon={<MdSave />} colorScheme="green" type="submit">
              {loading ? (
                <CircularProgress isIndeterminate color="white" size={8} />
              ) : (
                "Submit"
              )}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Page;
