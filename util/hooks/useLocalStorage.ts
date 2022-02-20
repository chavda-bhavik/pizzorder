import { useState, useEffect } from "react";

function useLocalStorage<T>(storageKey: string, initialValue: any): [T, (value: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    useEffect(() => {
        // Run on browser
        if (typeof window !== 'undefined') {
            // Get from local storage by key
            const item = window.localStorage.getItem(storageKey);
            // Parse stored json or if none return an empty object
            if (item) setStoredValue(JSON.parse(item));
        }
    }, [storageKey]);

    const setValue = (value: T) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save to local storage
            window.localStorage.setItem(storageKey, JSON.stringify(valueToStore));
            // Save state
            setStoredValue(valueToStore);
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };

    return [storedValue, setValue]
}

export default useLocalStorage;