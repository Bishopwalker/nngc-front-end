// useProtectedRoute.tsx
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../redux/hooks';

export const useProtectedRoute = () => {
    // Get the navigate function from useNavigate
    const navigate = useNavigate();

    // Get the role from Redux state and explicitly specify its type
    const role: any = useAppSelector((state) => state.userInfo.role);

    // Use useEffect to check the role
    useEffect(() => {
        // Check if role is not ADMIN
        if (role !== "ADMIN") {
            // Navigate to login if role is not ADMIN
            navigate('/login');
        }
    }, [role, navigate]); // Dependencies for useEffect
};
