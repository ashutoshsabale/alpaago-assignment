import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// importing router
import { createRoutesFromElements, createBrowserRouter, Route, RouterProvider } from 'react-router-dom'

// import all comopnents
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import Home from './pages/Home.jsx'
import ActiveUsersTable from './pages/ActiveUsersTable.jsx'
import { FirebaseProvider } from './firebase/Firebase.jsx';

// Creating routes
const router = createBrowserRouter(createRoutesFromElements(
	<Route path='/' element= {<App />}>
		<Route path='/' element={<Home />} />
		<Route path='/login' element={<Login />} />
		<Route path='/register' element={<Register />} />
		<Route path='/user-info' element={<ActiveUsersTable />} />
	</Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<FirebaseProvider>
			<RouterProvider router={router}/>
		</FirebaseProvider>
	</React.StrictMode>,
)
