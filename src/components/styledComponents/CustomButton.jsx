import {Box, Typography} from "@mui/material";
import {css} from '@emotion/react';

const StyledButton = css`
  text-align: left;
  font-weight: bold;
  display: flex;
  flex-direction: row;  // Ensure the flex direction is row
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const PlusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20">
        <path fill="#1C8200" d="M9.999,2.141 C10.5512847,2.141 10.999,2.58871525 10.999,3.141 L10.999,8.994 L16.862,8.994 C17.4142847,8.994 17.862,9.44171525 17.862,9.994 C17.862,10.259911 17.7560964,10.514873 17.567694,10.7025248 C17.3792916,10.8901765 17.1239089,10.9950636 16.858,10.994 L10.999,10.994 L10.999,16.86 C10.999,17.4122847 10.5512847,17.86 9.999,17.86 C9.44671525,17.86 8.999,17.4122847 8.999,16.86 L8.999,10.994 L3.145,10.994 C2.59271525,10.994 2.145,10.5462847 2.145,9.994 C2.145,9.44171525 2.59271525,8.994 3.145,8.994 L8.999,8.994 L8.999,3.141 C8.999,2.58871525 9.44671525,2.141 9.999,2.141 Z"></path>
    </svg>
);
const MinusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20">
        <path fill="#1C8200" d="M3 10h14c0.6 0 1-0.4 1-1s-0.4-1-1-1H3c-0.6 0-1 0.4-1 1s0.4 1 1 1z"></path>
    </svg>
);

const CustomButton = ({ title, isOpen, onClick }) => {
    return (
        <Box onClick={onClick} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                {title}
            </Typography>
            <div style={{ display: 'inline-block' }}>
                {isOpen ? <MinusIcon /> : <PlusIcon />}
            </div>
        </Box>
    );
};
export default CustomButton;