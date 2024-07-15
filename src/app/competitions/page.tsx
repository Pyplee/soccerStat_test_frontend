"use client";
import Card from "../ui/Card";
import React from "react";
import useStore from "../store";
import { Grid, Box, Flex, Text } from "@chakra-ui/react";
import InputSearch from "../ui/InputSearch";
import CustomSpinner from "../ui/CustomSpinner";
import ErrorBlock from "../ui/ErrorBlock";
import Pagination from "../ui/Pagination";
import { getTotalPages, paginate } from "../scripts/pagination";
import { useGetCompetitions } from "../scripts/getFetchData";

interface ErrorData {
  code: string | null;
  message: string | null;
}

interface Competition {
  id: number;
  name: string;
  emblem: string | null;
  area: {
    id: number;
    name: string;
  };
}

export default function CompetitionsComponent() {
  const [isLoading, setLoading] = React.useState(true);
  const [isError, setError] = React.useState<null | ErrorData>(null);

  const competitions = useStore((state) => state.competitions);
  const setCompetitions = useStore((state) => state.setCompetitions);

  const [searchCard, setSearchCard] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data, loading, error } = useGetCompetitions();

  React.useEffect(() => {
    setLoading(loading);
    if (error) {
      setError(error);
    } else if (data) {
      setCompetitions(data);
    }
  }, [data]);

  function getFilteredItems(
    array: Competition[],
    value: string,
  ): Competition[] {
    if (value === "") {
      return array;
    }
    return array.filter((item) => {
      return item.name.toLowerCase().includes(value.toLowerCase());
    });
  }

  const filteredData = getFilteredItems(competitions, searchCard);
  const itemsOnCurrentPage = paginate(filteredData, currentPage);

  const inputSearchChange = (value: string) => {
    setSearchCard(value);
  };

  if (isError !== null) {
    return <ErrorBlock code={isError.code} message={isError.message} />;
  }

  if (isLoading) {
    return <CustomSpinner />;
  }

  if (!itemsOnCurrentPage.length) {
    return (
      <Box w="90%">
        <InputSearch searchChange={inputSearchChange} />
        <Flex align="center" justify="center" p={10}>
          <Text color={"gray.500"} as="h2" size="xl" mt={6} mb={2}>
            По вашему запросу ничего не найдено. Попробуйте изменить запрос.
          </Text>
        </Flex>
      </Box>
    );
  }

  return (
    <Box w="90%">
      <InputSearch searchChange={inputSearchChange} />
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
        {itemsOnCurrentPage.map((item: Competition) => (
          <Card
            id={item.id}
            key={item.id}
            name={item.name}
            country={item.area.name ?? ""}
            urlEmblem={item.emblem ?? ""}
          />
        ))}
      </Grid>
      <Flex align="center" justify="center" p={10}>
        <Pagination
          currentPage={currentPage}
          totalPages={getTotalPages(filteredData)}
          onPageChange={setCurrentPage}
        />
      </Flex>
    </Box>
  );
}
