import { configureStore } from '@reduxjs/toolkit'
import formReducer from './data.slice'

const store = configureStore({
  reducer: {
    form: formReducer,
  },
})

export default store
