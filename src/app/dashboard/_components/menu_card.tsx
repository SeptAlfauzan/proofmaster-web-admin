"use client";
import { Box, Button, Card, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { MdArrowRightAlt } from "react-icons/md";

type MenuCardProps = {
  title: string;
  total: number;
  link: string;
  label: string;
};
const MenuCard: React.FC<MenuCardProps> = ({ title, total, link, label }) => {
  const router = useRouter();
  return (
    <Card
      padding={4}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"space-between"}
    >
      <Heading fontSize={24}>{title}</Heading>
      <Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Heading fontSize={52} color={"blue"}>
            {total}
          </Heading>
          <Text alignSelf={"flex-end"}>{label}</Text>
        </Box>
        <Button
          rightIcon={<MdArrowRightAlt />}
          mt={4}
          onClick={() => router.push(link)}
        >
          See more
        </Button>
      </Box>
    </Card>
  );
};

export default MenuCard;
