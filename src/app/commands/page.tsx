"use client";
import Card from "@/app/ui/Card";
import React, { useEffect } from "react";
import useStore from "@/app/store";
import { Grid, Box, Flex, Text } from "@chakra-ui/react";
import InputSearch from "@/app/ui/InputSearch";
import CustomSpinner from "@/app/ui/CustomSpinner";
import ErrorBlock from "@/app/ui/ErrorBlock";
import Pagination from "@/app/ui/Pagination";
import { getTotalPages, paginate } from "@/app/scripts/pagination";
import { useGetCommands } from "@/app/scripts/getFetchData";

interface ErrorData {
  code: string | null;
  message: string | null;
}

interface Team {
  id: number;
  name: string;
  crest: string | null;
}

export default function CommandsComponent() {
  const [isLoading, setLoading] = React.useState(true);
  const [isError, setError] = React.useState<null | ErrorData>(null);

  const teams = useStore((state) => state.teams);
  const setTeams = useStore((state) => state.setTeams);

  const [searchCard, setSearchCard] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data, loading, error } = useGetCommands();

  useEffect(() => {
    setLoading(loading);
    if (error) {
      setError(error);
    } else if (data) {
      setTeams(data);
    }
  }, [data, error]);

  function filterItems(array: Team[], value: string): Team[] {
    if (value === "") {
      return array;
    }
    return array.filter((item) => {
      return item.name.toLowerCase().includes(value.toLowerCase());
    });
  }

  const filteredArr = filterItems(teams as Team[], searchCard);
  const itemsOnPageArr = paginate(filteredArr, currentPage);

  const inputSearchChange = (value: string) => {
    setSearchCard(value);
  };

  if (isError !== null) {
    return <ErrorBlock code={isError.code} message={isError.message} />;
  }

  if (isLoading) {
    return <CustomSpinner />;
  }

  if (!itemsOnPageArr.length) {
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
        {itemsOnPageArr.map((item: Team) => (
          <Card
            key={item.id}
            id={item.id}
            name={item.name}
            country={""}
            urlEmblem={item.crest ?? ""}
          />
        ))}
      </Grid>
      <Flex align="center" justify="center" p={10}>
        <Pagination
          currentPage={currentPage}
          totalPages={getTotalPages(filteredArr)}
          onPageChange={setCurrentPage}
        />
      </Flex>
    </Box>
  );
}
