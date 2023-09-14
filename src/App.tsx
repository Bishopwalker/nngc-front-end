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
import { PersistGate } from 'redux-persist/integration/react';
import SuccessPage from "./components/checkout/SuccessPage";

function App() {
	const screenTitle = useAppSelector(state => state.title)

	React.useEffect(() => {
		document.title = screenTitle.title? screenTitle.title : 'NNGC'
	}, [screenTitle])
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
				<Route path="/res_trash_sub" element={<TrashSubscription/>} />
				<Route path='/maps' element={<G_Maps/>} />
				<Route path='/emaps' element={<Encoded_GMaps/>} />
				<Route path='/blog' element={<Blog/>} />
				<Route path='services' element={<Service/>} />
				<Route path='story' element={<OurStory/>} />
				<Route path='/success' element={<SuccessPage/>} />
				<Route path="*" element={<h1>Not Found</h1>} />

			</Routes>

			<Footer />
		</div>
	)
}

export default App


