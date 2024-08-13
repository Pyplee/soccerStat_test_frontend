import React, { Suspense } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import CustomSpinner from '../components/CustomSpinner';
import ErrorBlock from '../components/ErrorBlock';
import Pagination from '../components/Pagination';
import { getTotalPages, paginate } from '../scripts/pagination';
import { useSearchParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import DateBlock from '../components/DateBlock';
import StatsCard from '../components/statsCard/index';
import getResultStatGoals from '../scripts/resultStatGoals';
import getStatus from '../scripts/getStatus';
import { useGetMatchesCompetitionWithDate } from '../scripts/getFetchData';

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
function CompetitionsInfoComponent() {
  const [dateStart, setDateStart] = React.useState<string>('');
  const [dateEnd, setDateEnd] = React.useState<string>('');
  const [currentPage, setCurrentPage] = React.useState(1);

  const [errorDate, setErrorDate] = React.useState<{
    errordate1: boolean;
    errordate2: boolean;
  }>({ errordate1: false, errordate2: false });

  const [searchParams] = useSearchParams();
  const id = searchParams?.get('id');

  const { data, name, loading, error } = useGetMatchesCompetitionWithDate(
    id ? id : null,
    dateStart,
    dateEnd,
  );

  const matches = data ? data : [];

  if (error !== null) {
    return <ErrorBlock code={error.code} message={error.message} />;
  }

  if (loading) {
    return <CustomSpinner />;
  }

  const arrProps = [
    {
      name: 'Лиги',
      link: '/competitions',
    },
    {
      name: name as string,
      link: `#`,
    },
  ];
  const itemsOnPageArr = paginate(matches as Match[], currentPage);

  if (!itemsOnPageArr.length) {
    return (
      <Box w="90%">
        <Breadcrumb breadcrumbInfo={arrProps} />
        <Text
          color={'black'}
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
          <Text color={'gray.500'} as="h2" size="xl" mt={6} mb={2}>
            По вашему запросу ничего не найдено. Попробуйте изменить запрос.
          </Text>
        </Flex>
      </Box>
    );
  }

  const resultStatGoalsArr = itemsOnPageArr.map((item: Match) => {
    return getResultStatGoals(
      item.score.fullTime.home,
      item.score.fullTime.away,
      item.score.halfTime.home,
      item.score.halfTime.away,
    );
  });
  const totalPages = getTotalPages(matches as Match[]);

  return (
    <Box w="90%">
      <Breadcrumb breadcrumbInfo={arrProps} />
      <Text
        color={'black'}
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
        direction={{ base: 'column', md: 'column' }}
        minW="100%"
      >
        {itemsOnPageArr.map((item: Match, index: number) => (
          <StatsCard
            key={item.id}
            dateAndTime={item.utcDate}
            commandA={item.homeTeam.name}
            commandB={item.awayTeam.name}
            status={getStatus(item.status)}
            resultGoals={resultStatGoalsArr[index]}
          />
        ))}
      </Flex>
      <Flex align="center" justify="center" p={10}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Flex>
    </Box>
  );
}

export default function MainComponent() {
  return (
    <Suspense>
      <CompetitionsInfoComponent />
    </Suspense>
  );
}
