import { useState, useEffect } from 'react'

export default function (key: string, defaultValue: string = ''):
    [string, React.Dispatch<React.SetStateAction<string>>] {
    const [value, setValue] = useState(
        localStorage.getItem(key) || defaultValue
    );

    useEffect(() => {
        value && localStorage.setItem(key, value);
    }, [value, key]);

    return [value, setValue];
};