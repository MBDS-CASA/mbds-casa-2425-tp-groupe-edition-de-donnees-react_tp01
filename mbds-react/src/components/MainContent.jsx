// src/MainContent.jsx
function MainContent() {
    const now = new Date();
    const day = now.toLocaleString('default', { weekday: 'long' });
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();
    const time = now.toLocaleTimeString();

    return (
        <main>
            <p>Bonjour, on est le {day}, {month}, {year} et il est {time}</p>
        </main>
    );
}

export default MainContent;