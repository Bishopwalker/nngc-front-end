import React from 'react';
// Material UI imports
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardHeader,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Container,
    Grid,
    Paper,
    ThemeProvider,
    createTheme,
    Divider
} from '@mui/material';

// Material UI icons
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';
import DevicesIcon from '@mui/icons-material/Devices';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import KitchenIcon from '@mui/icons-material/Kitchen';
import ConstructionIcon from '@mui/icons-material/Construction';
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';

// Custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        error: {
            main: '#f44336',
        },
        warning: {
            main: '#ff9800',
        },
        info: {
            main: '#2196f3',
        },
        success: {
            main: '#4caf50',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 20px 0 rgba(0,0,0,0.1)',
                    },
                },
            },
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    padding: '16px 24px 0px 24px',
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '8px 24px 24px 24px',
                    '&:last-child': {
                        paddingBottom: 24,
                    },
                },
            },
        },
    },
});

const ForbiddenTrashList = () => {
    const categories = [
        {
            title: "Hazardous Materials",
            description: "These items contain chemicals harmful to the environment",
            items: [
                "Batteries (household and car batteries)",
                "Paint, solvents, and thinners",
                "Motor oil and automotive fluids",
                "Pesticides and herbicides",
                "Chemical cleaners",
                "Fluorescent bulbs and tubes"
            ],
            icon: <BatteryAlertIcon />,
            color: "error.main"
        },
        {
            title: "Electronic Waste",
            description: "E-waste contains heavy metals and should be recycled",
            items: [
                "Computers and laptops",
                "Televisions and monitors",
                "Mobile phones and tablets",
                "Printers and scanners",
                "Other electronic devices"
            ],
            icon: <DevicesIcon />,
            color: "warning.main"
        },
        {
            title: "Medical Waste",
            description: "These items can pose health hazards if not disposed correctly",
            items: [
                "Needles and syringes (sharps)",
                "Prescription medications",
                "Bandages from infectious disease",
                "Medical testing devices"
            ],
            icon: <MedicalServicesIcon />,
            color: "secondary.main"
        },
        {
            title: "Appliances & Large Items",
            description: "These items require special handling due to size or components",
            items: [
                "Refrigerators and freezers",
                "Air conditioners",
                "Large furniture items",
                "Mattresses",
                "Tires"
            ],
            icon: <KitchenIcon />,
            color: "info.main"
        },
        {
            title: "Construction Materials",
            description: "Building materials that cannot go in regular trash",
            items: [
                "Concrete and bricks",
                "Lumber and wood scraps",
                "Drywall/gypsum board",
                "Roofing materials",
                "Large amounts of dirt or soil"
            ],
            icon: <ConstructionIcon />,
            color: "info.dark"
        },
        {
            title: "Other Prohibited Items",
            description: "Various items requiring special disposal methods",
            items: [
                "Hot ashes or coals",
                "Propane tanks and compressed gas cylinders",
                "Ammunition and firearms",
                "Explosive materials",
                "Radioactive materials",
                "Yard waste (in some jurisdictions)"
            ],
            icon: <DoNotTouchIcon />,
            color: "error.dark"
        }
    ];

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ bgcolor: 'background.default', py: 6, minHeight: '100vh' }}>
                <Container maxWidth="lg">
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            mb: 4,
                            borderRadius: 3,
                            bgcolor: 'white',
                            textAlign: 'center'
                        }}
                    >
                        <WarningAmberIcon sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
                        <Typography variant="h4" component="h1" gutterBottom>
                            Items Prohibited in Regular Trash
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" paragraph>
                            The following items must not be placed in standard garbage containers and require special disposal methods.
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="body2" color="text.secondary">
                            Contact your local waste management facility for information on proper disposal options.
                        </Typography>
                    </Paper>

                    <Grid container spacing={3}>
                        {categories.map((category, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardHeader
                                        title={
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Box
                                                    sx={{
                                                        mr: 1.5,
                                                        color: category.color,
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    {category.icon}
                                                </Box>
                                                <Typography variant="h6">{category.title}</Typography>
                                            </Box>
                                        }
                                        subheader={category.description}
                                    />
                                    <CardContent>
                                        <List dense>
                                            {category.items.map((item, itemIndex) => (
                                                <ListItem key={itemIndex}>
                                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                                        <Box
                                                            sx={{
                                                                width: 8,
                                                                height: 8,
                                                                borderRadius: '50%',
                                                                bgcolor: category.color
                                                            }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default ForbiddenTrashList;