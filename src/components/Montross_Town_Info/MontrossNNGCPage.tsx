import React from 'react';
import {
    AppBar,
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    Paper,
    ThemeProvider,
    Toolbar,
    Typography,
    createTheme,
    useMediaQuery
} from '@mui/material';
import {
    Notifications as NotificationsIcon,
    CalendarMonth as CalendarIcon,
    AccessTime as ClockIcon,
    AttachMoney as MoneyIcon,
    LocalShipping as TruckIcon,
    Wallet as WalletIcon,
    Delete as DeleteIcon, Phone,
} from '@mui/icons-material';
import {Link} from "react-router-dom";
import TOWN from "/src/assets/tomcombutton2.gif"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {Yard} from "@mui/icons-material";

const theme = createTheme({
    typography: {
        fontFamily: "'Roboto', 'Arial', sans-serif",
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1.125rem',
        },
    },
    palette: {
        primary: {
            main: '#4CAF50',
        },
        secondary: {
            main: '#FFC107',
        },
    },
});

const LOGO_SEQUENCE = [
    {
        type: 'montross',
        src: TOWN,
        alt: 'Town of Montross Logo',
    },
    {
        type: 'nngc',
    }
];

// Number of times to repeat the sequence
const REPEAT_COUNT = 4;

const NNGCLogo: React.FC = () => (
    <svg viewBox="0 0 300 100" style={{ width: '150px', height: '50px' }}>
        <defs>
            <linearGradient id="shadow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#333333', stopOpacity: 0.3 }}/>
                <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 0.5 }}/>
            </linearGradient>
        </defs>
        <rect x="10" y="10" width="280" height="80" rx="10" fill="url(#shadow)"/>
        <text x="30" y="70" fontFamily="Arial Black, sans-serif" fontSize="60" fontWeight="bold">
            <tspan fill="#4CAF50">N</tspan>
            <tspan fill="#FFC107" x="85" y="70">N</tspan>
            <tspan fill="#4CAF50" x="140" y="70">G</tspan>
            <tspan fill="#FFC107" x="195" y="70">C</tspan>
        </text>
    </svg>
);

// Schedule data for better organization
const scheduleData = [
    {
        day: 'Monday',
        services: ['Commercial Dumpsters 1x']
    },
    {
        day: 'Wednesday',
        services: ['Residential/Business Toter Pickup', 'Commercial Dumpsters 3x']
    },
    {
        day: 'Friday',
        services: ['Commercial Dumpsters 2x']
    }
];

