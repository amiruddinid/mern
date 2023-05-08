import React, { useState, useEffect, useRef } from 'react';

export default function List() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        let ignore = false;
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => {
                if (!ignore) setItems(data)
            });
        return () => {
            ignore = true;
        };
    }, []);

    return (
        <>
            <h1>Fetch Items</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </>
    );
}