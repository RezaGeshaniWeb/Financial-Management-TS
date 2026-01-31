import { useEffect, useState } from "react"
import type { Transaction } from "../transactions"

export default function FinancialManagement() {
    const [transaction, setTransaction] = useState<Transaction[]>(() => {
        const savedTransactions = localStorage.getItem("transactions")
        return savedTransactions ? JSON.parse(savedTransactions) : []
    })

    const [text, setText] = useState<string>('')
    const [amount, setAmount] = useState<string>('')

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transaction))
    }, [transaction])

    const addTransaction = () => {
        if (!text || !amount) return

        const newTransaction: Transaction = {
            id: Date.now(),
            text,
            amount: parseFloat(amount)
        }
        setTransaction([newTransaction, ...transaction])
        setText('')
        setAmount('')
    }

    const deleteTransaction = (id: number) => {
        setTransaction(transaction.filter(item => item.id != id))
    }

    let total = 0
    transaction.map(item => total += item.amount)

    let income = 0
    let expense = 0
    transaction.map(item => {
        if (item.amount > 0) {
            income += item.amount
        } else {
            expense += item.amount
        }
    })

    return (
        <div className="bg-slate-700/40 backdrop-blur-md rounded-2xl p-6 shadow-xl space-y-6 text-white">

            {/* Balance */}
            <h3 className="text-center text-2xl font-bold text-yellow-400">
                Balance: $ {total}
            </h3>

            {/* Income / Expense */}
            <div className="grid grid-cols-2 gap-4 text-center">
                <p className="bg-slate-800 rounded-xl p-3 text-green-400 font-medium">
                    Income: $ {income}
                </p>
                <p className="bg-slate-800 rounded-xl p-3 text-red-400 font-medium">
                    Expense: $ {Math.abs(expense)}
                </p>
            </div>

            {/* Add Transaction */}
            <div className="space-y-3">
                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    type="text"
                    placeholder="Enter Description"
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    type="number"
                    placeholder="Enter Amount"
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                    onClick={addTransaction}
                    className="cursor-pointer w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-medium"
                >
                    Add Transaction
                </button>
            </div>

            {/* Transactions */}
            <ul className="space-y-2 max-h-60 overflow-y-auto">
                {
                    transaction.map(item => (
                        <li
                            key={item.id}
                            className={`flex justify-between items-center px-4 py-2 rounded-lg bg-slate-800 border-l-4 ${item.amount > 0 ? "border-green-500 text-green-400" : "border-red-500 text-red-400"
                                }`}
                        >
                            <span>
                                {item.text} : {item.amount}
                            </span>

                            <button
                                onClick={() => deleteTransaction(item.id)}
                                className="text-slate-400 hover:text-red-400 transition text-xl cursor-pointer"
                            >
                                &times;
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
