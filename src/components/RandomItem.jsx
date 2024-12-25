import React, { useState } from 'react';
import { getRandomItem } from '../utils';

function RandomItem({count}) {
    const [item, setItem] = useState(getRandomItem());

    const handleClick = () => {
        setItem(getRandomItem());
    };

    return (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <h1>{count}</h1>
            <h2>{item.course}</h2>
            <p>Student: {item.student.firstname} {item.student.lastname}</p>
            <p>Date: {item.date}</p>
            <p>Grade: {item.grade}</p>
            <button onClick={handleClick}>Get Random Item</button>
        </div>
    );
}

export default RandomItem;
