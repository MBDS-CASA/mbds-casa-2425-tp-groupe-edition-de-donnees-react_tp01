import React from "react";

function MainContent() {
    const now = new Date();
    const day = now.toLocaleString('default', { weekday: 'long' });
    const month = now.toLocaleString('default', { month: 'long' });
    const date = now.getDate();
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <p>Bonjour, on est le {day}, {date} {month} {year} et il est {hours}:{minutes}:{seconds}</p>
        </div>
    );
}

export default MainContent;