"use client";
import Card from "../ui/card";
import React from "react";
import useStore from "../store";
import { Grid, Box, Flex, Text } from "@chakra-ui/react";
import InputSearch from "../ui/inputSearch";
import CustomSpinner from "../ui/customSpinner";
import ErrorBlock from "../ui/errorBlock";
import Pagination from "../ui/pagination";
import { getTotalPages, paginate } from "../pagination";
import { api, routes } from "../route";

interface ErrorData {
  code: string;
  message: string;
}

interface Area {
  id: number;
  name: string;
}

interface Competition {
  id: number;
  name: string;
  emblemUrl: string | null;
  area: Area;
}

export default function MainComponent() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setError] = React.useState<null | ErrorData>(null);

  const competitions = useStore((state) => state.competitions);
  const setCompetitions = useStore((state) => state.setCompetitions);

  const [searchCard, setSearchCard] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    const fetchCompetitions = async () => {
      api
        .get(routes.competitions())
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.data.code, response.data.message);
          }
          const data = response.data.competitions;
          setCompetitions(data);
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

    fetchCompetitions();
  }, []);

  function filterItems(array: Competition[], value: string): Competition[] {
    if (value === "") {
      return array;
    }
    return array.filter((item) => {
      return item.name.toLowerCase().includes(value.toLowerCase());
    });
  }

  const filteredArr = filterItems(competitions, searchCard);
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
        {itemsOnPageArr.map((item: Competition) => (
          <Card
            key={item.id}
            name={item.name}
            country={item.area.name ?? ""}
            urlEmblem={item.emblemUrl ?? ""}
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
