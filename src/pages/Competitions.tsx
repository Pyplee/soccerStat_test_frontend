import Card from '../components/Card';
import React from 'react';
import { Grid, Box, Flex, Text } from '@chakra-ui/react';
import InputSearch from '../components/InputSearch';
import CustomSpinner from '../components/CustomSpinner';
import ErrorBlock from '../components/ErrorBlock';
import Pagination from '../components/Pagination';
import { getTotalPages, paginate } from '../scripts/pagination';
import { useGetCompetitions } from '../hooks';
import { ICompetition } from '../interfaces/ICompetition';

export default function CompetitionsComponent() {
  const [searchCard, setSearchCard] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data, loading, error } = useGetCompetitions();
  const competitions = data ? data : [];

  if (error !== null) {
    return <ErrorBlock code={error.code} message={error.message} />;
  }

  if (loading) {
    return <CustomSpinner />;
  }

  function getFilteredItems(
    array: ICompetition[],
    value: string,
  ): ICompetition[] {
    if (value === '') {
      return array;
    }
    return array.filter((item) => {
      return item.name.toLowerCase().includes(value.toLowerCase());
    });
  }

  const filteredData = getFilteredItems(
    competitions as ICompetition[],
    searchCard,
  );
  const itemsOnCurrentPage = paginate(filteredData, currentPage);

  const inputSearchChange = (value: string) => {
    setSearchCard(value);
  };

  if (!itemsOnCurrentPage.length) {
    return (
      <Box w="90%">
        <InputSearch searchChange={inputSearchChange} />
        <Flex align="center" justify="center" p={10}>
          <Text color={'gray.500'} as="h2" size="xl" mt={6} mb={2}>
            По вашему запросу ничего не найдено. Попробуйте изменить запрос.
          </Text>
        </Flex>
      </Box>
    );
  }

  return (
    <Box w="90%">
      <InputSearch searchChange={inputSearchChange} />
      <Grid
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={6}
        justifyItems={'center'}
      >
        {itemsOnCurrentPage.map((item: ICompetition) => (
          <Card
            id={item.id}
            key={item.id}
            name={item.name}
            country={item.area.name ?? ''}
            urlEmblem={item.emblem ?? ''}
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
