import {Box, Button} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 175,
    right: 250,
    display: 'flex',
    alignItems: 'center',
    zIndex: 1,
    '@media (max-width: 800px)': {
      display: 'none',
    }
  },
  button: {
    backgroundColor: '#FF0000', // bright red color
    color: '#FFFFFF', // white text
    borderRadius: '50%', // make the button round
    height: '125px',
    width: '100px',
    '&:hover': {
      backgroundColor: '#FF0000', // keep the color on hover
    },
  },
  newLabel: {
    marginRight:'10px',
    padding: '5px 10px',
    color:'#55a8ec',
    fontWeight: 'bold',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
    borderRadius: '5px',
    backgroundColor: '#efe9e9',
  },
  link:{
    textDecoration: 'none',
    color: 'inherit',

  }
});

const QuickBuyButton = ({ title }) => {
  const classes = useStyles();

  return (
    <Box component='div' className={classes.root}  sx={{

    }} >
    <Box className={classes.newLabel}>
      <Typography varint='link' to='/home'>
        New
      </Typography>

    </Box>
      <Link to='/junk' className={classes.link} >
<Box className={classes.button}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          {title}
        </Typography>
</Box>
        </Link>
    </Box>
  );
}
export default QuickBuyButton;