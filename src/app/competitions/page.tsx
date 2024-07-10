"use client";
import Card from "../ui/card";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import InputSearch from "../ui/competitions/inputSearch";
export default function MyApp() {
  const testLiga = {
    nameLiga: "Liga Profesional",
    country: "Argentina",
    urlEmblem: "https://crests.football-data.org/LPDF.svg",
  };
  const testLiga2 = {
    nameLiga: "A League",
    country: "Australia",
    urlEmblem: "https://crests.football-data.org/a-league.png",
  };
  const testNoImage = {
    nameLiga: "A League test",
    country: "Germany",
    urlEmblem: "https://crests.football-data.org/a-invalid.png",
  };
  return (
    <Box w="90%">
      <InputSearch />
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
        <Card {...testLiga} />
        <Card {...testLiga} />
        <Card {...testLiga2} />
        <Card {...testLiga2} />
        <Card {...testLiga2} />
        <Card {...testLiga2} />
        <Card {...testNoImage} />
      </Grid>
    </Box>
  );
}
