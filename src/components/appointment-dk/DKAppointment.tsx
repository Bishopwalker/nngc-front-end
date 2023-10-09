import React, {useEffect, useState} from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./DKAppointment.css";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import {Button, Card, CardHeader, Divider, MenuItem, Select, TextField,} from "@mui/material";
import {useAppSelector} from "../../redux/hooks";
import axios from "axios";
import moment from 'moment';
import {Link} from "react-router-dom";

const DKAppointment = () => {
    const userInfo = useAppSelector(state => state.userInfo)

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenDisabledDates, setModalOpenDisabledDates] = useState(false);
    const [events, setEvents] = useState([]);
    const [service, setService] = useState("");
    const [time, setTime] = useState("");

    const handleServiceChange =  (event: { target: { value: any; }; }) => {
        setService(event.target.value);
    }

    const handleTimeChange =  (event: { target: { value: any; }; }) => {
        setTime(event.target.value);
    }
    const [disabledDates, setDisabledDates] = useState([""]);  // Update to use a setter function


    const fetchAppointments = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/appointments/all");
            const appointments = response.data;
            const newEvents = appointments.map((appointment: { appointmentDate: any; appointmentTime: any; }) => {
                const { appointmentDate, appointmentTime } = appointment;
                const start = moment(`${appointmentDate} ${appointmentTime}`, "YYYY-MM-DD HH:mm:ss");
                const end = moment(start).add(4, 'hours');  // Add 4 hours to the start time to get the end time
                return {
                    title: 'Booked',
                    start: start.format("YYYY-MM-DDTHH:mm:ss"),
                    end: end.format("YYYY-MM-DDTHH:mm:ss"),
                    backgroundColor: '#ccc',
                    textColor: '#000',
                };
            });
            setEvents(newEvents);  // Update the events state with the new event objects
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    useEffect(() => {
        fetchAppointments().then(r => console.log(r));
    }, []);
    const dateClickHandler = (info: { dateStr: string | React.SetStateAction<Date | null>; }) => {
        // Step 1: Check if user is logged in
        if (userInfo && userInfo.id) {
            // User is logged in, proceed as usual
            if (disabledDates.includes(info.dateStr as string)) {
                setSelectedDate(info.dateStr as any);
                setModalOpenDisabledDates(true);
            } else {
                setSelectedDate(info.dateStr as any);
                setModalOpen(true);
            }
        } else {
            // User is not logged in, prompt them to go to login page
            alert("Please log in to book an appointment. Redirecting to login page...");
            window.location.href = "/login"; // Redirect to login page
        }
    };


    const submitAppointment = async () => {
        try {
            // Step 1: Verify the API Endpoint
            const apiEndpoint = "http://localhost:5000/api/appointments/create-appointment"; // Make sure this matches with your Postman endpoint

            // Step 2: Format the date and time to match the backend's expected format
            const formattedDate = moment(selectedDate).format("DD-MM-YYYY");
            const formattedTime = moment(time, ["h:mm A"]).format("HH:mm:ss");

            // Step 3: Update the JSON payload
            const myJSON = {
                customer: userInfo.id,  // Assuming userInfo.id is the customer ID
                id:userInfo.id,
                appointmentDate: formattedDate,
                appointmentTime: formattedTime,
                appointmentType: service
            };

            // Log the payload to the console to ensure it's correctly formatted
            console.log("Sending payload:", myJSON);

            // Step 4: Convert the JavaScript object to a JSON string
            const values = JSON.stringify(myJSON);

            // Step 5: Send the updated JSON payload to the backend
            const response = await axios.post(apiEndpoint, values, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Log the response
            console.log("Backend response:", response);
        } catch (error) {
            // Log the error
            console.error("An error occurred:", error);
        }
    };

// Run the function to test




    const handleBookSubmit = () => {
        console.log("Selected Date: " + selectedDate);
        console.log("Service: " + service);
        console.log("Time: " + time);
        submitAppointment()
        handleModalClose();
    }


    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleModalCloseDisabledDates = () => {
        setModalOpenDisabledDates(false);
    };


    //console.log(userInfo)


    return (
        <div style={{ maxWidth: "800px", margin: "30px auto 50px" }}>
            {userInfo && userInfo.id ? (  // Check if userInfo.id exists
                <h1 style={{ textAlign: 'center', paddingLeft: "100px", paddingBottom: "25px" }}>
                    Book our Service
                </h1>
            ) : (
                <h1 style={{ textAlign: 'center', paddingLeft: "100px", paddingBottom: "25px" }}>
                    <Link to="/login">Click here to Login or Create an account</Link>
                </h1>
            )}
            <Fullcalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"}
                headerToolbar={{
                    start: "today prev,next",
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                height={"90vh"}
                dateClick={dateClickHandler}
                events={events}  // Update this line to use the events state

            />
            <Modal
                open={modalOpenDisabledDates}
                onClose={handleModalCloseDisabledDates}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Card
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "80%",
                        maxWidth: 400,
                        bgcolor: "#F0F2F5",
                        p: 2,
                        borderRadius: "8px",
                    }}
                >
                    <CardHeader
                        title="Book Our Services"
                        sx={{ bgcolor: "#2C3E50", color: "#fff", textAlign: "center" }}
                    />
                    <Divider />
                    <TextField
                        sx={{
                            mt: 2,
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#2C3E50",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#2C3E50",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#2C3E50",
                                },
                            },
                        }}
                        label="Date"
                        value={selectedDate}
                        type="text"
                        fullWidth

                    />
                    <Select
                        sx={{
                            mt: 2,
                        }}
                        fullWidth
                        defaultValue="service"
                    >
                        <MenuItem value="service" disabled>
                            Select a Service
                        </MenuItem>
                        <MenuItem value="yard-waste-pickup">Yard Waste Pickup</MenuItem>
                        <MenuItem value="roll-off-dumpster-rental">
                            Residential Junk Removal
                        </MenuItem>
                        <MenuItem value="construction-commercial-dumpster-rental">
                            Business/Commercial Junk Removal
                        </MenuItem>
                    </Select>
                    <Select
                        sx={{
                            mt: 2,
                        }}
                        fullWidth
                        defaultValue="time"
                    >
                        <MenuItem value="time" disabled>
                            Select Time
                        </MenuItem>
                        <MenuItem value="8am">8 AM</MenuItem>
                        <MenuItem value="9am">9 AM</MenuItem>
                        <MenuItem value="10am">10 AM</MenuItem>
                        <MenuItem value="11am">11 AM</MenuItem>
                        <MenuItem value="12am">12 PM</MenuItem>
                        <MenuItem value="1pm">1 PM</MenuItem>
                        <MenuItem value="2pm">2 PM</MenuItem>
                        <MenuItem value="3pm">3 PM</MenuItem>
                        <MenuItem value="4pm">4 PM</MenuItem>
                        <MenuItem value="5pm">5 PM</MenuItem>
                        <MenuItem value="6pm">6 PM</MenuItem>
                    </Select>
                    <Typography
                        id="modal-title"
                        variant="h6"
                        component="h2"
                        gutterBottom
                        style={{ padding: "30px 0" }}
                        align="center"
                    >
                        Sorry, we are booked on:{" "}
                        {selectedDate ? selectedDate.toLocaleString() : ""}
                    </Typography>
                </Card>
            </Modal>

            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Card
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "80%",
                        maxWidth: 400,
                        bgcolor: "#F0F2F5",
                        p: 2,
                        borderRadius: "8px",
                    }}
                >
                    <CardHeader
                        title="Book Our Services"
                        sx={{ bgcolor: "#2C3E50", color: "#fff", textAlign: "center" }}
                    />
                    <Divider />
                    <TextField
                        sx={{
                            mt: 2,
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#2C3E50",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#2C3E50",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#2C3E50",
                                },
                            },
                        }}
                        label="Date"
                        value={selectedDate}
                        type="text"
                        fullWidth

                    />
                    <Select
                        sx={{
                            mt: 2,
                        }}
                        onChange={handleServiceChange}
                        fullWidth
                        defaultValue="service"
                    >
                        <MenuItem value="service" disabled>
                            Select a Service
                        </MenuItem>
                        <MenuItem value="yard-waste-pickup">Yard Waste Pickup</MenuItem>
                        <MenuItem value="roll-off-dumpster-rental">
                            Residential Junk Removal
                        </MenuItem>
                        <MenuItem value="construction-commercial-dumpster-rental">
                            Business/Commercial Junk Removal
                        </MenuItem>
                    </Select>
                    <Select
                        sx={{
                            mt: 2,
                        }}
                        onChange={handleTimeChange}
                        fullWidth
                        defaultValue="time"
                    >
                        <MenuItem value="time" disabled>
                            Select Time
                        </MenuItem>
                        <MenuItem value="6am">6 AM</MenuItem>
                        <MenuItem value="7am">7 AM</MenuItem>
                        <MenuItem value="8am">8 AM</MenuItem>
                        <MenuItem value="9am">9 AM</MenuItem>
                        <MenuItem value="10am">10 AM</MenuItem>
                        <MenuItem value="11am">11 AM</MenuItem>
                        <MenuItem value="12pm">12 PM</MenuItem>
                    </Select>
                    <Button
                        sx={{
                            mt: 2,
                            bgcolor: "#2C3E50",
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#455A64",
                            },
                        }}
                        variant="contained"
                        onClick={handleBookSubmit}
                    >
                        Book Now
                    </Button>
                </Card>
            </Modal>
        </div>
    );
};

export default DKAppointment;