const InfoCard: React.FC<{
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}> = ({ title, icon, children }) => (
    <Card elevation={3} sx={{ height: '100%' }}>
        <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
                <Box color="primary.main" mr={2}>
                    {icon}
                </Box>
                <Typography variant="h2" component="h2">
                    {title}
                </Typography>
            </Box>
            {children}
        </CardContent>
    </Card>
);
const ScheduleComponent = () => {
    return (
        <Paper elevation={2} sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CalendarMonthIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Weekly Schedule</Typography>
            </Box>

            {/* Schedule Grid */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2, borderLeft: '3px solid #1976d2' }}>
                        <Typography variant="subtitle1" fontWeight="bold">Monday</Typography>
                        <Typography variant="body2">• Commercial Dumpsters Day 1x</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2, borderLeft: '3px solid #1976d2' }}>
                        <Typography variant="subtitle1" fontWeight="bold">Wednesday</Typography>
                        <Typography variant="body2">• Residential/Business Toter Pickup</Typography>
                        <Typography variant="body2">• Commercial Dumpsters Day 3x</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2, borderLeft: '3px solid #1976d2' }}>
                        <Typography variant="subtitle1" fontWeight="bold">Friday</Typography>
                        <Typography variant="body2">• Commercial Dumpsters Day 2x + Residents with Special Needs</Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Holiday Notice */}
            <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#e3f2fd', p: 1, borderRadius: 1 }}>
                <AccessTimeIcon color="secondary" sx={{ mr: 1 }} />
                <Typography variant="body2">Holiday schedules will be posted here</Typography>
            </Box>
            <br></br>
            <code>1x = times per week scheduled</code>
        </Paper>
    );
};
const MontrossNNGCPage: React.FC = () => {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
let count=0;
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{  flexGrow: 1 }}>
                <AppBar position="sticky" color="default" elevation={2}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                                width: '100%',
                                gap: 2,
                                overflow: 'auto',
                                '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar for Chrome
                                scrollbarWidth: 'none', // Hide scrollbar for Firefox
                            }}
                        >
                            <Box sx={{ borderLeft: 1, height: 40, borderColor: 'grey.300' }} />
                            {Array(REPEAT_COUNT).fill(LOGO_SEQUENCE).flat().map((logo, index) => (
                                <React.Fragment key={count++}>
                                    {logo.type === 'montross' ? (
                                        <Link to="http://www.townofmontross.com/" target="_blank">
                                        <img
                                            src={logo.src}
                                            alt={logo.alt}
                                            style={{ height: '25px' }}
                                        />
                                         </Link>
                                    ) : (
                                        <>
                                            <Box sx={{ borderLeft: 1, height: 40, borderColor: 'grey.300' }} />
                                            <NNGCLogo />
                                        </>
                                    )}
                                </React.Fragment>
                            ))}
                        </Box>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg" sx={{ mt: 4, m: 4 }}>
                    <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                        <Typography variant="h1" component="h1" gutterBottom>
                            Welcome to Your New Waste Collection Service
                        </Typography>

                        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.25rem', mb: 3 }}>
                            Northern Neck Garbage Collection (NNGC) is proud to partner with the Town of Montross to provide reliable waste collection services to our community. If you are a Montross resident or business, please continue to enroll for weekly pickup service through the town - do not sign up through our platform. For bulk pickup service, whether you are located inside or outside Montross town limits, you can schedule by calling us directly or using our online platform.                        </Typography>

                        <Typography variant="h2" component="h2" gutterBottom sx={{ fontSize: '1.75rem', mt: 4 }}>
                            Bulk Item Pickup Services
                        </Typography>

                        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.25rem' }}>
                            We offer Bulk Item Pickup services at a discounted rate for Montross residents and businesses. Whether you need a room cleanout, barn clearing, garbage removal, or yard waste collection, give us a call today!
                        </Typography>

                        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.25rem', mt: 2, fontWeight: 'medium' }}>
                            Simply mention to our operator that you are a customer Montross to receive a 20% discount off our standard dumping rates. Standard hourly rates still apply, call for details.
                        </Typography>
                    </Paper>

                    <ScheduleComponent></ScheduleComponent>
                    <Grid padding={5} container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <InfoCard
                                title="Important Updates"
                                icon={<NotificationsIcon fontSize="large" />}
                            >
                                <Typography>
                                    <Typography variant="body1" pb={1} onClick={() => window.location.href = 'tel:+18042200029'}>
                                        <Phone sx={{ color: '#26C9FF', marginRight: '0.5rem' }}  />
                                        Call  (804) 220-0029 Phone to schedule a missed pickup for Friday's.
                                    </Typography>

                                </Typography>
                            <Typography> <span style={{
                                fontWeight: 'bold',
                                fontStyle: 'italic',

                            }}>Did you know?: </span>That you can reschedule a missed pickup easily by calling our office? </Typography>
                            <div style={{
                                display: 'flex',
                                paddingTop: '1rem',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'space-between',
                              position: 'relative',
                                bottom:-20
                            }}>**Missed Pickups are rescheduled for Friday</div>
                            </InfoCard>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InfoCard
                                title="Special Services"
                                icon={<WalletIcon fontSize="large" />}
                            >
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box display="flex" alignItems="center">
                                        <MoneyIcon color="secondary" sx={{ mr: 1 }} />
                                        <Typography variant="body1">
                                            Special junk removal rates for Montross residents
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center">
                                   <Yard  sx={{ mr: 1 }}></Yard>
                                    <Typography variant="body1"> Yard debris and garbage junk removal day coming up soon in May.</Typography>
                                    </Box>
                                    <Typography variant="body2">
                                         Residents will be allowed to bring out up to 4 trash cans worth of bagged yard waste. Ask Fran or Christy for details. We will have a day for old furniture, lawn equipment, and electronics. Stay tuned!                                    </Typography>

                                </Box>
                            </InfoCard>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoCard
                                title="What Sizes Do you Offer?"
                                icon={<TruckIcon fontSize="large" />}
                            >
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box display="flex" alignItems="center">
                                        <MoneyIcon color="secondary" sx={{ mr: 1 }} />
                                        <Typography variant="body1">
                                            2, 4 & 8 Yard Dumpsters
                                        </Typography>
                                        <DeleteIcon color="primary" sx={{ ml:1 }} style={{paddingRight: '10px'}} />
                                        <Typography variant="body1">
                                            Brightly Colored 96 and 64 Gallon Wheeled Totes
                                        </Typography>
                                    </Box>
                                    <Typography variant="body1">
                                        We only use the most efficient and durable trash containers. We provide high quality clearly labeled bins, that are available in both 64 and 96 gallon sizes from a brand name you trust.
                                    </Typography>
                                </Box>
                            </InfoCard>
                        </Grid>

                    </Grid>

                </Container>
                <AppBar position="sticky" color="default" elevation={2}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                                width: '100%',
                                gap: 2,
                                overflow: 'auto',
                                '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar for Chrome
                                scrollbarWidth: 'none', // Hide scrollbar for Firefox
                            }}
                        >
                            <Box sx={{ borderLeft: 1, height: 40, borderColor: 'grey.300' }} />
                            {Array(REPEAT_COUNT).fill(LOGO_SEQUENCE).flat().map((logo, index) => (
                                <React.Fragment key={count++}>
                                    {logo.type === 'montross' ? (
                                        <Link to="http://www.townofmontross.com/" target="_blank">
                                            <img
                                                src={logo.src}
                                                alt={logo.alt}
                                                style={{ height: '25px' }}
                                            />
                                        </Link>
                                    ) : (
                                        <>
                                            <Box sx={{ borderLeft: 1, height: 40, borderColor: 'grey.300' }} />
                                            <NNGCLogo />
                                        </>
                                    )}
                                </React.Fragment>
                            ))}
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    );
};

export default MontrossNNGCPage;