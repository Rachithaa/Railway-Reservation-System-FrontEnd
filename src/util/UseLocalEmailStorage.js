import {useEffect,useState} from "react";

function UseLocalEmailStorage(defaultValue, key)
{
    const [email,setEmail] =useState(()=>{
        const localStorageValue = localStorage.getItem(key);

        return localStorageValue!=null? JSON.parse(localStorageValue) : defaultValue;
    });
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(email));
    }, [key,email]);

    return [email,setEmail];
}

export {UseLocalEmailStorage};