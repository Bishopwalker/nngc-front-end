import React, {useEffect} from 'react'
import {Route, Routes, useLocation} from "react-router-dom";
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
import DumpsterDK from "./components/products/DumpsterDK";
import TrashSubscription from "./components/products/TrashSubscription";
import Encoded_GMaps from "./components/google/EncodedG_Maps";
import NavBottom from "./components/navBottom/NavBottom";
// @ts-ignore
import Blog from "./components/blog/Blog";
import OurStory from "./components/ourStory/OurStory.jsx";
import SuccessPage from "./components/verifyEmail/SuccessPage";
import {Box} from "@mui/material";
import StripePricingTable from './components/stripeElements/StripePricingTable'
import VerifyEmail from "./components/verifyEmail/VerifyEmail";
import PrivacyPolicy from "./privacy/PrivacyPolicy";
import AlreadyConfirmed from "./auth/AlreadyConfirmed";
import TokenExpiredPage from "./auth/TokenExpiredPage";
import Help from './auth/Help'
import GotToLogin from "./auth/GotToLogin";
import Service from './components/service/Service';
import ThankYouPage from "./components/checkout/ThankYouPage";
import PasswordReset from "./auth/PasswordReset";
import Reviews from "./components/reviews/Reviews";
import ReactPixel from "react-facebook-pixel";
import MessageSales from "./components/MessageSales";
import { Helmet } from 'react-helmet';
import SurroundingArea from "./auth/SurroundingArea";
import AdminSignUp from "./components/signup-dk/AdminSignUp";

function App() {
	const screenTitle = useAppSelector(state => state.title)

	React.useEffect(() => {
		document.title = screenTitle.title? screenTitle.title : 'NNGC'
	}, [screenTitle])

	const location = useLocation();

	useEffect(() => {
		// Initialize Facebook Pixel
		ReactPixel.init(import.meta.env.VITE_FACEBOOK_PIXEL_ID as string);

		// Track page view without passing arguments
		ReactPixel.pageView();

		// Additional tracking for route changes (if using React Router)

	}, [location.pathname]);

	// @ts-ignore
	return (
		<div className="App">
			<Helmet>
				<title>{screenTitle.title ? screenTitle.title : 'Northern Neck Garbage Collection'}</title>
				<meta name="description" content="Northern Neck Garbage Collection offers reliable waste management and recycling services in Virginia. Discover our eco-friendly solutions and community initiatives." />
				<meta name="keywords" content="waste management, garbage collection, recycling, Virginia, eco-friendly disposal, Northern Neck Garbage Collection" />
			</Helmet>
			<HeaderTop />
			<Navbar />
			<NavBottom />


			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/appointment" element={<DKAppointment/>} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/dumpster/:productId" element={<DumpsterDK/>} />
				<Route path="/res_sub" element={<TrashSubscription/>} />
				<Route path='/emaps' element={<Encoded_GMaps/>} />
				<Route path='/blog' element={<Blog/>} />
				<Route path='services' element={<Service/>} />
				<Route path='story' element={<OurStory/>} />
				<Route path='/success' element={<SuccessPage/>} />
				<Route path='/verify' element={<VerifyEmail/>} />
				<Route path='/policy' element={<PrivacyPolicy/>}/>
				<Route path='/confirmed' element={<AlreadyConfirmed/>} />
				<Route path='/expired' element={<TokenExpiredPage/>}/>
				<Route path='/help' element={<Help/>} />
				<Route path='/gotoLogin' element={<GotToLogin/>} />
				<Route path='/pricing' element={<StripePricingTable/>} />
				<Route path='/thanks' element={<ThankYouPage/>}/>
				<Route path='/password' element={<PasswordReset/>} />
				<Route path='/reviews' element={<Reviews/>} />
				<Route path="*" element={<h1>Not Found</h1>} />
				<Route path ='/surrounding' element={<SurroundingArea/>}/>
				<Route path='/admin' element={<AdminSignUp/>} />


			</Routes>
			{/* ts-ignore */}

			<Box mt={4} pt={4} display={{ xs: 'block'}}>
				{}
			</Box>

			<Footer />
		</div>
	)
}

export default App


