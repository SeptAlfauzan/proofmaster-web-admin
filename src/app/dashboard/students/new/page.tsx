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
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdChevronLeft, MdSave } from "react-icons/md";
import { z } from "zod";
import { useCreateStudent } from "../_hooks/use_create_student";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const studentSchema = z
  .object({
    nim: z.string().min(11, "NIM minimum is 11 characters!!"),
    name: z.string().min(1, "Student name is required!"),
    email: z.string().regex(emailRegex, "Email is invalid!"),
    password: z.string().min(8, "Password minimum is 8 characters!!"),
    confirmPassword: z.string().min(8, "Password minimum is 8 characters!!"),
  })
  .refine((schema) => schema.confirmPassword === schema.password, {
    message: "Passwords must match!",
    path: ["confirmPassword"], // This specifies which field the error belongs to
  });

export type StudentSchemaType = z.infer<typeof studentSchema>;

const Page = () => {
  const router = useRouter();
  const toast = useToast();
  const [loading, error, response, submit, dismissError] = useCreateStudent();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentSchemaType>({
    resolver: zodResolver(studentSchema),
  });

  const onSubmit = (data: StudentSchemaType) => {
    console.log(data);
    submit(data);
  };

  useEffect(() => {
    if (response)
      toast({
        title: "Student account created.",
        description: "We've created new student account for you.",
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
        <Card p={4} w={{ md: "50%", base: "100%" }}>
          <Heading>Add Student User Data</Heading>
          <SimpleGrid columns={2} spacing={4}>
            <FormControl isInvalid={!!errors.nim}>
              <FormLabel>NIM</FormLabel>
              <Input {...register("nim")} type="number" />
              <FormErrorMessage>
                {errors.nim && errors.nim.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>Name</FormLabel>
              <Input {...register("name")} />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input {...register("email")} />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel>Password</FormLabel>
              <Input {...register("password")} type="password" />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.confirmPassword}>
              <FormLabel>Repeat Password</FormLabel>
              <Input {...register("confirmPassword")} type="password" />
              <FormErrorMessage>
                {errors.confirmPassword && errors.confirmPassword.message}
              </FormErrorMessage>
            </FormControl>
          </SimpleGrid>
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
