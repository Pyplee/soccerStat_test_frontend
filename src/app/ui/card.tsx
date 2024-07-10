"use client";

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";

export default function Card({
  nameLiga,
  country,
  urlEmblem,
}: {
  nameLiga: string;
  country: string;
  urlEmblem: string;
}): JSX.Element {
  return (
    <Center pt={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-2}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "relative",
            top: 5,
            left: 0,
            backgroundImage: `url(${urlEmblem})`,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"contain"}
            src={urlEmblem}
            fallbackSrc="/ball.svg"
            alt="#"
          />
        </Box>
        <Stack pt={5} align={"center"}>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {nameLiga}
          </Heading>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            {country}
          </Text>
        </Stack>
      </Box>
    </Center>
  );
}
