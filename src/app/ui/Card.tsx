"use client";

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Link,
} from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";

export default function Card({
  id,
  name,
  country,
  urlEmblem,
}: {
  id: number;
  name: string;
  country: string;
  urlEmblem: string;
}): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const currentPageNavigation = pathname.split("/")[1] ?? "";
  return (
    <Center pt={12}>
      <Link
        href={`${currentPageNavigation}/info?id=${id}`}
        onClick={(e) => {
          e.preventDefault();
          router.push(`${currentPageNavigation}/info?id=${id}`);
        }}
        style={{ textDecoration: "none" }}
        _hover={{ textDecoration: "none" }}
        w="full"
        h="full"
      >
        <Box
          role={"group"}
          p={6}
          maxW={"330px"}
          minW={"130px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
          _hover={{
            cursor: "pointer",
            transform: "scale(1.05)",
            transition: "0.3s",
          }}
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
            <Heading
              fontSize={"2xl"}
              fontFamily={"body"}
              fontWeight={500}
              minHeight={"3.0em"}
              lineHeight={"1.2em"}
              textAlign={"center"}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                wordBreak: "break-word",
              }}
            >
              {name}
            </Heading>
            <Text
              color={"gray.500"}
              fontSize={"sm"}
              textTransform={"uppercase"}
            >
              {country}
            </Text>
          </Stack>
        </Box>
      </Link>
    </Center>
  );
}
