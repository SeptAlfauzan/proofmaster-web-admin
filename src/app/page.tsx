"use client";
import { Box } from "@chakra-ui/react";
import Page from "./auth/page";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/auth");
  }, [router]);

  return (
    <Box>
      <Page />
    </Box>
  );
}
