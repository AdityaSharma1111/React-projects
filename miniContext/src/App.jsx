import './App.css'
import Login from './components/Login'
import Profile from './components/Profile'
import UserContextProvider from './Context/UserContextProvider'

function App() {

  return (
    // now we will get access to all the data and functions that are passed to the UserContext.Provider
    <UserContextProvider>
      <h1>Hello world !!</h1>
      <Login />
      <Profile />
    </UserContextProvider>
  )
}

export default App
