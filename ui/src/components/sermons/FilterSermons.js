import React, {useState, useEffect} from "react";
import {Stack, 
        Text,
        Button,
        Box,
        Select,
        Link,
        LinkOverlay,
				Container,
} from "@chakra-ui/react";

const FilterSermon = ({allSermons, filterSermon, clearFilter, onClose}) =>{

	const uniqueSpeaker = [...new Set(allSermons.map((sermon)=>{if(sermon.speaker[0]!= null) return sermon.speaker[0].name}))]
  const uniqueSermonSeries = [...new Set(allSermons.map((sermon)=>{if(sermon.sermonSeries[0] != null) return sermon.sermonSeries[0].name}))]
  const uniqueBook = [...new Set(allSermons.map((sermon) => {if(!isNaN(sermon.passage[0])){return sermon.passage.split(" ").slice(0,2).join(" ");}
                                                          else if(sermon.passage=="") {return null;}
                                                          else {return sermon.passage.split(" ").slice(0,1).join(" ");}
                                                         }))]
  const uniqueServiceType = [...new Set(allSermons.map((sermon)=>{if(sermon.serviceType[0] != null) return sermon.serviceType[0].name}))]
                                                         
  useEffect(() => {
    
  }, []);                                                   

  return(
    <>
			<Container maxW="container.lg">
				<Stack spacing={{base:"6", md:"auto"}} alignItems="left" direction={{base:"column", md:"row"}}>
					<Stack alignItems="left">
						<Text color="#0628A3" fontWeight="bold">
							Speaker
						</Text>
						<Select style={{overflowY:"scroll"}} name="speaker" onChange={filterSermon}>
							<option value="">Select Speaker</option>
							{uniqueSpeaker.length > 0 &&
								uniqueSpeaker.map((speaker, i) => {
									if(speaker != null) return <option key={i} value={speaker}>{speaker}</option>
							})}
							</Select>
					</Stack>
					<Stack alignItems="left">
						<Text color="#0628A3" fontWeight="bold">
							Sermon Series
						</Text>
						<Select style={{overflowY:"scroll"}} name="sermon" onChange={filterSermon}>
							<option value="">Select Sermon Series</option>
								{uniqueSermonSeries.length > 0 &&
									uniqueSermonSeries.map((sermonSeries, i) => {
										if(sermonSeries != null) return <option key={i} value={sermonSeries}>{sermonSeries}</option>
								})}
						</Select>
					</Stack>
					<Stack alignItems="left">
						<Text color="#0628A3" fontWeight="bold">
							Book
						</Text>
						<Select style={{overflowY:"scroll"}} name="book" onChange={filterSermon}>
							<option value="">Select Book</option>
								{uniqueBook.length > 0 &&
									uniqueBook.map((book, i)=>{
										if(book != null) return (<option key={i} value={book} >{book}</option>)
								})}
						</Select>
					</Stack>
					<Stack alignItems="left">
						<Text color="#0628A3" fontWeight="bold">
							Service Type
						</Text>
						<Select style={{overflowY:"scroll"}} name="service" onChange={filterSermon}>
							<option value="">Select Service Type</option>
							{uniqueServiceType.length > 0 &&
								uniqueServiceType.map((service, i)=>{
									if(service != null) return <option key={i} value={service} >{service}</option>
								})}
						</Select>
					</Stack>
				</Stack>
				<Stack direction="row" spacing="auto" marginTop="75px" display={{base:"flex", md:"none"}}>
					<Button onClick={clearFilter} width="35vw" background="transparent" border= "1px solid #000000" boxSizing= "border-box" backdropFilter= "blur(6px)" borderRadius= "10px">
						Clear Filter
					</Button>
					<Button onClick={onClose} width="35vw" backgroundColor="#0628A3" color="white" borderRadius="10px">
						Done
					</Button>
				</Stack>
			</Container>
    </>
  )
}

export default FilterSermon;