"use client";
import React from "react";
import useStore from "../../store";
import { Grid, Box, Flex, Text } from "@chakra-ui/react";
import CustomSpinner from "../../ui/CustomSpinner";
import ErrorBlock from "../../ui/ErrorBlock";
import Pagination from "../../ui/Pagination";
import { getTotalPages, paginate } from "../../pagination";
import { api, routes } from "../../route";
import { useSearchParams } from "next/navigation";
import Breadcrumb from "../../ui/Breadcrumb";
import DateBlock from "../../ui/DateBlock";
import StatsCard from "../../ui/StatsCard";
import getResultStatGoals from "../../resultStatGoals";
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
export default function CompetitionsInfoComponent() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setError] = React.useState<null | ErrorData>(null);
  const [name, setName] = React.useState("");
  const [dateStart, setDateStart] = React.useState<string>("");
  const [dateEnd, setDateEnd] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [errorDate, setErrorDate] = React.useState("");

  const matches = useStore((state) => state.matches);
  const setMatches = useStore((state) => state.setMatches);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  React.useEffect(() => {
    let pathResponse = routes.competitionIdMatches(id);
    if (dateStart !== "" && dateEnd !== "") {
      pathResponse = routes.competitionIdDate(id, dateStart, dateEnd);
    }
    const fetchMatches = async () => {
      api
        .get(pathResponse)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.data.code, response.data.message);
          }
          const data = response.data.matches;
          const name = response.data.competition.name;
          setName(name);
          setMatches(data);
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
    if (errorDate === "") {
      fetchMatches();
    }
  }, [dateStart, dateEnd]);

  if (isError !== null) {
    return (
      <ErrorBlock codeError={isError.code} messageError={isError.message} />
    );
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

// // Получение часового пояса пользователя
// const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// // Пример даты в формате ISO
// const isoDate = '2023-10-01T12:00:00Z';

// // Преобразование даты из UTC в часовой пояс пользователя
// const zonedDate = utcToZonedTime(isoDate, userTimeZone);

// // Форматирование даты в нужный формат
// const formattedDate = format(zonedDate, 'dd.MM.yyyy HH:mm:ssXXX', { timeZone: userTimeZone });

// console.log(formattedDate); // Например, "01.10.2023 15:00:00+03:00"

// // Преобразование даты из часового пояса пользователя обратно в UTC
// const utcDate = zonedTimeToUtc(zonedDate, userTimeZone);

// console.log(utcDate.toISOString()); // "2023-10-01T12:00:00.000Z"
