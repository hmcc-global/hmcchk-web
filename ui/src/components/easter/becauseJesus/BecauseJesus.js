import { Text, Center, Box, SlideFade } from '@chakra-ui/react';
import '../story/fadeIn.css';
import { useEffect, useState, useRef } from 'react';

let options = {
  root: document.querySelector('#scrollArea'),
  rootMargin: '-5% 0% -5% 0%',
  threshold: 1,
};

const BecauseJesus = (props) => {
  const [isVisible, setVisible] = useState(false);

  const domRef = useRef();

  let callback = (entries) => {
    entries.forEach((entry) => {
      // isvisible wont be changed back to false
      if (entry.isIntersecting) {
        setVisible(entry.isIntersecting);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    observer.observe(domRef.current);
  }, []);
  return (
    <div ref={domRef}>
      <Center>
        <Box
          h={['30em', '30em']}
          w={['20em', '40em']}
          paddingTop={['6em', '0']}
          bgImage={process.env.PUBLIC_URL + '/images/easter/EasterCross.png'}
          bgSize="auto"
          bgPosition={['center 80%', 'center 90%']}
          bgAttachment={` ${isVisible ? 'scroll' : 'fixed'}`}
          bgRepeat="no-repeat"
        >
          <SlideFade in={isVisible} direction="top">
            <Box>
              <Text
                textStyle="NextSoutherlandSerif"
                textAlign="center"
                fontSize={['3xl', '5xl']}
                marginTop={['-2em', '0']}
              >
                Because, Jesus.
              </Text>
            </Box>
          </SlideFade>
        </Box>
      </Center>
    </div>
  );
};
export default BecauseJesus;
