import { createSlice } from '@reduxjs/toolkit'
import { Todo } from '../types/models'

interface todoList {
  todo: Todo[]
}

let initialState: todoList = {
  todo: []
}


const todoSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    set: (state, action) => {
      state.todo.push(action.payload)
      // console.log(action.payload)
    },
    delet: (state, action) => {
      state.todo.splice(action.payload.index, 1)
      // console.log(action.payload)
    },
    edit: (state, action) => {
      state.todo[action.payload.index].text = action.payload.name   
      
    },
    changeType: (state, action) => {
      state.todo[action.payload.id].type = action.payload.type
    },
  }
})

export const { set, delet, edit, changeType } = todoSlice.actions
export default todoSlice.reducer