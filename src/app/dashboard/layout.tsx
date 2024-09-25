"use client";
import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  IconButton,
  List,
  ListItem,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  MdAutoGraph,
  MdDashboard,
  MdFileOpen,
  MdLogout,
  MdMenu,
  MdPersonAddAlt,
  MdPersonAddAlt1,
} from "react-icons/md";
import { useLogout } from "./_hooks/use_logout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const toast = useToast();

  const pathname = usePathname();
  const router = useRouter();
  const [loading, error, response, submit] = useLogout();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (response) {
    router.replace("/auth");
  }

  if (error)
    toast({
      title: "Error logout!",
      description: error,
      status: "warning",
      duration: 1000,
      isClosable: true,
    });

  const SidebarContent = () => (
    <List padding="20px">
      <Box mb="80px" key="dashboard-logo">
        <Image
          src="/images/logo_with_text.png"
          alt="logo"
          width={208}
          height={64}
        />
      </Box>
      {links.map((item, key) => (
        <ListItem
          mb="40px"
          key={key}
          display="flex"
          role="group"
          padding={2}
          rounded="lg"
          background={
            (key === 0 ? pathname === item.href : pathname.includes(item.href))
              ? "blue"
              : undefined
          }
          _hover={{ background: "blue" }}
        >
          <Link href={item.href}>
            <Box
              gap={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="gray.400"
            >
              <Icon
                fontSize={24}
                _groupHover={{ color: "white" }}
                color={
                  (
                    key === 0
                      ? pathname === item.href
                      : pathname.includes(item.href)
                  )
                    ? "white"
                    : undefined
                }
              >
                {item.icon}
              </Icon>
              <Text
                _groupHover={{ color: "white" }}
                color={
                  (
                    key === 0
                      ? pathname === item.href
                      : pathname.includes(item.href)
                  )
                    ? "white"
                    : undefined
                }
              >
                {item.text}
              </Text>
            </Box>
          </Link>
        </ListItem>
      ))}
      <Button
        key="logout"
        width="100%"
        mb="40px"
        display="flex"
        role="group"
        padding={2}
        rounded="lg"
        _hover={{ background: "blue" }}
        onClick={submit}
      >
        <Box
          gap={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="gray.400"
        >
          <Icon fontSize={24} _groupHover={{ color: "white" }}>
            <MdLogout />
            {loading && <CircularProgress isIndeterminate color="white" />}
          </Icon>
          <Text _groupHover={{ color: "white" }}>Logout</Text>
        </Box>
      </Button>
    </List>
  );

  return (
    <Box display="flex">
      {/* Desktop Sidebar */}
      <Box
        display={{ base: "none", md: "block" }}
        width="250px"
        height="100vh"
        position="fixed"
        background="white"
        shadow="lg"
      >
        <SidebarContent />
      </Box>

      {/* Mobile Sidebar */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <SidebarContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <Box
        flex={1}
        marginLeft={{ base: 0, md: "250px" }}
        background="#F1F4FF"
        minHeight="100vh"
        paddingTop="80px"
        paddingX="16px"
      >
        <IconButton
          aria-label="Open menu"
          icon={<MdMenu />}
          onClick={onOpen}
          display={{ base: "block", md: "none" }}
          position="fixed"
          top={4}
          left={4}
          zIndex={20}
        />
        {children}
      </Box>
    </Box>
  );
}

const links = [
  { href: "/dashboard", icon: <MdDashboard />, text: "Dashboard" },
  {
    href: "/dashboard/teachers",
    icon: <MdPersonAddAlt1 />,
    text: "Teacher user",
  },
  {
    href: "/dashboard/students",
    icon: <MdPersonAddAlt />,
    text: "Students user",
  },
  { href: "/dashboard/activity", icon: <MdAutoGraph />, text: "Activity" },
  {
    href: "/dashboard/learning-materials",
    icon: <MdFileOpen />,
    text: "Learning materials",
  },
];
