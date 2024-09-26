"use client";
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
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdChevronLeft, MdSave } from "react-icons/md";
import { z } from "zod";
import InputFile from "../../_components/input_file";
import { useRouter } from "next/navigation";
import { usePostLearningMaterial } from "../_hooks/use_post_learning_material";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

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

const Page = () => {
  const router = useRouter();
  const toast = useToast();
  const [loading, error, response, submit, dismissError] =
    usePostLearningMaterial();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LearningMaterialSchemaType>({
    resolver: zodResolver(learningMaterialSchema),
  });

  const onSubmit = (data: LearningMaterialSchemaType) => {
    console.log(data);
    submit(data);
  };

  useEffect(() => {
    if (response)
      toast({
        title: "Learning material created.",
        description: "We've created new learning material for you.",
        status: "success",
        duration: 1000,
        isClosable: true,
        onCloseComplete: () => router.back(),
      });
  }, [response, router, toast]);

  return (
    <Box>
      {error && (
        <Alert
          status="error"
          width={{ base: "100%", md: "400px" }}
          rounded={"lg"}
        >
          <AlertIcon />
          <Box flex={1}>
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{error.toString()}</AlertDescription>
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
              <FormControl isInvalid={!!errors.file}>
                <FormLabel>Upload Pdf Learning Material</FormLabel>
                <Controller
                  name="file"
                  control={control}
                  render={({ field: { onChange, ...rest } }) => (
                    <InputFile
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
              <FormControl isInvalid={!!errors.icon}>
                <FormLabel>Upload icon Learning Material</FormLabel>
                <Controller
                  name="icon"
                  control={control}
                  render={({ field: { onChange, ...rest } }) => (
                    <InputFile
                      fileType="image/png, image/jpeg"
                      onChange={(file: File) => onChange(file)}
                      {...rest}
                    />
                  )}
                />
                <FormErrorMessage>
                  {errors.icon && errors.icon.message}
                </FormErrorMessage>
              </FormControl>
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
