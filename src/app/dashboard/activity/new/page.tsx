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
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdChevronLeft, MdSave } from "react-icons/md";
import { z } from "zod";
import { usePostActivity } from "../_hooks/use_post_activity";
import InputFile from "../../_components/input_file";
import { useRouter } from "next/navigation";

const activitySchema = z.object({
  name: z.string().min(1, "Activity name is required"),
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, "File size should be less than 5MB")
    .refine(
      (file) => file.type === "application/pdf",
      "Only PDF files are allowed"
    ),
});

export type ActivitySchemaType = z.infer<typeof activitySchema>;

const Page = () => {
  const router = useRouter();
  const toast = useToast();
  const [loading, error, response, submit, dismissError] = usePostActivity();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
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
        title: "Activity created.",
        description: "We've created new activity for you.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
  }, [response, toast]);

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
        <Card p={4} w={{ md: "50%", base: "100%" }}>
          <Heading>Add activity</Heading>
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
        <Box display={"flex"} gap={4} mt={4}>
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
      </form>
    </Box>
  );
};

export default Page;
