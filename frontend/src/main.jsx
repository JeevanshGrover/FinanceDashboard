import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { Provider } from "react-redux"
import { store } from './store/store.js'
import Dashboard from './pages/Dashboard.jsx'
import Transactions from './pages/Transactions.jsx'
import Insights from './pages/Insights.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element= {<App />}>
      <Route index element = {<Dashboard/>}/>
      <Route path = 'transactions' element = {<Transactions/>}/>
      <Route path = 'insights' element = {<Insights/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <RouterProvider router = {router} />
  </Provider>,
)
