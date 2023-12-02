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
                <Typography
                    key={index}
                    sx={{
                      cursor: "pointer",
                      fontSize: "24px",
                      padding: "0 15px"
                    }}
                >
                  <Link to={item.Link}>
                    {item.Name}
                  </Link>
                </Typography>
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
                  <ListItem
                      key={index}
                      onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to={item.Link}>
                    <ListItemText primary={item.Name} />
                    </Link>
                  </ListItem>
              ))}
            </List>
          </Box>
          <Typography variant='h4' sx={{
            padding: '50px'
          }}>
           <Link to='/help' >  Get Help   </Link>
          </Typography>
          <Link to='/help' >  <span>Or Message Us</span> </Link>
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
