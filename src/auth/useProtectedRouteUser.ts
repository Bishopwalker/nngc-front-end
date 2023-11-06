// useProtectedRoute.tsx
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../redux/hooks';

export const useProtectedRouteUser = () => {
    // Get the navigate function from useNavigate
    const navigate = useNavigate();

    // Get the role from Redux state and explicitly specify its type
    const role: any = useAppSelector((state) => state.userInfo.customerDTO.role);
console.log(role)
    // Use useEffect to check the role
    useEffect(() => {
        // Check if role is not ADMIN
        if (role === null) {
            // Navigate to login if role is not ADMIN
            navigate('/gotoLogin');
        }
    }, [role, navigate]); // Dependencies for useEffect
};
