
export const ContactEmailID = 'enquiry@abcd.com';
export const CurrencySybol = 'AED';
export const ContactMobile = '+91 00011100041';
export const ContactWhatsapp = '+91 023 123 1230';
export const defaultPreviewVideo = '';

export const BaseURL           = 'http://localhost:8000/api';
export const userRegisterURL   = `${BaseURL}/register`;
export const bookingListURL  = `${BaseURL}/booking_list`;
export const createBookingURL  = `${BaseURL}/create_booking`;
export const updateBookingURL  = `${BaseURL}/update_booking`;
export const userListURL       = `${BaseURL}/user_list`;
export const userUpdateURL     = `${BaseURL}/update_user`;
// export const userDeleteURL     = `${BaseURL}/delete_user/${id}`;
export const phonepePaymentURL = `${BaseURL}/phonepe/payment`;


// RENATL pROJECT apI FROM HERE



export function getCurrency() {
    let returnValue = "USD";
    if (localStorage.getItem('country_name') === 'India') {
        returnValue = "INR";
    }
    if (localStorage.getItem('country_name') === 'United Arab Emirates') {
        returnValue = "AED";
    }
    return returnValue;
}






