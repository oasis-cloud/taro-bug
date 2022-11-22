import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import dic from './features/dic'

export const store = configureStore({
  middleware: [logger],
  reducer: {
    dic,
  },
})
