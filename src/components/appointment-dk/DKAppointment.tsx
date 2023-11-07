import React, {useEffect, useState} from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./DKAppointment.css";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import {Box, Button, Card, CardHeader, Divider, MenuItem, Select, TextField,} from "@mui/material";
import {useAppSelector} from "../../redux/hooks";
import axios from "axios";
import moment from 'moment';
import {useProtectedRouteUser} from "../../auth/useProtectedRouteUser";
import Alert, {AlertColor} from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
import {useNavigate} from "react-router-dom";

const DKAppointment = () => {
useProtectedRouteUser()
    const navigate = useNavigate();
    const userInfo = useAppSelector(state => state.userInfo)
  const confirmToken = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/auth/nngc/token_status?token=${userInfo.token}`, {
                maxRedirects: 0,  // Prevent automatic redirects
            });
            console.log(response.data);
            if (response.data === "expired") {  // 307 Temporary Redirect
                navigate('/expired');
            }
        } catch (error) {

        }
    };

    const processedEvents = new Set();
    const serviceToProductIdMapping = {
        'junk-removal': 'prod_Olle6yyFljmCMH',
        'trailer-rental': 'prod_NTzwClciqi6zCh'
    };

    useEffect(() => {
        confirmToken().then((r)=>console.log(r));
    },[])
console.log(userInfo)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenDisabledDates, setModalOpenDisabledDates] = useState(false);
    const [events, setEvents] = useState([]);
    const [service, setService] = useState("");
    const [time, setTime] = useState("");
    const [selectedValueProductID, setSelectedValueProductID] = useState("");
    const [paymentIntent,setPaymentIntent] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [appointmentsUpdated, setAppointmentsUpdated] = useState(false);

    const handleServiceSelection = (service: string | number) => {
        // @ts-ignore
        const productId = serviceToProductIdMapping[service];
        if (productId) {
            setSelectedValueProductID(productId);
        } else {
            console.error(`No product ID found for service: ${service}`);
        }
    };



console.log(paymentIntent)
   // const processedEventTypes = new Set();

    function handleSse() {
      // Set to keep track of processed event data
        let eventSource = new EventSource('http://localhost:8080/sse/subscribe');
//console.log(processedEvents)
        function setupEventSource() {
            eventSource.onmessage = function (event) {
     //   console.log('Received event:', event.data.receiptUrl);

                // Check if this event data has already been processed
                if (!processedEvents.has(event.data)) {
                    // If not, process the event
                    setPaymentIntent(event.data);
                    // And add the event data to the set of processed events
                   // processedEvents.add(event.data);
                    processedEvents.add(event.data);
                }

                    console.log("paymentIntent: " + paymentIntent)
                // Check if the paymentIntent equals "Payment Succeeded"
                console.log({...processedEvents})
            };

            eventSource.onerror = function (error) {
                console.error('EventSource failed:', error);
                // Optionally, close the event source and try to reconnect
                eventSource.close();


                    setTimeout(() => {
                        console.log('Reconnecting...');
                        eventSource = new EventSource('http://localhost:8080/sse/subscribe');
                        setupEventSource();  // Re-apply the event handlers to the new EventSource instance
                    }, 5000);  // 5 seconds delay
                }
            };


        setupEventSource();  // Initial setup
    }


// Call this function when your component mounts
    useEffect(() => {
        handleSse();

    }, []);

    const handleServiceChange = (event: { target: { value: any; }; }) => {
        const newServiceValue = event.target.value;
        setService(newServiceValue);
        handleServiceSelection(newServiceValue);
    }

    console.log(selectedValueProductID)
    const handleTimeChange =  (event: { target: { value: any; }; }) => {
        setTime(event.target.value);
    }
    const [disabledDates, setDisabledDates] = useState([""]);  // Update to use a setter function


    const fetchAppointments = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/appointments/all");
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
    const handlePushToReceiptUrl = () => {
        window.location.href = userInfo.receiptURL as unknown as string;
    }

    const submitAppointment = async () => {
        try {
            // Step 1: Verify the API Endpoint
            const apiEndpoint = "http://localhost:8080/api/appointments/create-appointment"; // Make sure this matches with your Postman endpoint

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
            setAppointmentsUpdated(prev => !prev);

        } catch (error) {
            // Log the error
            console.error("An error occurred:",error);
                // @ts-ignore
            if(error.response.status === 500) {

                    setSnackbarSeverity('error');
                    setSnackbarMessage('Appointment Already scheduled during this time, try again!');
                    setOpenSnackbar(true);

                }
        }

    };

// Run the function to test


    //console.log(events)
    useEffect(() => {
        fetchAppointments().then(r => console.log(r));
    }, [appointmentsUpdated]);


    const handleBookSubmit = () => {
        console.log("Selected Date: " + selectedDate);
        console.log("Service: " + service);
        console.log("Time: " + time);

        if( userInfo.receiptURL !== null || paymentIntent !== null && paymentIntent === "Payment succeeded"  ) {

            submitAppointment().then((r)=>console.log("good to go"));
            handleModalClose();
        } else {
            setSnackbarSeverity('error');
            setSnackbarMessage('You Need to go checkout and pay for Junk Removal before you can book an appointment');
            setOpenSnackbar(true);
        }
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
            <Button onClick={handlePushToReceiptUrl} >View Receipt</Button>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={20000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert
                    sx={{ fontSize: '2.5rem',width: '100%' }}
                    onClose={() => setOpenSnackbar(false)}
                    severity={snackbarSeverity as AlertColor}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            {userInfo && userInfo.id && paymentIntent === "Payment succeeded"  || userInfo && userInfo.receiptURL !== null? (  // Check if userInfo.id exists
              <Box sx={{
                  backgroundColor: '#41de47',
              }}>
                <Typography variant={"h4"} sx={{ textAlign: 'center', paddingLeft: "100px", paddingBottom: "25px" }}>
                    Thank you for your payment!!!
                </Typography >
                  <Typography variant={"h4"} sx={{ textAlign: 'center' }}>
                      Now Select a Date and Time for your Junk Removal
                  </Typography>
              </Box>
            ) : (
                <h1 style={{ textAlign: 'center', paddingLeft: "100px", paddingBottom: "25px" }}>
                  Waiting for payment to be approved for Junk Removal
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
                        <MenuItem value="junk-removal">
                            Junk Removal
                        </MenuItem>
                        <MenuItem value="trailer-rental">
                           6 x 10 Trailer Rental
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
                        <MenuItem value="12pm">12 PM</MenuItem>
                        <MenuItem value="1pm">1 PM</MenuItem>
                        <MenuItem value="2pm">2 PM</MenuItem>
                        <MenuItem value="3pm">3 PM</MenuItem>
                        <MenuItem value="4pm">4 PM</MenuItem>
                        <MenuItem value="5pm">5 PM</MenuItem>

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
                        <MenuItem value="junk-removal">
                            Junk Removal
                        </MenuItem>
                        <MenuItem value="trailer-rental">
                            6 x 10 Dump Trailer Rental
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
                        <MenuItem value="8am">8 AM</MenuItem>
                        <MenuItem value="9am">9 AM</MenuItem>
                        <MenuItem value="10am">10 AM</MenuItem>
                        <MenuItem value="11am">11 AM</MenuItem>
                        <MenuItem value="12pm">12 PM</MenuItem>
                        <MenuItem value="1pm">1 PM</MenuItem>
                        <MenuItem value="2pm">2 PM</MenuItem>
                        <MenuItem value="3pm">3 PM</MenuItem>
                        <MenuItem value="4pm">4 PM</MenuItem>
                        <MenuItem value="5pm">5 PM</MenuItem>

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
