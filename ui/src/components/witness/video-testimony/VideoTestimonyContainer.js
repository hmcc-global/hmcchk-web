import { useEffect, useState } from 'react';
import { customAxios as axios } from '../../helpers/customAxios';
import { Container } from '@chakra-ui/react';
import VideoCardList from './VideoCardList';

const VideoTestimonyContainer = (props) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const { data, status } = await axios.get(
        '/api/witness/get-witness-videos'
      );
      if (status === 200) {
        data.forEach((wv) => {
          wv.renderDate = wv.endDate;
        });
        data.sort((a, b) => (a.renderDate > b.renderDate ? 1 : -1));
        setVideos([...data]);
      } else {
        throw Error('Something went wrong');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container maxW="100%" padding={[0, 2]}>
        <VideoCardList allVideos={videos} />
      </Container>
    </>
  );
};

export default VideoTestimonyContainer;
