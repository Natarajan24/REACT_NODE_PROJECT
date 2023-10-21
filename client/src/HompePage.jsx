import React, { useEffect } from 'react';



const HomePage = ({ onLogin }) => {

    useEffect(() => {
        setTimeout(() => {
            localStorage.removeItem("auth");
            onLogin();
        },300000)
    })

    return (<>
        <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', backgroundColor: 'gray' }}>
            <h1 >LOGIN SUCESSFULLY</h1>
        </div>
    </>)
}


export default HomePage;