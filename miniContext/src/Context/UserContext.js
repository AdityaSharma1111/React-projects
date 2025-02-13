import React from 'react';

const UserContext = React.createContext(); // created a context object, like a global variable
// it is used as a wrapper around the components that need access to the data it provides.

export default UserContext;