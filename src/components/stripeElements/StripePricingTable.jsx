// src/components/StripePricingTable.js
import React from 'react';
import {useProtectedRouteUser} from "../../auth/useProtectedRouteUser";

const StripePricingTable = () => {
    useProtectedRouteUser();
    return (
            <stripe-pricing-table pricing-table-id="prctbl_1NzeymACOG92rmQ4QdQSHtfI"
                          publishable-key="pk_test_51MiJlWACOG92rmQ4z6SuHJloUt4tyzhjcC1YhyDfFBsYvZMp12Ykgn2C7UF0pBoKUTZCuRFKjmm8Cjte0ESC1w6o00BsgOUgc4">
    </stripe-pricing-table>
    );
};

export default StripePricingTable;
