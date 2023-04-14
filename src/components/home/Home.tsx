import {Box, Container, Stack} from "@mui/material";
import React from "react";
import ImageSlider from "../slider/Slider";
import Service from "../service/Service";
import Team from "../team/Team";
import Testimonial from "../testimonial/Testimonial";
import {useAppDispatch} from "../../redux/hooks";
import {changeTitle} from "../../redux/pageTitleSlice";

const Home = () => {
    const dispatch = useAppDispatch()
    React.useEffect(()=>{
        dispatch( changeTitle('Home'))
    },[])
  return (
    <Box>
		<ImageSlider />
        <Container>
      	  <Service />
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 1, sm: 2, md: 8 }}
            mt={8}
          >
          </Stack>
		  <Team />
		  <Testimonial />
      </Container>
    </Box>
  );
};

export default Home;

