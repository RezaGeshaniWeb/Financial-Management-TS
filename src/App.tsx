import FinancialManagement from './components/FinancialManagement'
import './tailwind.css'

function App() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="w-full max-w-xl px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Financial Management - TS
        </h2>
        <FinancialManagement />
      </div>
    </main>
  )
}

export default App
