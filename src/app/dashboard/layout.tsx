"use client";
import { Box, List, ListItem, Text, Icon, Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdAutoGraph,
  MdDashboard,
  MdFileOpen,
  MdLogout,
  MdPersonAddAlt,
  MdPersonAddAlt1,
} from "react-icons/md";

interface LinkItem {
  href: string;
  icon: React.ReactNode;
  text: string;
}

const links: LinkItem[] = [
  {
    href: "/dashboard",
    icon: <MdDashboard />,
    text: "Dashboard",
  },
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
  {
    href: "/dashboard/activity",
    icon: <MdAutoGraph />,
    text: "Acitivy",
  },
  {
    href: "/dashboard/learning-materials",
    icon: <MdFileOpen />,
    text: "Learning materials",
  },
];

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Box display={"flex"}>
      <Box height={"100vh"}>
        <List padding={"20px"}>
          <Box mb={"80px"}>
            <Image
              src={"/images/logo_with_text.png"}
              alt={"logo"}
              width="208"
              height="64"
            />
          </Box>
          {links.map((item, key) => (
            <ListItem
              mb={"40px"}
              key={key}
              display="flex"
              role="group"
              padding={2}
              rounded={"lg"}
              background={
                key == 0
                  ? pathname == item.href
                    ? "blue"
                    : undefined
                  : pathname.includes(item.href)
                  ? "blue"
                  : undefined
              }
              _hover={{ background: "blue" }}
            >
              <Link href={item.href}>
                <Box
                  gap={4}
                  display="flex"
                  alignItems={"center"}
                  justifyContent={"center"}
                  color={"gray.400"}
                >
                  <Icon
                    fontSize={24}
                    _groupHover={{ color: "white" }}
                    color={
                      key == 0
                        ? pathname == item.href
                          ? "white"
                          : undefined
                        : pathname.includes(item.href)
                        ? "white"
                        : undefined
                    }
                  >
                    {item.icon}
                  </Icon>
                  <Text
                    _groupHover={{ color: "white" }}
                    color={
                      key == 0
                        ? pathname == item.href
                          ? "white"
                          : undefined
                        : pathname.includes(item.href)
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
            width={"100%"}
            mb={"40px"}
            display="flex"
            role="group"
            padding={2}
            rounded={"lg"}
            _hover={{ background: "blue" }}
          >
            <Box
              gap={4}
              display="flex"
              alignItems={"center"}
              justifyContent={"center"}
              color={"gray.400"}
            >
              <Icon fontSize={24} _groupHover={{ color: "white" }}>
                <MdLogout />
              </Icon>
              <Text _groupHover={{ color: "white" }}>Logout</Text>
            </Box>
          </Button>
        </List>
      </Box>
      <Box
        background={"#F1F4FF"}
        flex={1}
        paddingTop={"80px"}
        paddingX={"16px"}
      >
        {children}
      </Box>
    </Box>
  );
}
