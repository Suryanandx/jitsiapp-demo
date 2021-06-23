import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from "../context/AuthContext"

const AppRoute = ({component: Component, layout: Layout, ...rest}) => {
  const { currentUser } = useAuth()
    return (
        <Route
        {...rest}
            render= {
                props =>  {
                    return (
                         <>
                            {currentUser? <Component {...props}/> : <Redirect to="/login"/>}
                        
                        </>
                    )
                }}
                    
            >
            
        </Route>
    )
}

export default AppRoute