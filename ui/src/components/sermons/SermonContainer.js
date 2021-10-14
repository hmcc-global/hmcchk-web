import { useEffect, useState } from "react";
import { customAxios as axios } from "../helpers/customAxios";
import { Box, Button, Grid, Container, Heading } from "@chakra-ui/react";
import Pagination from "../helpers/Pagination";
import SermonCardList from "./SermonCardList";
import CurrentSermon from "./CurrentSermon";

const SermonContainer = (props) => {
  const [sermons, setSermons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sermonsPerPage, setSermonsPerPage] = useState(8);

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
      <Heading
        as="h2"
        mb="2"
        size="2xl"
        pt="20"
        fontWeight="900"
        textAlign="center"
      >
        Sermons
      </Heading>
      <CurrentSermon currentSermon={sermons[0]} />
      <SermonCardList allSermons={sermons} sermons={currentSermons} />
      <Pagination
        itemsPerPage={sermonsPerPage}
        totalItems={sermons.length}
        paginate={paginate}
      />
    </Container>
  );
};

export default SermonContainer;
