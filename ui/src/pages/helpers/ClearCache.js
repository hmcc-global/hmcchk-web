import { Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { customAxios as axios } from "../helpers/customAxios";

const ClearCache = () => {
  const [loading, setLoading] = useState(true);

  const clearCache = async () => {
    const { status } = await axios.get("/api/cache/refresh-cache");
    if (status === 200) setLoading(false);
  };

  useEffect(() => {
    clearCache();
  }, []);

  return (
    <div>
      {loading ? <h1>Reloading cache..</h1> : <h1>Cache reloaded</h1>}
      {loading && <Spinner />}
    </div>
  );
};

export default ClearCache;
