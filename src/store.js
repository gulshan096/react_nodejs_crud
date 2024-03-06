import userDetail from './redux/Userdetail'

import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
    reducer: {
      userDetail
    },
})
