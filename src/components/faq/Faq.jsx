import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import {css} from '@emotion/react';
import {Box} from "@mui/material";
import CustomButton from "../styledComponents/CustomButton.jsx";

// Emotion styling
const accordionStyle = css`
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const contentStyle = css`
  padding: 10px;
  
`;

const AccordionItem = ({ title, content }) => {
    // State to manage accordion open/close
    const [isOpen, setIsOpen] = useState(false);

    // Toggle accordion open/close
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };
    return (
        <Box css={accordionStyle}>
            <CustomButton isOpen={isOpen} title={title} onClick={toggleAccordion} />
            <hr style={{ margin: '0' }} />
            {isOpen && (
                <Box css={contentStyle}>
                    <Typography variant="body1">
                        {content}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};
export default AccordionItem;
