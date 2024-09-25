import { Card, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";

const TableLoader = () => {
  return (
    <Card padding={4} background={"white"}>
      <Stack>
        <Skeleton height="40px" width={200} />
        <Skeleton height="20px" width={100} />
        <Skeleton height="40px" my={10} />
        <SkeletonText mb={4} />
        <SkeletonText mb={4} />
        <SkeletonText mb={4} />
        <Skeleton height="20px" width={100} alignSelf={"end"} />
      </Stack>
    </Card>
  );
};

export default TableLoader;
