import { useEffect, useState } from 'react';
import { customAxios as axios } from '../helpers/customAxios';

const ActiveSermonContainer = (props) => {
  const { history } = props;
  const getData = async () => {
    try {
      const { data, status } = await axios.get('/api/sermons/get-sermons');
      if (status === 200) {
        let current = data.find(({ nextSermon }) => nextSermon == null);
        if (
          current.streamLink &&
          current.sermonNotes &&
          current.sermonSeries[0]
        ) {
          history.push(`/sermons/${current.id}`);
        } else {
          history.push(`/sermons/`);
        }
      } else {
        throw Error('Something went wrong');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return null;
};

export default ActiveSermonContainer;
