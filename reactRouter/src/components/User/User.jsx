import React from 'react'
import { useParams } from 'react-router-dom' // useParams is a hook that allows you to access the URL parameters

function User() {
    const {id} = useParams()
    return (
    <div className='flex justify-center bg-gray-600 text-white text-3xl p-4'>User: {id}</div>
    )
}

export default User