
import { Box } from "@mui/material";
import Nav from "./components/Nav/Nav";
import Carousel from "./components/Carousel/Carousel";
import Chat from "./components/Chat/Chat";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';

/*const base_url = 'https://danielv.pythonanywhere.com/api'*/
const base_url = 'http://127.0.0.1:8000/api';

const App = () => {
  const [imagenes, setImagenes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const cargarImagenes = async () => {
    try {
          const response = await axios.get(base_url + '/all');
        const data = response.data;
        setImagenes(data.images);
        setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    cargarImagenes();
  }, []);

  if (isLoading) {
    return (<>
      <Nav />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
        p={4}
      >
      </Box>
      <Box mt={15}>
        <Chat />
      </Box>
      
    </>);
  }

  return (
    <>
      <Nav />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
        p={4}
      >
        <Carousel data = {imagenes} />
      </Box>
      <Box mt={15}>
        <Chat />
      </Box>
      
    </>
  );
}

export default App;