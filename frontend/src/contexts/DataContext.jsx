import { createContext, useEffect, useState } from "react";
import axios from "../api/axios";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [tags, setTags] = useState();

  useEffect(() => {
    const getTags = async () => {
      try {
        const response = await axios.get("/tags");
        setTags(response.data.tags);
      } catch (err) {
        if (err.status === 500) {
          toast.error("Server error. Please, try again later");
        } else if (err.status === 400 || err.status === 401) {
          toast.error(err.response.data.message);
        }
      }
    };

    getTags();
  }, []);

  return (
    <DataContext.Provider value={{ tags }}>{children}</DataContext.Provider>
  );
};

export default DataContext;
