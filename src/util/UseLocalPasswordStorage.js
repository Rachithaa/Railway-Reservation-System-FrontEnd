import {useEffect,useState} from "react";

function UseLocalPasswordStorage(defaultValue, key)
{
    const [password,setPassword] =useState(()=>{
        const localStorageValue = localStorage.getItem(key);

        return localStorageValue!=null? JSON.parse(localStorageValue) : defaultValue;
    });
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(password));
    }, [key,password]);

    return [password,setPassword];
}

export {UseLocalPasswordStorage};