import React, {useState, useEffect} from "react";
import {Grid, 
        Heading, 
        VStack, 
        Text,
        Button,
        Box,
        HStack,
        Select,
} from "@chakra-ui/react";
import Pagination from "../helpers/Pagination";
import SermonCard from "./SermonCard";


const SermonCardList = ({allSermons}, props) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [sermonsPerPage, setSermonsPerPage] = useState(12);
  const [filterSpeaker, setFilterSpeaker] = useState("");
  const [filterSermonSeries, setFilterSermonSeries] = useState("");
  const [filterBook, setFilterBook] = useState("");
  const [filterServiceType, setFilterServiceType] = useState("");

  //filter section
  const uniqueSpeaker = [...new Set(allSermons.map((sermon)=>{if(sermon.speaker[0]!= null) return sermon.speaker[0].name}))]
  const uniqueSermonSeries = [...new Set(allSermons.map((sermon)=>{if(sermon.sermonSeries[0] != null) return sermon.sermonSeries[0].name}))]
  const uniqueBook = [...new Set(allSermons.map((sermon) => {if(!isNaN(sermon.passage[0])){return sermon.passage.split(" ").slice(0,2).join(" ");}
                                                          else if(sermon.passage=="") {return null;}
                                                          else {return sermon.passage.split(" ").slice(0,1).join(" ");}
                                                         }))]
  const uniqueServiceType = [...new Set(allSermons.map((sermon)=>{if(sermon.serviceType[0] != null) return sermon.serviceType[0].name}))]
  const filterSermon = (event) => {
    setCurrentPage(1);
    if(event.target.name == "speaker"){
      setFilterSpeaker(event.target.value);
    }else if(event.target.name == "sermon"){
      setFilterSermonSeries(event.target.value)
    }else if(event.target.name == "book"){
      setFilterBook(event.target.value)
    }else if(event.target.name == "service" ){
      setFilterServiceType(event.target.value)
    }
  }
  const sermons = allSermons.filter(sermon => sermon.speaker[0].name.includes(filterSpeaker))
                            .filter((sermon) => {if(sermon.sermonSeries[0] != null) return sermon.sermonSeries[0].name.includes(filterSermonSeries)})
                            .filter((sermon) => {if(sermon.passage != null) return sermon.passage.includes(filterBook)})
                            .filter((sermon) => {if(sermon.serviceType[0] != null) return sermon.serviceType[0].name.includes(filterServiceType)});
  const clearFilter = () =>{
    setFilterSpeaker("");
    setFilterSermonSeries("");
    setFilterBook("");
    setFilterServiceType("");
  }
   
  //pagination section
  const indexOfLastSermon = currentPage * sermonsPerPage;
  const indexOfFirstSermon = indexOfLastSermon - sermonsPerPage;
  const currentSermons = sermons.slice(indexOfFirstSermon, indexOfLastSermon);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Box>
        <Heading>
          Past Sermons
        </Heading>
        <HStack spacing="auto" alignItems="left">
          <VStack alignItems="left">
            <Text>
              Speaker
            </Text>
            <Select style={{overflowY:"scroll"}} name="speaker" onChange={filterSermon}>
              <option value="">Select Speaker</option>
              {uniqueSpeaker.length > 0 &&
                uniqueSpeaker.map((speaker, i) => {
                  if(speaker != null) return <option value={speaker}>{speaker}</option>
                })}
            </Select>
          </VStack>
          <VStack alignItems="left">
            <Text>
              Sermon Series
            </Text>
              <Select style={{overflowY:"scroll"}} name="sermon" onChange={filterSermon}>
              <option value="">Select Sermon Series</option>
                {uniqueSermonSeries.length > 0 &&
                  uniqueSermonSeries.map((sermonSeries, i) => {
                    if(sermonSeries != null) return <option value={sermonSeries}>{sermonSeries}</option>
                  })}
              </Select>
          </VStack>
          <VStack alignItems="left">
            <Text>
              Book
            </Text>
              <Select style={{overflowY:"scroll"}} name="book" onChange={filterSermon}>
              <option value="">Select Book</option>
                {uniqueBook.length > 0 &&
                  uniqueBook.map((book, i)=>{
                    if(book != null) return (<option value={book} >{book}</option>)
                  })}
              </Select>
          </VStack>
          <VStack alignItems="left">
            <Text>
              Service Type
            </Text>
            <Select style={{overflowY:"scroll"}} name="service" onChange={filterSermon}>
            <option value="">Select Service Type</option>
              {uniqueServiceType.length > 0 &&
                uniqueServiceType.map((service, i)=>{
                  if(service != null) return <option value={service} >{service}</option>
                })}
            </Select>
          </VStack>
        </HStack>
        <Box >
          <Button variant="link" alignSelf={["center", "flex-end"]} onClick={clearFilter}>
            Clear Filter
          </Button>
        </Box>  
        <Grid
          mt="12"
          mb="12"
          templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          gap={[3, 6]}
        >
          {currentSermons.length > 0 &&  
            currentSermons.map((sermon, i) => (
                <SermonCard key={sermon.id} sermonData={sermon} allSermons={sermons}/>
            ))}
        </Grid>
        <Pagination
          itemsPerPage={sermonsPerPage}
          totalItems={sermons.length}
          paginate={paginate}
        />
      </Box>
      </>
  );
};

export default SermonCardList;