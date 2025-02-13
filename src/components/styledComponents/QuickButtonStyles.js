// QuickButtonStyles.js
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%'
}));

export const StyledNewLabel = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    textAlign: 'center',
    width: '100%'
}));

export const StyledLink = styled('a')(({ theme }) => ({
    textDecoration: 'none',
    display: 'inline-block'
}));

export const StyledButton = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));

export const StyledButtonText = styled(Typography)(({ theme }) => ({
    color: theme.palette.common.white,
    marginLeft: theme.spacing(1),
}));
