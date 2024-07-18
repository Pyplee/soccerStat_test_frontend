"use client";
import React, { Suspense } from "react";
import useStore from "../../store";
import { Box, Flex, Text } from "@chakra-ui/react";
import CustomSpinner from "../../ui/CustomSpinner";
import ErrorBlock from "../../ui/ErrorBlock";
import Pagination from "../../ui/Pagination";
import { getTotalPages, paginate } from "../../scripts/pagination";
import { api, routes } from "../../scripts/apiRoutes";
import { useSearchParams } from "next/navigation";
import Breadcrumb from "../../ui/Breadcrumb";
import DateBlock from "../../ui/DateBlock";
import StatsCard from "../../ui/StatsCard";
import getResultStatGoals from "../../scripts/resultStatGoals";
import getStatus from "../../getStatus";

interface ErrorData {
  code: string;
  message: string;
}

interface Match {
  id: number;
  name: string;
  emblem: string | null;
  utcDate: string;
  status: string;
  homeTeam: {
    name: string;
  };
  awayTeam: {
    name: string;
  };
  score: {
    winner: string | null;
    duration: string;
    fullTime: {
      home: number | null;
      away: number | null;
    };
    halfTime: {
      home: number | null;
      away: number | null;
    };
  };
}
function CommandsInfoComponent() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setError] = React.useState<null | ErrorData>(null);
  const [name, setName] = React.useState("");
  const [dateStart, setDateStart] = React.useState<string>("");
  const [dateEnd, setDateEnd] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [errorDate, setErrorDate] = React.useState<{
    errordate1: boolean;
    errordate2: boolean;
  }>({ errordate1: false, errordate2: false });

  const matches = useStore((state) => state.matches);
  const setMatches = useStore((state) => state.setMatches);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  React.useEffect(() => {
    let pathResponse = routes.commandIdMatches(id);
    if (dateStart !== "" && dateEnd !== "") {
      pathResponse = routes.commandIdDate(id, dateStart, dateEnd);
    }
    const fetchMatches = async () => {
      api
        .get(pathResponse)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.data.code, response.data.message);
          }
          const data = response.data.matches;
          api.get(routes.commandId(id)).then((response) => {
            const name = response.data.name;
            setName(name);
          });
          setMatches(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          const errorData: ErrorData = {
            code: error.response.status ?? error.code,
            message: error.message,
          };
          setError((prevState) => ({ ...prevState, ...errorData }));
        });
    };
    if (errorDate.errordate1 === false && errorDate.errordate2 === false) {
      fetchMatches();
    }
  }, [dateStart, dateEnd]);

  if (isError !== null) {
    return <ErrorBlock code={isError.code} message={isError.message} />;
  }

  if (isLoading) {
    return <CustomSpinner />;
  }

  const arrProps = [
    {
      name: "Лиги",
      link: "/competitions",
    },
    {
      name: name,
      link: `/competitions/info?id=${id}`,
    },
  ];

  const filteredArr = matches;
  const itemsOnPageArr = paginate(filteredArr, currentPage);

  if (!itemsOnPageArr.length) {
    return (
      <Box w="90%">
        <Breadcrumb breadcrumbInfo={arrProps} />
        <Text
          color={"black"}
          as="h1"
          size="xl"
          fontSize="2xl"
          fontWeight="bold"
          mt={6}
          mb={2}
        >
          Матчи
        </Text>
        <DateBlock
          setDateStart={setDateStart}
          setDateEnd={setDateEnd}
          dateStart={dateStart}
          dateEnd={dateEnd}
          errorDate={errorDate}
          setErrorDate={setErrorDate}
        />
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
      <Breadcrumb breadcrumbInfo={arrProps} />
      <Text
        color={"black"}
        as="h1"
        size="xl"
        fontSize="2xl"
        fontWeight="bold"
        mt={6}
        mb={2}
      >
        Матчи
      </Text>
      <DateBlock
        setDateStart={setDateStart}
        setDateEnd={setDateEnd}
        dateStart={dateStart}
        dateEnd={dateEnd}
        errorDate={errorDate}
        setErrorDate={setErrorDate}
      />
      <Flex
        align="start"
        justify="start"
        p={10}
        direction={{ base: "column", md: "column" }}
        minW="100%"
      >
        {itemsOnPageArr.map((item: Match) => (
          <StatsCard
            key={item.id}
            dateAndTime={item.utcDate}
            commandA={item.homeTeam.name}
            commandB={item.awayTeam.name}
            status={getStatus(item.status)}
            resultStatGoals={getResultStatGoals(
              item.score.fullTime.home,
              item.score.fullTime.away,
              item.score.halfTime.home,
              item.score.halfTime.away,
            )}
          />
        ))}
      </Flex>
      <Flex align="center" justify="center" p={10}>
        <Pagination
          currentPage={currentPage}
          totalPages={getTotalPages(matches)}
          onPageChange={setCurrentPage}
        />
      </Flex>
    </Box>
  );
}

export default function MainComponent() {
  return (
    <Suspense>
      <CommandsInfoComponent />
    </Suspense>
  );
}
