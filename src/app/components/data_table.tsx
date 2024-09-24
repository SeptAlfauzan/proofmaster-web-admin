"use client";
import {
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
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdArrowDownward, MdChevronLeft, MdChevronRight } from "react-icons/md";

export type DataItem = {
  [key: string]: string | number;
};

type Props<T extends DataItem> = {
  data: T[];
  searchBy: string;
  title: string;
  desc: string | undefined;
  actionWidget?: React.ReactNode | undefined;
};

const DataTable = <T extends DataItem>({
  data,
  searchBy,
  title,
  desc,
  actionWidget,
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
      <Box display="flex">
        <Box flex={1}>
          <Heading>{title}</Heading>
          <Text mb={8}>{desc}</Text>
        </Box>
        <Input
          width={228}
          placeholder="Search Name"
          onChange={(e) => setSearch(e.target.value)}
        />
        {actionWidget}
      </Box>
      <TableContainer>
        <Table size="sm">
          <Thead background="gray.100">
            <Tr>
              {headers.map((header, index) => (
                <Th key={index} alignItems="center">
                  <IconButton mr={4} icon={<MdArrowDownward />} aria-label="" />
                  {header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((item, key) => (
              <Tr key={key}>
                {headers.map((header, index) => (
                  <Td key={index}>{item[header]}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
            </Tr>
          </Tfoot>
        </Table>
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
