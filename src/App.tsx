import React from 'react'
import {Route, Routes} from "react-router-dom";
import HeaderTop from "./components/headerTop/HeaderTop";
import Navbar from "./components/navbar/Navbar";

import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import {useAppSelector} from "./redux/hooks";
import Login from "./components/login-dk/Login";
import Signup from "./components/signup-dk/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
// @ts-ignore
import ClassAppointments from "./components/appointment/ClassAppointments.jsx";
import DKAppointment from "./components/appointment-dk/DKAppointment";
import Dumpster from "./components/products/Dumpster";
import TrashSubscription from "./components/products/TrashSubscription";
import G_Maps from "./components/google/G_Maps";
import Encoded_GMaps from "./components/google/EncodedG_Maps";
import NavBottom from "./components/navBottom/NavBottom";
// @ts-ignore
import Blog from "./components/blog/Blog";
import Service from "./components/service/Service";
import OurStory from "./components/ourStory/OurStory.jsx";
import SuccessPage from "./components/checkout/SuccessPage";
import {Box, Typography} from "@mui/material";
import AccordionItem from "./components/faq/Faq";

function App() {
	const screenTitle = useAppSelector(state => state.title)

	React.useEffect(() => {
		document.title = screenTitle.title? screenTitle.title : 'NNGC'
	}, [screenTitle])
	// @ts-ignore
	// @ts-ignore
	return (
		<div className="App">

			<HeaderTop />
			<Navbar />
			<NavBottom />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/appointment" element={<DKAppointment/>} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/dumpster/:productId" element={<Dumpster/>} />
				<Route path="/res_sub" element={<TrashSubscription/>} />
				<Route path='/maps' element={<G_Maps/>} />
				<Route path='/emaps' element={<Encoded_GMaps/>} />
				<Route path='/blog' element={<Blog/>} />
				<Route path='services' element={<Service/>} />
				<Route path='story' element={<OurStory/>} />
				<Route path='/success' element={<SuccessPage/>} />
				<Route path="*" element={<h1>Not Found</h1>} />

			</Routes>
			{/* ts-ignore */}
			<Box mt={4} pt={4} display={{ xs: 'block'}}>
				<Typography variant="h4" align="center" color="black">Frequently Asked Questions</Typography>
				<Typography variant="subtitle1" align="center" color="black">If you don't see your question here, give us a call!</Typography>
				<AccordionItem
				title="How often should I order once or twice a week pickup for my business?"

				content='Size matters when it comes to garbage...'
				/>
				<AccordionItem

				 title="Do you offer Recycling?"
					content="Of course, just put your recycling can or labeled recycling bag and I'll grab it when I get your trash"
				/>
				<AccordionItem
					 title="Do you offer backdoor service?"
					content="Of course, our focus is taking care of our county's seniors and making trash pickup simple and easy"
				/>
				<AccordionItem
					title="How is industrial waste managed?"
					content="We recognize that some of our industrial customers may generate special and sometimes hazardous waste. You can trust that WM handles such material in an environmentally responsible manner. Our capacity, industry experience and trade leadership allow us to identify the type of waste and to customize the removal, allowing for heightened safety measures and specialized disposal processes.
						We ensure environmental compliance and provide “cradle to grave” compliance tracking."
				/>
				<AccordionItem
				title="Do you have insurance?"
					content="Of course, Rest assured if I break it, they'll buy it!! So unless your mailbox is made of solid gold we're good!"
				/>
				<AccordionItem

				title="Do you pickup old cars, boats, metal or other large items?"
					content="We remove large bulk items on a case by case basis. Give us a call today!"
				/>
				<AccordionItem

			title="Why can't I log into my account after I've signed up?"
					content="Once you've signup our system sends a confirmation email to the address you provided. You need to open the email and click on the link to confirm you address.
						You have 3 days before the token is expired and if you gave the wrong email you'll have to give us a call."
				/>
				<AccordionItem

				title="Do you provide dumpsters or larger wheeled trashcans?"
					content="If you need a special request give us a call today!"
				/>

			</Box>
			<Box mt={4} pt={4} display={{ xs: 'block'}}>
				{}
			</Box>
			<Footer />
		</div>
	)
}

export default App


