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
import getResultStatGoals from '../scripts/getResultStatGoals';
import { useGetMatchesCompetitionWithDate } from '../hooks';
import { IMatch } from '../interfaces/IMatch';
import { useTranslation } from 'react-i18next';

function CompetitionsInfoComponent() {
  const [dateStart, setDateStart] = React.useState<string>('');
  const [dateEnd, setDateEnd] = React.useState<string>('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const { t } = useTranslation();

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
      name: t('info.breadcrumbs.leagues'),
      link: '/competitions',
    },
    {
      name: name as string,
      link: `#`,
    },
  ];
  const itemsOnPageArr = paginate(matches as IMatch[], currentPage);

  if (!itemsOnPageArr.length) {
    return (
      <Box w="90%">
        <Breadcrumb breadcrumbInfo={arrProps} />
        <Text as="h1" size="xl" fontSize="2xl" fontWeight="bold" mt={6} mb={2}>
          {t('info.title')}
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
            {t('error.filterNotFound')}
          </Text>
        </Flex>
      </Box>
    );
  }

  const resultStatGoalsArr = itemsOnPageArr.map((item: IMatch) => {
    const result = getResultStatGoals(
      item.score.fullTime.home,
      item.score.fullTime.away,
      item.score.halfTime.home,
      item.score.halfTime.away,
    );
    if (result === null) {
      return t('info.statuses.noResult');
    }
    return result;
  });
  const totalPages = getTotalPages(matches as IMatch[]);

  return (
    <Box w="90%">
      <Breadcrumb breadcrumbInfo={arrProps} />
      <Text as="h1" size="xl" fontSize="2xl" fontWeight="bold" mt={6} mb={2}>
        {t('info.title')}
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
        {itemsOnPageArr.map((item: IMatch, index: number) => (
          <StatsCard
            key={item.id}
            dateAndTime={item.utcDate}
            commandA={item.homeTeam.name}
            commandB={item.awayTeam.name}
            status={item.status}
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
