import { createSlice, nanoid } from "@reduxjs/toolkit"
import { mockTransactions } from '../data/mockData.js'

const initialState = {
    transactions : mockTransactions,
}

export const TransactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: {
            reducer:(state, action) => {
             state.transactions.unshift(action.payload)
            },
            prepare: (transaction) => {
                return {
                    payload: {
                        id: nanoid(),
                        date: transaction.date || new Date().toISOString(),
                        amount: Number(transaction.amount),
                        type: transaction.type,
                        category:transaction.category,
                        note: transaction.note || ''
                    }
                }
            }
        },
        deleteTransaction: (state, action) => {
            state.transactions = state.transactions.filter((transaction) => action.payload !== transaction.id)
        },
    },
})

export const {
    addTransaction,
    deleteTransaction,
} = TransactionSlice.actions;

export default TransactionSlice.reducer