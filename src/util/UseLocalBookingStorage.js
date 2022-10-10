import {useEffect,useState} from "react";

function UseLocalBookingStorage(defaultValue, key)
{
    const [bookingId,setBookingId] =useState(()=>{
        const localStorageValue = localStorage.getItem(key);

        return localStorageValue!=null? JSON.parse(localStorageValue) : defaultValue;
    });
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(bookingId));
    }, [key,bookingId]);

    return [bookingId,setBookingId];
}

export {UseLocalBookingStorage};