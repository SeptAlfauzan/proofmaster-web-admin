"use client";
import {
  Box,
  Button,
  Card,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Heading,
  IconButton,
  Image,
  List,
  ListItem,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { MutableRefObject } from "react";
import { MdMenu } from "react-icons/md";

export default function Home() {
  return (
    <Box background={"blue.50"}>
      <Navbar />
      <HomeSection />
      <FeaturesSection />
      <ContactSection />
    </Box>
  );
}

type NavbarContainerProps = {
  children: React.ReactNode;
};
const NavbarContainer: React.FC<NavbarContainerProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef: MutableRefObject<HTMLButtonElement | null> = React.useRef(null);
  return (
    <Box>
      <IconButton
        aria-label=""
        left={4}
        top={4}
        visibility={{ md: "hidden", base: "visible" }}
        ref={btnRef}
        onClick={onOpen}
        background={"white"}
        position={"fixed"}
        icon={<MdMenu />}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <Box>{children}</Box>
        </DrawerContent>
      </Drawer>
      <Box
        top={0}
        display={{ md: "block", base: "none" }}
        position={"fixed"}
        width={"100%"}
        zIndex={100}
      >
        {children}
      </Box>
    </Box>
  );
};

const Navbar = () => {
  const router = useRouter();
  return (
    <NavbarContainer>
      <List
        zIndex={1000}
        display={"flex"}
        gap={4}
        w={"100%"}
        px={10}
        py={4}
        flexDir={{ base: "column", md: "row" }}
        background={"white"}
        top={0}
        alignItems={{ md: "center", base: "start" }}
      >
        <ListItem mr={"auto"}>
          <Link href={"/"}>
            <Image src="/images/logo_with_text.png" alt="brand logo" />
          </Link>
        </ListItem>
        <ListItem fontSize={18} _hover={{ color: "blue" }} color={"gray.400"}>
          <Link href={"/#home"}>Beranda</Link>
        </ListItem>
        <ListItem fontSize={18} _hover={{ color: "blue" }} color={"gray.400"}>
          <Link href={"/#features"}>Fitur</Link>
        </ListItem>
        <ListItem fontSize={18} _hover={{ color: "blue" }} color={"gray.400"}>
          <Link href={"/#contact"}>Kontak</Link>
        </ListItem>
        <ListItem ml={{ md: "auto", base: 0 }} w={{ md: "auto", base: "100%" }}>
          <Button
            w={"100%"}
            background={"blue"}
            color={"white"}
            onClick={() => router.push("/auth")}
          >
            Login
          </Button>
        </ListItem>
      </List>
    </NavbarContainer>
  );
};
const HomeSection = () => {
  return (
    <Box
      minH={"100vh"}
      mt={{ md: 24, base: 0 }}
      id="home"
      backgroundImage={"/images/vector_0.png"}
      bgRepeat={"no-repeat"}
      bgPosition={"center center"}
      backgroundSize={"cover"}
    >
      <Box
        display={"flex"}
        flexGrow={0}
        px={10}
        flexDir={{ md: "row", base: "column" }}
      >
        <Box
          display={"flex"}
          flexDir={"column"}
          gap={4}
          justifyContent={"space-between"}
          pt={10}
        >
          <Heading
            w={{ md: 656, base: "auto" }}
            fontSize={{ md: 64, base: 42 }}
          >
            Belajar Geometri lebih mudah dengan Proof Master
          </Heading>
          <Text fontSize={24}>
            Aplikasi pembelajaran tentang geometri yang menyenangkan dan
            atraktif.
          </Text>
          <Text fontSize={24} fontWeight={"bold"}>
            Unduh aplikasi Proof Master sekarang!
          </Text>
          <Button
            mt="auto"
            display="flex"
            flexDir="row"
            height="48px"
            alignSelf="flex-start"
            color="white"
            background="black"
            py={4}
            _hover={{
              background: "gray.600",
            }}
          >
            <Image
              src="/images/playstore_icon.png"
              width={"32px"}
              height={"38px"}
              alt="icon playstore"
            />
            <Box>
              <Text>GET IT ON</Text>
              <Text fontWeight={"bold"}>Google Play</Text>
            </Box>
          </Button>
        </Box>
        <Box ml={"auto"}>
          <Image src="/images/frame_0.png" alt="banner image 1" />
        </Box>
      </Box>
    </Box>
  );
};
const FeaturesSection = () => {
  return (
    <Box
      id="features"
      minH={"1197px"}
      backgroundImage={"/images/bg_4.png"}
      bgRepeat={"no-repeat"}
      bgPosition={"right right"}
      backgroundSize={"cover"}
    >
      <Heading textAlign={"center"} color={"white"}>
        Fitur
      </Heading>
      <Box
        display={"flex"}
        flexDir={{ base: "column", md: "row" }}
        px={10}
        mt={40}
        gap={8}
      >
        <Box flex={1}>
          <Image
            src="/images/frame_1.png"
            alt="frame image 1"
            fit={"cover"}
            width={"100%"}
            height={"100%"}
          />
        </Box>
        <Box flex={1}>
          <SimpleGrid columns={{ md: 2, base: 1 }} gap={4}>
            <Card p={4} background={"gray.50"}>
              <Heading fontSize={32}>Materi</Heading>
              <Text fontSize={18} mt={4} color={"gray"}>
                Terdapat beberapa materi seperti pengenalan tentang geometri,
                format geometri, pengenalan lebih lanjut tentang geometri.
              </Text>
            </Card>
            <Card p={4} background={"gray.50"}>
              <Heading fontSize={32}>Soal latihan</Heading>
              <Text fontSize={18} mt={4} color={"gray"}>
                Pemahaman lebih lanjut dengan soal-soal latihan yang disajikan.
              </Text>
            </Card>
            <Card p={4} background={"gray.50"}>
              <Heading fontSize={32}>Laporan</Heading>
              <Text fontSize={18} mt={4} color={"gray"}>
                Laporan aktivitas untuk memantau proses belajar menjadi lebih
                terukur.
              </Text>
            </Card>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

const ContactSection = () => {
  return (
    <Box
      id="contact"
      backgroundImage={"/images/vector_2.png"}
      bgRepeat={"no-repeat"}
      bgPosition={"top"}
      backgroundSize={"contain"}
      py={"240px"}
    >
      <Box
        display={"flex"}
        flexDir={{ base: "column", md: "row" }}
        justifyContent={"center"}
        gap={8}
        alignItems={"center"}
      >
        <Box>
          <Image src="/images/logo_with_text.png" alt="logo" />
        </Box>
        <Box>
          <Heading color={"blue"}>KONTAK KAMI</Heading>
          <Text color={"blue"}>Jl. Semarang No.5, Sumbersari</Text>
          <Text color={"blue"}>Lowokwaru, Malang</Text>
          <Text color={"blue"}>Telp. (0341) 551312</Text>
        </Box>
      </Box>
      <Text position={"absolute"} textAlign={"center"} bottom={10} w={"100%"}>
        © 2024 Proof Master - Universitas Negeri Malang. All Right Reserved.
      </Text>
    </Box>
  );
};
