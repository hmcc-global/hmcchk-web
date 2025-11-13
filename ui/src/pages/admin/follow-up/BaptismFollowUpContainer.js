import React, { useEffect, useState } from 'react';
import { customAxios as axios } from '../../helpers/customAxios';
import UserGrid from './UserGrid';

const baptismDefaultFilter = {
  baptismDate: {
    dateFrom: null,
    dateTo: null,
    filterType: "date",
    type: "blank"
  },
  recognitionDate: {
    dateFrom: null,
    dateTo: null,
    filterType: "date",
    type: "notBlank"
  }
};

const FollowUpContainer = () => {
  const [users, setUsers] = useState()

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await axios.get('/api/users/get');
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <UserGrid
        users={users}
        defaultFilter={baptismDefaultFilter}
      />
    </>
  );
}

export default FollowUpContainer; 