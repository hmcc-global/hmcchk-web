import { useEffect, useState } from "react";
import { customAxios as axios } from "../helpers/customAxios";
import { signin } from "../../reducers/userSlice";
import { Box, Button } from "@chakra-ui/react";

const SermonContainer = (props) => {
  const [sermons, setSermons] = useState([]);

  const getData = async () => {
    try {
      const { data } = await axios.get("/api/sermons/get-sermons");
      setSermons(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onClickHandler = () => {
    const { history } = props;
    history.push("/events");
  };

  return (
    <div>
      <Button onClick={onClickHandler}>TEST</Button>
    </div>
  );
};

export default SermonContainer;
