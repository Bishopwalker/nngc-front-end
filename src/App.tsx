import React from 'react'
import {Route, Routes} from "react-router-dom";
import HeaderTop from "./components/headerTop/HeaderTop";
import Navbar from "./components/navbar/Navbar";
import NavBottom from "./components/navBottom/NavBottom";
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
				<Route path="/dumpster" element={<Dumpster />} />
				<Route path="/res_trash_sub" element={<TrashSubscription/>} />
				<Route path='/maps' element={<G_Maps/>} />
			</Routes>

		<Footer />
    </div>
  )
}

export default App
