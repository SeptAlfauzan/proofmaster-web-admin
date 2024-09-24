import DataTable from "@/app/components/data_table";
import { Button, Card } from "@chakra-ui/react";

const Page = () => {
  return (
    <Card padding={4}>
      <DataTable
        actionWidget={<Button ml={4}>Add teacher</Button>}
        searchBy="name"
        title="Teacher User"
        desc="List teacher user data"
        data={[
          {
            id: "nQnrJsWDRAYvvOlcUDEYaivvTim1",
            name: "Student",
          },
          {
            id: "h4ghJFY9gFPnqHJcqcLWoV0VFPs2",
            name: "Student",
          },
          {
            id: "CZaP2Ved7ReKAmxLAm4VdpUHjkz2",
            name: "Student",
          },
          {
            id: "PkPLzb6QeFTOJKrmnb1AqxxRPtH2",
            name: "Student",
          },
          {
            id: "bFNh872Hs2bNEHEQOqgmy4L5Z7S2",
            name: "Student",
          },
          {
            id: "zXXayNlHkFezeW4TgVs3KSUIxnw1",
            name: "ucup@dev.com",
          },
          {
            id: "ECVp8tudDUNpRl3Twm7HawtCQt33",
            name: "user12",
          },
          {
            id: "d3XZe3so1INbDBKAb8wlNNV0try2",
            name: "student2@dev.com",
          },
          {
            id: "uXluJzPkzHWjY5XALM1g3ofm5yb2",
            name: "lolot",
          },
          {
            id: "Ek7A7XKKi4Y0sKU0JH00smU3qdx2",
            name: "user12",
          },
          {
            id: "AIjNYLNvqvZyqvwqICY9npUUcYn2",
            name: "lathiful",
          },
          {
            id: "G6WsR0BbYThomiEw3hNhSJCzelp2",
            name: "tomi",
          },
          {
            id: "QJVgsIMjuLWDeMbcoiST2oKa6uK2",
            name: "asdasd.asd@dmail.com",
          },
          {
            id: "LLSFimT8RaZYgGjpKe7ZFa4bocv2",
            name: "septa@dev.com",
          },
          {
            id: "xIVtST6fU6Wdo3vbPpv6alHu9JK2",
            name: "labubu@dev.com",
          },
          {
            id: "Br4bTmtmGBOaYAMyL9QdgHgNCyP2",
            name: "ragil@dev.com",
          },
          {
            id: "syLg5cPCK4POYNhuyOivNXoZR8h1",
            name: "ragilg@dev.com",
          },
        ]}
      />
    </Card>
  );
};
export default Page;
