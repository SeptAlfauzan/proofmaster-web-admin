"use client";
import {
  Avatar,
  Box,
  Heading,
  IconButton,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export type DataItem = {
  [key: string]: string | number;
};

type Props<T extends DataItem> = {
  data: T[];
  searchBy: string;
  title: string;
  desc: string | undefined;
  actionComponent?: React.ReactNode | undefined;
  recordActionComponents: (itemId: string) => React.ReactNode;
};

const DataTable = <T extends DataItem>({
  data,
  searchBy,
  title,
  desc,
  recordActionComponents,
  actionComponent: actionWidget,
}: Props<T>) => {
  const [headers, setHeaders] = useState<string[]>([]);
  const [tempData, setTempData] = useState<T[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  useEffect(() => {
    if (data.length > 0) {
      setTempData(data);
      setHeaders(Object.keys(data[0]));
    }
  }, [data]);

  useEffect(() => {
    if (search !== "") {
      const filtered = data.filter((item) =>
        item[searchBy].toString().toLowerCase().includes(search.toLowerCase())
      );
      setTempData(filtered);
      setCurrentPage(1);
    } else {
      setTempData(data);
    }
  }, [data, search, searchBy]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tempData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(tempData.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <Box>
      <Box
        display="flex"
        flexDir={{ base: "column", md: "row" }}
        gap={4}
        mb={10}
      >
        <Box flex={1}>
          <Heading>{title}</Heading>
          <Text>{desc}</Text>
        </Box>
        <Input
          width={{ md: 228, base: "100%" }}
          placeholder={`Search by ${searchBy}`}
          onChange={(e) => setSearch(e.target.value)}
        />
        {actionWidget}
      </Box>
      <TableContainer>
        <Box overflowX={"scroll"} overflowWrap={"anywhere"}>
          <Table size="sm">
            <Thead background="gray.100">
              <Tr>
                {headers.map((header, index) => (
                  <Th key={index} alignItems="center" p={4}>
                    {/* <IconButton mr={4} icon={<MdArrowDownward />} aria-label="" /> */}
                    <Text textAlign="center">
                      {header == "photo_url" ? "Avatar" : header}
                    </Text>
                  </Th>
                ))}
                <Th>
                  <Text key={"actions-header"} textAlign="right">
                    Actions
                  </Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentItems.map((item, key) => (
                <Tr key={key}>
                  {headers.map((header, index) =>
                    header == "photo_url" ? (
                      <center key={index}>
                        <Avatar
                          background={"gray.100"}
                          padding={1}
                          src={item[header].toString()}
                          m={2}
                          left={0}
                          right={0}
                        />
                      </center>
                    ) : (
                      <Td key={index}>{item[header]}</Td>
                    )
                  )}
                  <Td>
                    <Box display={"flex"} gap={2} justifyContent={"end"}>
                      {recordActionComponents(item["id"].toString())}
                    </Box>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </TableContainer>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
      >
        <Text color="gray">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, tempData.length)} of {tempData.length}{" "}
          entries
        </Text>
        <Box>
          <IconButton
            icon={<MdChevronLeft />}
            aria-label="Previous page"
            onClick={() => handlePageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
            mr={2}
          />
          <Text as="span" mx={2}>
            Page {currentPage} of {totalPages}
          </Text>
          <IconButton
            icon={<MdChevronRight />}
            aria-label="Next page"
            onClick={() => handlePageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages}
            ml={2}
          />
        </Box>
        <Select
          width="auto"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          ml={4}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </Select>
      </Box>
    </Box>
  );
};

export default DataTable;
