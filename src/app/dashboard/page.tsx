"use client";
import { fetcher } from "@/utils/fetcher";
import { SimpleGrid, Text } from "@chakra-ui/react";
import useSWR from "swr";
import HandleError from "./_components/handle_error";
import MenuCard from "./_components/menu_card";
import { DashboardStats, Datum } from "../domain/dto/dashboard_stats";

const Page = () => {
  const { data, isLoading, mutate, error } = useSWR<DashboardStats>(
    "/api/stats",
    fetcher
  );
  if (isLoading) return <Text>Loading data...</Text>;
  if (error) return <HandleError error={error} onRefresh={() => mutate()} />;
  if (data == undefined)
    return (
      <HandleError error={"No data from server!"} onRefresh={() => mutate()} />
    );

  return (
    <SimpleGrid columns={4} spacing={4}>
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

export default Page;
