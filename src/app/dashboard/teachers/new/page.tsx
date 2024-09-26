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
import { useCreateTeacher } from "../_hooks/use_create_student";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const teacherSchema = z
  .object({
    nim: z.string().min(11, "NIM minimum is 11 characters!!"),
    role: z.string(),
    name: z.string().min(1, "Student name is required!"),
    email: z.string().regex(emailRegex, "Email is invalid!"),
    password: z.string().min(8, "Password minimum is 8 characters!!"),
    confirmPassword: z.string().min(8, "Password minimum is 8 characters!!"),
  })
  .refine((schema) => schema.confirmPassword === schema.password, {
    message: "Passwords must match!",
    path: ["confirmPassword"], // This specifies which field the error belongs to
  });

export type TeacherSchemaType = z.infer<typeof teacherSchema>;

const Page = () => {
  const router = useRouter();
  const toast = useToast();
  const [loading, error, response, submit, dismissError] = useCreateTeacher();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeacherSchemaType>({
    resolver: zodResolver(teacherSchema),
  });

  const onSubmit = (data: TeacherSchemaType) => {
    console.log(data);
    submit(data);
  };

  useEffect(() => {
    if (response)
      toast({
        title: "Teacher account created.",
        description: "We've created new teacher account for you.",
        status: "success",
        duration: 1000,
        isClosable: true,
        onCloseComplete: () => router.back(),
      });
  }, [response, router, toast]);

  const generateRandomNIM = (): string => {
    const randomNumber = Math.floor(Math.random() * 90000000000) + 10000000000;
    return randomNumber.toString();
  };
  const randomNim = generateRandomNIM();
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
            <Heading>Add Student User Data</Heading>
            <SimpleGrid columns={2} spacing={4}>
              <FormControl isInvalid={!!errors.nim} display={"none"}>
                <FormLabel>NIM</FormLabel>
                <Input {...register("nim")} type="number" value={randomNim} />
                <FormErrorMessage>
                  {errors.nim && errors.nim.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.role} display={"none"}>
                <FormLabel>role</FormLabel>
                <Input {...register("role")} type="number" value={"TEACHER"} />
                <FormErrorMessage>
                  {errors.role && errors.role.message}
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
          <Box display={"flex"} gap={4} mt={4} justifyContent={"end"}>
            <Button
              leftIcon={<MdChevronLeft />}
              onClick={() => router.back()}
              colorScheme="blue"
              type="button"
            >
              Back
            </Button>
            <Button
              leftIcon={<MdSave />}
              colorScheme="green"
              type="submit"
              justifyContent={"end"}
            >
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
