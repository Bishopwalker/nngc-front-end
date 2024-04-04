import React, {useEffect, useRef, useState} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import NNGCLogo from "/src/assets/nngc-logo.png";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useTheme} from "@mui/material/styles";

import {useAppSelector} from "../../redux/hooks";

const NavBottom = () => {

    const theme = useTheme();
    const isMobile = theme.breakpoints.down('lg');

    const role: any = useAppSelector(state => state.userInfo?.role);

    const rerender = useRef(0)

    const location = useLocation();
    const { pathname } = location;
    const [pageNumber, setPageNumber] = useState('1');
    const [county, setCounty] = useState('');
    const [trigger, setTrigger] = useState(false);
    const navigate = useNavigate();
    // Hide the component if the route is /blogs
    if (pathname === '/blog') {
        return null;
    }

    const changeTrigger = () => {
        setTrigger(!trigger);
        const url= county==null || county ===""?`/emaps?page=${pageNumber}&trigger=${trigger}`:
            `/emaps?page=${pageNumber}&county=${county}&trigger=${trigger}`;

        rerender.current+=1;
       navigate(url);

    }


  return (
    <div style={{padding:"16px"}} >
        {role && role !== 'ADMIN' || !role && <> <Box sx={{ maxWidth: '150px', mx: 'auto' }}>
            <Link to="/">
                <img src={NNGCLogo} alt="Northern Neck Garbage logo" style={{ width: '100%', height: 'auto' }} />
            </Link>

        </Box>
        <Typography align="center" variant="body1" sx={{ fontWeight: 900 }}>
            Nurturing Neighborhoods, Guaranteeing Cleanliness
        </Typography> </>  }
           {role && role ==='ADMIN' && <> <Box  sx={{
                display:'flex', justifyContent:'space-around',flexDirection:isMobile ? 'column' : 'row', alignItems:'center', mt: '1rem'
            }}>

                <Button variant={"contained"} color={"primary"} sx={{mt: '1rem'}}  component={Link}
                        to={county==null || county ===""?`/emaps?page=${pageNumber}&trigger=${trigger}`:
                            `/emaps?page=${pageNumber}&county=${county}&trigger=${trigger}`}
                        onClick={changeTrigger}>
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
        </>
           }




    </div>
  );
};

export default NavBottom;

