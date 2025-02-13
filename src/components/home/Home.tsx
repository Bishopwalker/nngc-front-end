import {Box, Button, Container, Stack, Typography} from "@mui/material";
import React from "react";
import ImageSlider from "../slider/Slider";
import Service from "../service/Service";

import Testimonial from "../testimonial/Testimonial";
import {useAppDispatch} from "../../redux/hooks";
import {changeTitle} from "../../redux/pageTitleSlice";
import AccordionItem from "../faq/Faq";
import Reviews from "../reviews/Reviews";
import MessageSales from "../MessageSales";
import QuickBuyButton  from "../styledComponents/QuickBuyButton";
import {SmartButton} from "@mui/icons-material";

const Home = () => {
    const dispatch = useAppDispatch()
    React.useEffect(()=>{
        dispatch( changeTitle('Home'))
    },[])
  return (
    <Box>
        <h1 className="sr-only">Northern Neck Garbage Collection Home Page</h1>

        <ImageSlider />
        <Container>
      	  <Service />
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 1, sm: 2, md: 8 }}
            mt={8}
          >
          </Stack>
<Reviews />
		  <Testimonial />

            <Box mt={4} pt={4} display={{ xs: 'block'}}>
                <Typography variant="h4" align="center" color="black">Frequently Asked Questions</Typography>
                <Typography variant="subtitle1" align="center" color="black">If you don't see your question here, give us a call!</Typography>
                <AccordionItem
                    title="Should I get once or twice a week pickup for my business?"

                    content='Size matters when it comes to garbage... If you have enough trash cans to last you an entire week then once a week is fine. If you have a lot of trash cans and you`re
                     filling them up before the week is over then twice a week is the way to go.'
                />
                <AccordionItem

                    title="Do you offer Recycling?"
                    content="Of course if you purchase the weekly trash with recyling for only $65 per month,
                     then you just put your recycling can or labeled recycling bag and I'll grab it when I get your trash"
                />
                <AccordionItem
                    title="Do you offer backdoor service?"
                    content="Of course, our focus is taking care of our county's seniors and making trash pickup simple and easy"
                />
                <AccordionItem
                    title="How is industrial waste managed?"
                    content="We recognize that some of our industrial customers may generate special and sometimes hazardous waste.
                    You can trust that NNGC handles such material in an environmentally responsible manner, by letting other people
                     handle it! We are not equiped to handle anything other than things you can put in trailers and truck beds. No dangerous chemicials
                     dangerous children (or non-dangerous ones) and no dead bodies, period!"
                />
                <AccordionItem
                    title="Do you have insurance?"
                    content="Yes, I have one 1 million in liability insurance."
                />
                <AccordionItem

                    title="Do you pickup old cars, boats, metal or other large items?"
                    content="We remove large bulk items on a case by case basis. But in most situations we can make it work!
                    Give us a call today!"
                />
                <AccordionItem

                    title="Why can't I log into my account after I've signed up?"
                    content="Once you've signup, our system sends a confirmation email to the address you provided.
                    You need to open the email and click on the link to confirm your address.
						You have 3 days before the token is expired and if you gave the wrong email you'll have to give us a call."
                />
                <AccordionItem

                    title="Can you Drop the Trailer off for the day?"
                    content="Yes you can schedule with us to have us drop a 6x10 Dump Trailer with 42 inch walls off
                    and come back at the end of the day take and dump it for you! Call for a price."
                />
                <AccordionItem
                    title="I'm trying to get an account but nothing is happening"
                    content="We are working on making the app give more error messages, but in most cases its because you created an account already and never confirmed your email.
                    If you're having trouble signing up give us a call and we'll get you squared away!"
                />
            </Box>
      </Container>
        <Box mt={4} pt={4} justifyContent="center" display={{ xs: 'block'}}>
            <Button variant='contained'>Single Item Pickup</Button>
        </Box>



    </Box>
  );
};

export default Home;

