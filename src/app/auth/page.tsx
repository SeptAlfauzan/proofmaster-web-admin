"use client";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  CloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "./hooks/use_auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const authSchema = z
  .object({
    email: z.string().regex(emailRegex),
    password: z.string().min(8),
  })
  .partial()
  .required();

type AuthSchemaType = z.infer<typeof authSchema>;

export default function Page() {
  const router = useRouter();
  const [loading, error, response, submit, dismissError] =
    useAuth<AuthSchemaType>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchemaType>({
    resolver: zodResolver(authSchema),
  });

  useEffect(() => {
    if (response?.data?.token != undefined) router.replace("/dashboard");
  }, [response]);

  return (
    <Box height={"100vh"}>
      <Box
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        top={0}
        padding={4}
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={4}
      >
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
        <Box
          width={{ base: "100%", md: "400px" }}
          backgroundColor="#F1F4FF"
          p={4}
          rounded={"xl"}
          gap={4}
          display={"flex"}
          flexDir={"column"}
        >
          <Heading
            fontWeight={"bold"}
            color={"#4555E5"}
            textAlign={"center"}
            fontSize={24}
          >
            Selamat Datang di Proof Master Website, Admin
          </Heading>
          <Text textAlign={"center"}>Masuk untuk melanjutkan</Text>
          <form onSubmit={handleSubmit(async (d) => await submit(d))}>
            <Box display={"flex"} flexDir={"column"} gap={4}>
              <FormControl isInvalid={errors.email?.message != null}>
                <FormLabel>Email</FormLabel>
                <Input {...register("email")} type="email" />
                {errors.email?.message && (
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.password?.message != null}>
                <FormLabel>Password</FormLabel>
                <Input {...register("password")} type="password" />
                {errors.password?.message && (
                  <FormErrorMessage>
                    {errors.password?.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <Button
                backgroundColor="#4555E5"
                color={"white"}
                type="submit"
                width={"100%"}
              >
                {loading ? (
                  <CircularProgress isIndeterminate color="white" />
                ) : (
                  "Login"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
      <BackgroundWave />
    </Box>
  );
}

const BackgroundWave = () => (
  <Box height={"100vh"} display={"flex"} alignItems={"end"}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#4555E5"
        fillOpacity="1"
        d="M0,256L26.7,250.7C53.3,245,107,235,160,240C213.3,245,267,267,320,234.7C373.3,203,427,117,480,106.7C533.3,96,587,160,640,186.7C693.3,213,747,203,800,186.7C853.3,171,907,149,960,149.3C1013.3,149,1067,171,1120,160C1173.3,149,1227,107,1280,106.7C1333.3,107,1387,149,1413,170.7L1440,192L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
      ></path>
    </svg>
  </Box>
);
