import { useEffect, useState } from 'react';
import { customAxios as axios } from '../../helpers/customAxios';
import { Container } from '@chakra-ui/react';
import TextCardList from './TextCardList';

const TextTestimonyContainer = (props) => {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    getPublishedTestimonies();
  }, []);

  const getPublishedTestimonies = async () => {
    try {
      const { data, status } = await axios.get('/api/testimony/get-published');
      if (status === 200) {
        data.forEach((wv) => {
          wv.renderDate = wv.endDate;
        });
        data.sort((a, b) => (a.renderDate > b.renderDate ? 1 : -1));
        setTexts([...data]);
      } else {
        throw Error('Something went wrong');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxW="100%" padding={[0, 2]}>
      <TextCardList allText={texts} />
    </Container>
  );
};

export default TextTestimonyContainer;
