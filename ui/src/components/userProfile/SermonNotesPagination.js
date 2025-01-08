import { Box, Button, Flex, Text, Divider, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const SermonNotesPagination = ({
  sermonNotes,
  currentPage,
  setCurrentPage,
}) => {
  const itemsPerPage = 5; // Fixed at 5 items per page

  const totalPages = Math.ceil(sermonNotes.length / itemsPerPage);

  const validCurrentPage = Math.min(currentPage, totalPages);

  const indexOfLastItem = validCurrentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSermonNotes = sermonNotes.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <Box>
      {currentSermonNotes.map((item) => (
        <Box key={item.sermonId}>
          <Flex
            direction="row"
            align="center"
            p={3}
            justify="space-between"
            alignItems="center"
          >
            <Box>
              <Flex direction="row" alignItems="center">
                <Box maxW={{ base: '8rem', md: '12rem' }} mr={4}>
                  <Image
                    src={item?.imageLink}
                    fallbackSrc="https://hongkong.sub.hmcc.net/wp-content/uploads/Screenshot-2020-09-04-at-6.39.50-PM.png"
                    objectFit="contain"
                  />
                </Box>
                <Box>
                  <Text
                    fontWeight="bold"
                    fontSize={{ base: 'md', md: 'lg' }}
                    mb={1}
                  >
                    {item?.title || ''}
                  </Text>
                  <Text
                    mb={2}
                    fontSize={{ base: 'sm', md: 'md' }}
                    color="gray.600"
                  >
                    {`Pastor ${item?.speaker || 'Unknown'} | ${
                      item?.date
                        ? new Date(item.date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short', // This will give "Sep"
                            year: 'numeric',
                          })
                        : ''
                    }`}
                  </Text>
                  <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.500">
                    {`Last Saved: ${
                      item.isSaved
                        ? new Date(item.childUpdatedAt).toLocaleDateString(
                            'default',
                            {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            }
                          )
                        : 'No Notes Saved'
                    }`}
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Button
              as={Link}
              to={`/sermons/notes/${item.sermonId}`}
              bg="#ADCFFF"
              color="#00377C"
              height={{ base: '2rem', md: '3.5rem' }}
            >
              View
            </Button>
          </Flex>
          <Divider bg="black" height={0.4} mt={2} />
        </Box>
      ))}

      {/* Pagination Controls */}
      <Flex justifyContent="flex-end" alignItems="center" mt={4}>
        <Button
          onClick={() =>
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
          }
          isDisabled={validCurrentPage === 1}
        >
          &lt;
        </Button>
        <Text mx={4} textAlign="center">
          {validCurrentPage}/{totalPages}
        </Text>
        <Button
          onClick={() =>
            setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
          }
          isDisabled={validCurrentPage === totalPages}
        >
          &gt;
        </Button>
      </Flex>
    </Box>
  );
};

export default SermonNotesPagination;
