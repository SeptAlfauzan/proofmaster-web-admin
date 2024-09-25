"use client";

import { fetcher } from "@/utils/fetcher";
import {
  Card,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import useSWR from "swr";
import { DashboardStats } from "../domain/dto/dashboard_stats";
import HandleError from "./_components/handle_error";
import MenuCard from "./_components/menu_card";

const Page = () => {
  const { data, isLoading, mutate, error } = useSWR<DashboardStats>(
    "/api/stats",
    fetcher
  );
  if (isLoading) return <Loader />;
  if (error) return <HandleError error={error} onRefresh={() => mutate()} />;
  if (data == undefined)
    return (
      <HandleError error={"No data from server!"} onRefresh={() => mutate()} />
    );

  return (
    <SimpleGrid columns={{ lg: 4, md: 2, base: 1 }} spacing={4}>
      {data.data.map((item, key) => (
        <MenuCard
          key={key}
          title={item.title}
          total={item.total}
          link={item.link}
          label={item.label}
        />
      ))}
    </SimpleGrid>
  );
};

const Loader = () => {
  return (
    <SimpleGrid columns={{ lg: 4, md: 2, base: 1 }} spacing={4}>
      <Card padding={4}>
        <Stack>
          <Skeleton height="20px" />
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Stack>
      </Card>
      <Card padding={4}>
        <Stack>
          <Skeleton height="20px" />
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Stack>
      </Card>
    </SimpleGrid>
  );
};

export default Page;
