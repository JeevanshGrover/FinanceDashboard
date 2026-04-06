import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header.jsx'
import Sidebar from './components/sidebar/Sidebar.jsx'
import AddTransactionCard from './components/transactions/AddTransactionCard.jsx'

function App() {
  const theme = useSelector((state) => state.ui.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] [font-family:var(--font-body)] transition-colors duration-200">
      <Sidebar />
      <div className="flex min-h-screen flex-col md:ml-64">
        <Header />
        <div className="overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>
      <AddTransactionCard/>
    </div>
  )
}

export default App
