import { createSlice } from '@reduxjs/toolkit'


let initialState = {
   user : localStorage.getItem('user')
}

export const userDetail = createSlice({
  name: 'userDetail',
  initialState,
  reducers: {
    getOneUser: (state, action) => {
        const getOneUser = action.payload.user
        localStorage.setItem('user',JSON.stringify(getOneUser))
    },
  },
})

export const { getOneUser } = userDetail.actions
export default userDetail.reducer