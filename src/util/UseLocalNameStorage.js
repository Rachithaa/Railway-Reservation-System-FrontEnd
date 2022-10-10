import {useEffect,useState} from "react";

function UseLocalNameStorage(defaultValue, key)
{
    const [name,setName] =useState(()=>{
        const localStorageValue = localStorage.getItem(key);

        return localStorageValue!=null? JSON.parse(localStorageValue) : defaultValue;
    });
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(name));
    }, [key,name]);

    return [name,setName];
}

export {UseLocalNameStorage};