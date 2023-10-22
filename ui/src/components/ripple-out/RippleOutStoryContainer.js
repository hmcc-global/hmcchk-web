import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  VStack,
  Container,
} from '@chakra-ui/react';
import RippleOutFaqSection from './RippleOutFaqSection';
import RippleOutHeroSection from './RippleOutHeroSection';
import { fontColor, headerFontSize, bodyFontSize } from './RippleOutTextStyle';

const RippleOutStoryContainer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <RippleOutHeroSection />
      <Flex
        minH="100%"
        flexDir="column"
        bgColor="#FFFBEF"
        py={['1.8em', '4em']}
        color={fontColor}
      >
        <Container
          maxW={['container.xl']}
          h="100%"
          textStyle="darker_grotesque"
        >
          <Flex flexDir="column" gap={9}></Flex>
          <VStack gap="4em" textAlign="center">
            <Text
              fontSize={['3em', '4.75em']}
              lineHeight="1em"
              textStyle="darker_grotesque_medium"
            >
              We are called to <u>RIPPLE OUT</u> as we live out our{' '}
              <u>SATURATE VISION</u> to saturate Hong Kong with the knowledge of
              God’s glory
            </Text>
            <VStack lineHeight="2em">
              <Text fontSize={['3xl', '4xl']}>
                TRANSFORMING LIVES TRANSFORMING THE WORLD
              </Text>
              <Text
                fontSize={['3xl', '4xl']}
                textStyle="darker_grotesque_medium"
              >
                Transformation Center {'>>'} Kwun Tong {'>>'} Hong Kong {'>>'}{' '}
                Ends of the earth
              </Text>
            </VStack>

            <Button
              variant="outline"
              onClick={onOpen}
              fontSize="lg"
              bgColor="#ffffff"
              fontWeight="bold"
              borderColor="#182E57"
              color="#182E57"
            >
              READ THE STORY
            </Button>
          </VStack>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW="container.lg" p={5}>
              <ModalCloseButton />
              <ModalBody>
                <Flex flexDir="column" gap={3} textStyle="darker_grotesque">
                  <Text
                    fontSize={headerFontSize}
                    textStyle="darker_grotesque_black"
                  >
                    THE STORY
                  </Text>
                  <Text fontSize={bodyFontSize}>
                    Harvest Mission Community Church (HMCC) has always been
                    about “transforming lives and transforming the world.” This
                    is our passion. This is our mission. Ever since HMCC got
                    started back in 1996 on the campus of the University of
                    Michigan, in the U.S., and in Hong Kong back in 2015, we
                    have focused on proclaiming the transformative message of
                    the Gospel because the Gospel changes everything.
                  </Text>
                  <Text fontSize={bodyFontSize}>
                    Over the years, we realized that in order for this dream to
                    become a reality, we need to start here in Hong Kong, and
                    then ripple out to reach the nations. Therefore,{' '}
                    <b>starting in January 2024 until December 2029</b>, we are
                    going to launch our Saturate Vision. The vision is simply
                    ”to saturate Hong Kong with the knowledge of God’s glory by
                    living out the Kingdom lifestyle and proclaiming the Gospel,
                    so that we can make more Christ’s disciples of all nations
                    locally, regionally, and globally for the spread of Jesus’s
                    fame.” This vision was inspired by the passage from Habakkuk
                    2:14 (ESV), “For the earth will be filled with the knowledge
                    of the glory of the LORD as the waters cover the sea.”
                  </Text>
                  <Text fontSize={bodyFontSize}>
                    By God’s grace, we have been able to find a location for our
                    whole church to physically gather together! We give God all
                    the glory. This space will be our church home where we will
                    have our Sunday Celebrations, a place for our LIFE Group and
                    ministry-related gatherings, and a space to train, equip,
                    and send out people to do the ministry. It is also on our
                    hearts to use the space to reach out and serve our community
                    throughout the week. A permanent place will not only give us
                    a missional presence in the neighborhood, but also brings
                    stability to our church. This will open up opportunities to
                    minister to the community with the Gospel and saturate the
                    city of Hong Kong.
                  </Text>
                  <Text fontSize={bodyFontSize}>
                    In order to prepare the facility for all that God is calling
                    us to do, we are launching our <b>Ripple Out Campaign</b> to
                    help fund this project. We are praying that out of the
                    generosity that we have received from Christ’s sacrifice we
                    will be able to reflect His heart and character by being
                    generous so that we may reach out to more people with the
                    Gospel. As we have always said, “We are blessed to be a
                    blessing!” We cannot do this without you and every single
                    person in our church participating, as well as some of you
                    who are alumni of our church. We invite you to pray with us
                    and depend on God, who is the Jehovah-Jireh, our God who
                    provides. May we continue to send out ripples from Hong
                    Kong.
                  </Text>
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Container>
      </Flex>
      <RippleOutFaqSection />
    </>
  );
};

export default RippleOutStoryContainer;
