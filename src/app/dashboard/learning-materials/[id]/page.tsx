"use client";
import { LearningMaterial } from "@/app/domain/dto/learning_material";
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
  SimpleGrid,
  Text,
  Textarea,
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
import { useEditLearningMaterial } from "../_hooks/use_edit_learning_material";

const ACCEPTED_IMAGE_TYPES = ["image/png"];

const learningMaterialSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, "File size should be less than 5MB")
    .refine(
      (file) => file.type === "application/pdf",
      "Only PDF files are allowed"
    ),
  icon: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, "File size should be less than 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only image files are allowed"
    ),
});

export type LearningMaterialSchemaType = z.infer<typeof learningMaterialSchema>;

const Page = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, error, mutate } = useSWR<LearningMaterial, Error>(
    `/api/learning-materials/${params.id}`,
    fetcher
  );
  const [initialPdfFile, setInitialPdfFile] = useState<File | undefined>();
  const [initialIconFile, setInitialIconFile] = useState<File | undefined>();

  const router = useRouter();
  const toast = useToast();
  const [loadBlobData, setLoadBlobData] = useState(false);
  const [loadingEdit, errorEdit, response, submit, dismissErrorEdit] =
    useEditLearningMaterial(params.id);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<LearningMaterialSchemaType>({
    resolver: zodResolver(learningMaterialSchema),
  });

  useMemo(() => {
    if (!data) return;
    setLoadBlobData(true);
    const setInitialValue = async () => {
      try {
        setValue("title", data.data.title);
        setValue("description", data.data.description);
        const blobPdf = await fetch(data.data.pdf_url).then((r) => r.blob());
        const filePdf = new File([blobPdf], "initial_file.pdf", {
          type: "application/pdf",
        });
        const blobIcon = await fetch(data.data.ic_url).then((r) => r.blob());
        const fileIcon = new File([blobIcon], "initial_icon.png", {
          type: "image/png",
        });
        setInitialPdfFile(filePdf);
        setInitialIconFile(fileIcon);
        setValue("file", filePdf);
        setValue("icon", fileIcon);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadBlobData(false);
      }
    };
    setInitialValue();
  }, [data, setValue]);

  useEffect(() => {
    if (response)
      toast({
        title: "Learning material successfully edited.",
        description: "We've edit the current learning material for you.",
        status: "success",
        duration: 1000,
        isClosable: true,
        onCloseComplete: () => router.back(),
      });
  }, [response, router, toast]);

  const onSubmit = (data: LearningMaterialSchemaType) => {
    console.log(data);
    submit(data);
  };

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
            onClick={dismissErrorEdit}
          />
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box w={{ md: "50%", base: "100%" }}>
          <Card p={4}>
            <Heading>Add learning material</Heading>
            <SimpleGrid columns={{ md: 2, base: 1 }} gap={4}>
              <FormControl isInvalid={!!errors.title}>
                <FormLabel>Tile</FormLabel>
                <Input {...register("title")} />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.description}>
                <FormLabel>Description</FormLabel>
                <Textarea {...register("description")} />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>
              {loadBlobData ? (
                <Text>
                  Please wait, we fetching the file from previous record data
                </Text>
              ) : (
                <FormControl isInvalid={!!errors.file}>
                  <FormLabel>Upload Pdf Learning Material</FormLabel>
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
                    {errors.icon && errors.icon.message}
                  </FormErrorMessage>
                </FormControl>
              )}
              {loadBlobData ? (
                <Text>
                  Please wait, we fetching the file from previous record data
                </Text>
              ) : (
                <FormControl isInvalid={!!errors.icon}>
                  <FormLabel>Upload icon Learning Material</FormLabel>
                  <Box>
                    <Controller
                      name="icon"
                      control={control}
                      render={({ field: { onChange, ...rest } }) => (
                        <InputFile
                          defaultValue={initialIconFile}
                          fileType="image/png"
                          onChange={(file: File) => onChange(file)}
                          {...rest}
                        />
                      )}
                    />
                    {/* <Box>
                    <Text>Preview Icon</Text>
                    {data?.data.ic_url && (
                      <Image
                        src={data?.data.ic_url}
                        alt={"preview"}
                        width={100}
                        height={100}
                        />
                        )}
                        </Box> */}
                  </Box>
                  <FormErrorMessage>
                    {errors.icon && errors.icon.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            </SimpleGrid>
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
              {loadingEdit ? (
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
