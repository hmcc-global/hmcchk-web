import { useEffect, useState } from "react";
import { customAxios as axios } from "../helpers/customAxios";
import { Box, Button, Grid, Container, Heading } from "@chakra-ui/react";
import Pagination from "../helpers/Pagination";
import SermonCardList from "./SermonCardList";
import CurrentSermon from "./CurrentSermon";

const SermonContainer = (props) => {
  const [sermons, setSermons] = useState([]);

  useEffect(() => {
    getData();
    const id = props.match.params;
    if (id != null) {
      // call function to open sermoncard
    }
  }, []);

  const getData = async () => {
    try {
      const { data, status } = await axios.get("/api/sermons/get-sermons");
      if (status === 200) {
        setSermons([...data]);
      } else {
        throw Error("Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //pagination section
  const indexOfLastSermon = currentPage * sermonsPerPage;
  const indexOfFirstSermon = indexOfLastSermon - sermonsPerPage;
  const currentSermons = sermons.slice(indexOfFirstSermon, indexOfLastSermon);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log(sermons);
  return (
    <Container maxW="container.lg">
      <Box
        marginTop="20px"
        borderWidth="1px"
        borderRadius="20"
        bgImage={`url('${process.env.PUBLIC_URL}/images/sermons-banner.png')`}
        bgPosition="center"
        bgSize="cover"
        flex={1}
        textAlign="center"
        justifyContent="center"
        px={[8, 10]}
        py={[8, 12]}
        m={2}
        display={{ base: "none", md: "flex" }}
      >
        <Heading size="2xl" color="white" fontWeight="900">
          Sermons
        </Heading>
      </Box>
      <Heading
        size="2xl"
        color="black"
        justifyContent="center"
        fontWeight="900"
        display={{ base: "flex", md: "none" }}
      >
        Sermons
      </Heading>
      <CurrentSermon currentSermon={sermons[0]} />
      <SermonCardList allSermons={sermons} />
    </Container>
  );
};

export default SermonContainer;
