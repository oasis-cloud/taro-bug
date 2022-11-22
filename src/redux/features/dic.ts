import { createSlice } from '@reduxjs/toolkit'

const dicSlice = createSlice({
  name: 'dic',
  initialState: [],
  reducers: {
    updateDic(state, action) {
      return action.payload
    },
  },
})

export const { updateDic } = dicSlice.actions
export default dicSlice.reducer
