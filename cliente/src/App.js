import { Box } from "@mui/material";
import Nav from "./components/Nav/Nav";
import Carousel from "./components/Carousel/Carousel";
import Chat from "./components/Chat/Chat";

function App() {
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
        <Carousel />
      </Box>
      <Box mt={15}>
        <Chat />
      </Box>
    </>
  );
}

export default App;
