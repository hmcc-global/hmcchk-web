import React, {useState, useEffect} from "react";
import {Grid, 
        Heading, 
        VStack, 
        Text,
        HStack,
        Button,
        Menu,
        MenuButton,
        MenuList,
        MenuItem,
        Icon,
        ChevronDownIcon,
        MenuItemOption,
        MenuIcon,
        MenuCommand,
} from "@chakra-ui/react";
import SermonCard from "./SermonCard";
import axios from "axios";

const SermonCardList = ({sermons, allSermons}, props) => {

  const uniqueSpeaker = [...new Set(allSermons.map((sermon)=>(sermon.speaker[0].name)))]
  const uniqueSermonSeries = [...new Set(allSermons.map((sermon)=>(sermon.sermonSeries[0].name)))]
  //const uniqueServiceType = [...new Set(allSermons.map((sermon)=>(sermon.serviceType[0].name)))]

  return (
    <>
      <Heading>
        Past Sermons
      </Heading>
      <HStack spacing="auto" alignItems="left">
        <VStack>
          <Text>
            Speaker
          </Text>
          <Menu>
            <MenuButton as={Button}>
              Select One
            </MenuButton>
            <MenuList>
              {uniqueSpeaker.length > 0 &&
              uniqueSpeaker.map((speaker, i) => (
                <MenuItem value={speaker}>{speaker}</MenuItem>
              ))}
            </MenuList>
          </Menu>
        </VStack>
        <VStack>
          <Text>
            Sermon Series
          </Text>
          <Menu>
            <MenuButton as={Button}>
              Select One
            </MenuButton>
            <MenuList>
            {uniqueSermonSeries.length > 0 &&
              uniqueSermonSeries.map((sermonSeries, i) => (
                <MenuItem value={sermonSeries}>{sermonSeries}</MenuItem>
              ))}
            </MenuList>
          </Menu>
        </VStack>
        <VStack>
          <Text>
            Book
          </Text>
          <Menu>
            <MenuButton as={Button}>
              Select One
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
            </MenuList>
          </Menu>
        </VStack>
        <VStack>
          <Text>
            Service Type
          </Text>
          <Menu>
            <MenuButton as={Button}>
              Select One
            </MenuButton>
            <MenuList>
            {/* {uniqueServiceType.length > 0 &&
              uniqueServiceType.map((serviceType, i) => (
                <MenuItem value={serviceType}>{serviceType}</MenuItem>
              ))} */}
            </MenuList>
          </Menu>
        </VStack>
      </HStack>
      <Grid
        mt="12"
        mb="12"
        templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        gap={[3, 6]}
      >
        {sermons.length > 0 &&  
          sermons.map((sermon, i) => (
              <SermonCard key={sermon.id} sermonData={sermon} />
          ))}
      </Grid>
      </>
  );
};

export default SermonCardList;
