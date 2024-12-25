import { useState } from 'react';

function Form(){
    const [data, setData] = useState({
        name: '',
        email: '',
    })
    function onDataChange(e){
        setData({
            ...data, 
            [e.target.name]: e.target.value
        })
    }
    function onSubmit(){
        console.log(data)
    }
    return(
        <div style={{textAlign: 'center'}}>
            <h1>Form</h1>
            <p>Name: {data.name}</p><p>Email: {data.email}</p>
            <form>
                <p><input type="text" name="name" value={data.name} onChange={onDataChange} /></p>
                
                <p><input type="email" name="email" value={data.email} onChange={onDataChange} /></p>
                <button type="button" onClick={onSubmit}>Submit</button>
            </form>
            
        </div>
    )
}
export default Form