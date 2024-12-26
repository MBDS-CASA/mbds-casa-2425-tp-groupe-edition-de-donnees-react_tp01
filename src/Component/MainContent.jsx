import React from 'react'

const MainContent = () => {
    const date = new Date();
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return (

        <main>
            <button className='btn btn-secondary'>{day} /{month} / {year}</button>   <button className='btn btn-danger'>{hour}:{minute}:{second}</button>

        </main>
    )
}

export default MainContent