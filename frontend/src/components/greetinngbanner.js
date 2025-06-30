import React from 'react';


const Greetingbanner = (user) => {
     
        return(

            <div>
            <h2>
                 WELCOME{user ? user.name :"can u pls login"} 
            </h2>

            </div>
        )


    }

    
export default Greetingbanner