import React, { useEffect } from 'react';



const HomePage = ({ onLogin }) => {

    useEffect(() => {
        setTimeout(() => {
            localStorage.removeItem("auth");
            alert("After 5 minutes automatically logout to move login screen")
            onLogin();
        }, 5000)
    })

    return (<>
        <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', backgroundColor: 'gray' }}>
            <h1 >LOGIN SUCESSFULLY</h1>
        </div>
    </>)
}


export default HomePage;