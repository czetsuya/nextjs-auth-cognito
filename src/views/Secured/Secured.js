import React from 'react'
import useAuthentication from "../../hooks/useAuthentication";

const Secured = ({dispatch}) => {

    const auth = useAuthentication({dispatch});

    return (
        <>
            Username: {auth.user.username}
            <div>Secured</div>
        </>
    )
}

export default Secured