// src/interfaces/UserInfo.ts

export interface Address {
    line1: string;
    line2: string;
    city: string;
    state: string;
    zipCode: number;
    latitude: number;
    longitude: number;
}

export interface Authority {
    authority: string;
}

export interface UserInfo {
    id: string;
    fullName: string;
    email: string;
    password?: string;
    phoneNumber: string;
    address: Address;
    geoLocation: string;
    enabled: boolean;
    stripeCustomerId: string;
    transactionHistory: any[]; // Replace 'any' with a more specific type if you know the structure of transaction history objects
    authorities: Authority[];
    isLoggedIn: boolean;
    loginAttemptCount: number;
    receiptURL?: string;
    invoiceURL?: string;
    token: string;
    accountPage: string;


}
