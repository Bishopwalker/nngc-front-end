import React, { useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./DKAppointment.css";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import {
    Button,
    Card,
    CardHeader,
    Divider,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    TextFieldProps
} from "@mui/material";

const DKAppointment = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenDisabledDates, setModalOpenDisabledDates] = useState(false);

    const [service, setService] = useState("");
    const [time, setTime] = useState("");

    const handleServiceChange = (event:SelectChangeEvent<string>) => {
        setService(event.target.value );
    };

    const handleTimeChange = (event:SelectChangeEvent<string>) => {
        setTime(event.target.value  );
    };

    const [disabledDates] = useState(["2023-04-12", "2023-04-13"]);

    const dateClickHandler = (info: { dateStr: React.SetStateAction<string>; }) => {
        if (disabledDates.includes(info.dateStr as string)) {
            setSelectedDate(info.dateStr);
            setModalOpenDisabledDates(true);
        } else {
            setSelectedDate(info.dateStr);
            setModalOpen(true);
        }
    };

    const handleBookSubmit = () => {
        console.log("Selected Date: " + selectedDate);
        console.log("Service: " + service);
        console.log("Time: " + time);

        handleModalClose();
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleModalCloseDisabledDates = () => {
        setModalOpenDisabledDates(false);
    };

    const events = disabledDates.map((date) => {
        return {
            start: date,
            display: "background",
            backgroundColor: "#ccc",
        };
    });

    return (
        <div style={{ maxWidth: "800px", margin: "30px auto 50px" }}>
            <h1 style={{textAlign: 'center', paddingLeft: "100px", paddingBottom: "25px"}}> Book our Service </h1>
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
                eventSources={[{ events }]}
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
                        InputProps={{
                            readOnly: true,
                        }}
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
                        <MenuItem value="residential-trash-pickup">
                            Residential Trash Pickup
                        </MenuItem>
                        <MenuItem value="commercial-trash-pickup">
                            Commercial Trash Pickup
                        </MenuItem>
                        <MenuItem value="recycling-pickup">Recycling Pickup</MenuItem>
                        <MenuItem value="yard-waste-pickup">Yard Waste Pickup</MenuItem>
                        <MenuItem value="roll-off-dumpster-rental">
                            Roll Off Dumpster Rental
                        </MenuItem>
                        <MenuItem value="construction-commercial-dumpster-rental">
                            Construction/Commercial Dumpster Rental
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
                        <MenuItem value="6am">6 AM</MenuItem>
                        <MenuItem value="7am">7 AM</MenuItem>
                        <MenuItem value="8am">8 AM</MenuItem>
                        <MenuItem value="9am">9 AM</MenuItem>
                        <MenuItem value="10am">10 AM</MenuItem>
                        <MenuItem value="11am">11 AM</MenuItem>
                        <MenuItem value="12pm">12 PM</MenuItem>
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
                        InputProps={{
                            readOnly: true,
                        }}
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
                        <MenuItem value="residential-trash-pickup">
                            Residential Trash Pickup
                        </MenuItem>
                        <MenuItem value="commercial-trash-pickup">
                            Commercial Trash Pickup
                        </MenuItem>
                        <MenuItem value="recycling-pickup">Recycling Pickup</MenuItem>
                        <MenuItem value="yard-waste-pickup">Yard Waste Pickup</MenuItem>
                        <MenuItem value="roll-off-dumpster-rental">
                            Roll Off Dumpster Rental
                        </MenuItem>
                        <MenuItem value="construction-commercial-dumpster-rental">
                            Construction/Commercial Dumpster Rental
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
