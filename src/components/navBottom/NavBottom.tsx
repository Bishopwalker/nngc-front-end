import React, {useState} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import NNGCLogo from "/src/assets/nngc-logo.png";
import {Link, useLocation} from 'react-router-dom';
import {useTheme} from "@mui/material/styles";

import {useAppSelector} from "../../redux/hooks";

const NavBottom = () => {

    const theme = useTheme();
    const isMobile = theme.breakpoints.down('lg');

    const role: any = useAppSelector(state => state.userInfo?.role);


    const location = useLocation();
    const { pathname } = location;
    const [pageNumber, setPageNumber] = useState('1');
    const [county, setCounty] = useState('');

    // Hide the component if the route is /blogs
    if (pathname === '/blog') {
        return null;
    }
  return (
    <Box sx={{ padding: '1rem' }}>
        {role && role !== 'ADMIN' || !role && <> <Box sx={{ maxWidth: '150px', mx: 'auto' }}>
            <Link to="/">
                <img src={NNGCLogo} alt="Northern Neck Garbage logo" style={{ width: '100%', height: 'auto' }} />
            </Link>

        </Box>
        <Typography align="center" variant="body1" sx={{ fontWeight: 900 }}>
            Nurturing Neighborhoods, Guaranteeing Cleanliness
        </Typography> </>  }
           {role && role ==='ADMIN' && (
            <Box sx={{
                display:'flex', justifyContent:'space-around',flexDirection:isMobile ? 'column' : 'row', alignItems:'center', mt: '1rem'
            }}>

                <Button variant={"contained"} color={"primary"} sx={{mt: '1rem'}} component={Link}  to={`/emaps?page=${pageNumber}&county=${county}`}>
                    View Routes
                </Button>
                <TextField
                    label="Page Number"
                    variant="outlined"
                    type="number"
                    value={pageNumber}
                    onChange={(e) => setPageNumber(e.target.value)}
                    sx={{ mt: '1rem' }}
                />
                <TextField
                    label="County"
                    variant="outlined"
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    sx={{ mt: '1rem' }}
                />
                <Button variant={"contained"} color={"primary"} sx={{mt: '1rem'}} component={Link}  to={`/admin`}>
                    Signup New Customer
                </Button>
            </Box>
        )}




    </Box>
  );
};

export default NavBottom;

