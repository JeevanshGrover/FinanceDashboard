import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    transactions : [],
    filters: {
        type: 'all',
        category: 'all'
    },
    role : 'viewer' 
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
                        category:transaction.type,
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