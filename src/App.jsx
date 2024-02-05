import { useState } from 'react'
import Header from './components/header/Header'
import { Outlet } from 'react-router-dom'
import './App.css'


function App() {
	const [count, setCount] = useState(0)

	return (
		<div className='w-screen h-screen'>
            <Header />
            <Outlet />
        </div>
	)
}

export default App
