"use client";
import Card from "../ui/Card";
import React from "react";
import useStore from "../store";
import { Grid, Box, Flex, Text } from "@chakra-ui/react";
import InputSearch from "../ui/InputSearch";
import CustomSpinner from "../ui/CustomSpinner";
import ErrorBlock from "../ui/ErrorBlock";
import Pagination from "../ui/Pagination";
import { getTotalPages, paginate } from "../pagination";
import { api, routes } from "../route";

interface ErrorData {
  code: string;
  message: string;
}

interface Team {
  id: number;
  name: string;
  crest: string | null;
}

export default function CommandsComponent() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setError] = React.useState<null | ErrorData>(null);

  const teams = useStore((state) => state.teams);
  const setTeams = useStore((state) => state.setTeams);

  const [searchCard, setSearchCard] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    const fetchCompetitions = async () => {
      api
        .get(routes.commands())
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.data.code, response.data.message);
          }
          const data = response.data.teams;
          setTeams(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          const errorData: ErrorData = {
            code: error.code,
            message: error.message,
          };
          setError((prevState) => ({ ...prevState, ...errorData }));
        });
    };

    if (!isError) {
      fetchCompetitions();
    }
  }, []);

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
    return (
      <ErrorBlock codeError={isError.code} messageError={isError.message} />
    );
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
            pageBaseUrl={"commands"}
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
