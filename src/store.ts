import {configureStore } from '@reduxjs/toolkit'
import todoSlice from './reducers/todoSlice'

 export const store = configureStore({
    reducer: todoSlice
  })

  export type Root = ReturnType<typeof store.getState>


  