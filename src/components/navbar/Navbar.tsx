import React, {useState} from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,

  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Facebook, Instagram, Twitter} from "@mui/icons-material/";
import {useAppSelector} from "../../redux/hooks";
import {Link} from "react-router-dom";

const Navbar = () => {
  const user = useAppSelector((state) => state.userInfo);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile drawer
  const [open, setOpen] = useState(false);

  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
  });

  const SocialBox = styled(Box)({
    display: "flex",
    gap: 10,
  });

  const MenuBox = styled(List)({
    display: "flex",
    gap: 50,
  });

  // Styles for desktop links
  const desktopLinkStyle = {
    color: 'white', // Normal link color
    textDecoration: 'none',
    '&:visited': {
      color: 'yellow', // Visited link color
    },
  };

  // Styles for mobile links
  const mobileLinkStyle = {
    color: 'blue', // Normal link color for mobile
    textDecoration: 'none',
    '&:visited': {
      color: 'purple', // Visited link color for mobile
    },
  };


  const MenuItems = [
    { Name: "Home", Link: "/" },
    // { Name: "Our Services", Link: "/services" },
    { Name: "Our Story", Link: "/story" },
    { Name: "My Account", Link: user.id ? "/dashboard" : "/login" },
    { Name: "Blog/News", Link: '/blog' },
    { Name: "Get Service Now", Link: "/services" },
  ];
  const handleIconClick = (url: string | URL | undefined) => {
    window.open(url, '_blank');
  };

  return (
      <AppBar sx={{ background: "#2c3e50" }} position={"static"}>
        <StyledToolbar>
          <SocialBox>
            <IconButton
                onClick={() => handleIconClick('https://www.facebook.com/profile.php?id=61551799658594')}
                sx={{ '&:hover': { backgroundColor: 'transparent' } }}
            >
              <Facebook sx={{ color: 'white' }} />
            </IconButton>
            <IconButton
                onClick={() => handleIconClick('https://www.instagram.com/northern_neck_garbage/')}
                sx={{ '&:hover': { backgroundColor: 'transparent' } }}
            >
              <Instagram sx={{ color: 'white' }} />
            </IconButton>
            <IconButton
                onClick={() => handleIconClick('https://www.twitter.com')}
                sx={{ '&:hover': { backgroundColor: 'transparent' } }}
            >
              <Twitter sx={{ color: 'white' }} />
            </IconButton>

          </SocialBox>

          {/* IconButton for mobile view */}
          <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setMobileMenuOpen(true)}
              sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Menu for desktop view */}
          <MenuBox sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
            {MenuItems.map((item, index) => (
                <Link to={item.Link} style={desktopLinkStyle} key={index}>

                <Typography
                    key={index}
                    sx={{
                      cursor: "pointer",
                      fontSize: "24px",
                      padding: "0 15px",
                      color: "white",
                    }}
                >
                    {item.Name}
                </Typography>
                </Link>
            ))}
          </MenuBox>
        </StyledToolbar>

        {/* Drawer for mobile view */}
        <Drawer
            anchor="left"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
        >
          <Box sx={{ width: 250 }}>
            <List>
              {MenuItems.map((item, index) => (
                  <Link to={item.Link} style={mobileLinkStyle} key={index} onClick={() => setMobileMenuOpen(false)}>
                  <ListItem
                      key={index}
                      onClick={() => setMobileMenuOpen(false)}
                  >

                    <ListItemText primary={item.Name} />
                  </ListItem>
                  </Link>
              ))}
            </List>
          </Box>
          <Link to='/help' >
          <Typography      onClick={() => setMobileMenuOpen(false)}
                                            variant='h4' sx={{
            padding: '50px'

          }}>
           Get Help
          </Typography>
           <span><h3>Or Message Us </h3> </span>
          </Link>
        </Drawer>

        {/* Existing Menu component */}
        <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            open={open}
            onClose={() => setOpen(!open)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
        >
          <Box sx={{ width: 350, height: "90vh" }}>
            {MenuItems.map((item, index) => (
                <MenuItem
                    key={index}
                    sx={{
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                >
                  {item.Name}
                </MenuItem>
            ))}
          </Box>
        </Menu>
      </AppBar>
  );
};

export default Navbar;
