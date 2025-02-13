import React from 'react';
import UserContext from './UserContext';

const UserContextProvider = ({children}) => { // children is used as a generic prop to pass components as data to other components
    const [user, setUser] = React.useState(null)
    // UserContext.Provider is a component that takes a value prop to be passed to consuming components that are descendants of this Provider.
    // children is a special prop that gets passed to components automatically.
    // The UserContext.Provider component is used to provide the user and setUser to all the components that are descendants of this component.
    // passing the user and setUser to the provider
    return (
        <UserContext.Provider value = {{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;