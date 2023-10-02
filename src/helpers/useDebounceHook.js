import {useEffect} from "react";
import {useState} from "react";

export default function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => clearTimeout(timeOut);
    }, [value]);

    return debounceValue;
}