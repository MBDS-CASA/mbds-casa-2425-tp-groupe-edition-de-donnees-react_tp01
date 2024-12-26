import React from 'react'




const Menu = ({ title, clickHandle, classname }) => {
    return (
        <a className='d-inline p-5 text-white text-decoration-none bg-secondary menu' onClick={clickHandle}>
            <span className={classname}>
                {title}
            </span>
        </a>

    );

}

export default Menu