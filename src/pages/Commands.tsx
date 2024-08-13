import Card from '../components/Card';
import React from 'react';
import { Grid, Box, Flex, Text } from '@chakra-ui/react';
import InputSearch from '../components/InputSearch';
import CustomSpinner from '../components/CustomSpinner';
import ErrorBlock from '../components/ErrorBlock';
import Pagination from '../components/Pagination';
import { getTotalPages, paginate } from '../scripts/pagination';
import { useGetCommands } from '../scripts/getFetchData';
import { ICommand } from '../interfaces/ICommand';

export default function CommandsComponent() {
  const [searchCard, setSearchCard] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data, loading, error } = useGetCommands();

  const commands = data;

  if (error !== null) {
    return <ErrorBlock code={error.code} message={error.message} />;
  }

  if (loading) {
    return <CustomSpinner />;
  }

  function filterItems(array: ICommand[], value: string): ICommand[] {
    if (value === '') {
      return array;
    }
    return array.filter((item) => {
      return item.name.toLowerCase().includes(value.toLowerCase());
    });
  }

  const filteredArr = filterItems(commands as ICommand[], searchCard);
  const itemsOnPageArr = paginate(filteredArr, currentPage);

  const inputSearchChange = (value: string) => {
    setSearchCard(value);
  };

  if (!itemsOnPageArr.length) {
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
        {itemsOnPageArr.map((item: ICommand) => (
          <Card
            key={item.id}
            id={item.id}
            name={item.name}
            country={''}
            urlEmblem={item.crest ?? ''}
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
