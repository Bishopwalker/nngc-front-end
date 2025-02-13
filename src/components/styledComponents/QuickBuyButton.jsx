
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {
  StyledRoot,
  StyledNewLabel,
  StyledButton,
  StyledButtonText
} from './QuickButtonStyles';

const QuickBuyButton = ({ title = "Quick Buy" }) => { // Added default title
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isSmallScreen = isMobile || isTablet;

  return (
      <StyledRoot
          sx={{
              flexDirection: isSmallScreen ? 'column' : 'row',
              gap: isSmallScreen ? 2 : 0,
              justifyContent: isSmallScreen ? 'center' : 'flex-end', // Align to right on full screen
              paddingRight: isSmallScreen ? 0 : 2, // Add some padding from the right edge
          }}
      >
          <StyledNewLabel variant="h5" sx={{
              paddingRight: isSmallScreen ? -20 : 0, // Set to exactly 50px on full screen
          }}>
              No time to Chat? Just need service? Click the blue button
          </StyledNewLabel>


          <Link
            to='/junk'
            style={{ textDecoration: 'none' }}
        >
          <StyledButton>
            <ShoppingCartIcon
                sx={{
                  color: '#ffffff',
                  fontSize: isMobile ? 20 : isTablet ? 24 : 28, // Specific pixel sizes
                }}
            />
            <StyledButtonText>
              {isMobile ? 'Buy Now' : title}
            </StyledButtonText>
          </StyledButton>
        </Link>
      </StyledRoot>
  );
}

export default QuickBuyButton;
