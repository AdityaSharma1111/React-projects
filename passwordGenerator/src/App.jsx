import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'
import { use } from 'react'

function App() {
  const [length, setLength] = useState(6)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null) // useRef is used to get the reference of the input element

  const generatePassword = useCallback(() => { 
    // for optimal performance, we are using the useCallback hook
    // useCallback is used to prevent the function from being recreated on every render
    // it memoizes the function so that it is only recreated when the dependencies change
    // it takes two arguments, the function and an array of dependencies(when the function should be recreated)
    let password = ""
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numAllowed) {
      charset += "0123456789"
    }
    if(charAllowed) {
      charset += "!@#$%^&_+"
    }
    for(let i=1; i<=length; i++) {
      const random = Math.floor(Math.random() * charset.length)
      password += charset.charAt(random)
    }
    setPassword(password)
  } , [length, numAllowed, charAllowed, setPassword])
  // if we send password as a dependency, it will cause an infinite loop because the function will be recreated every time the password changes
  // we are sending setPassword as a dependency because it is a function and it will not change, it memoizes the function
  // everytime the dependencies change, the function is recreated and the new function is memoized
  // it optimizes the method by preventing the function from being recreated on every render


  const copyPwdToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(() => {
    // run the method whenever the dependencies change
    generatePassword()
  }, [length, numAllowed, charAllowed, generatePassword])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className='text-white text-center my-3'>Password generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input 
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
             />
            <button onClick={copyPwdToClipboard} className='hover:bg-blue-800 outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input 
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}} // onChange fires every time the input value changes
              // e.target.value is the value of the input
               />
              <label>Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                  type="checkbox"
                  defaultChecked={charAllowed}
                  id="characterInput"
                  onChange={() => {
                      setCharAllowed((prev) => !prev )
                  }}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                  type="checkbox"
                  defaultChecked={numAllowed}
                  id="numberInput"
                  onChange={() => {
                      setNumAllowed((prev) => !prev);
                  }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
          </div>
      </div>
    </>
  )
}

export default App
