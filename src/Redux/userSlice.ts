import { createSlice } from "@reduxjs/toolkit";
import { userType } from "../Types";

export const defaultUser: userType = {
  id: "",
  img: "",
  isOnline: false,
  username: "Unknown",
  email: "",
  bio: "",
};

export interface UserState {
  value: number;
}

const initialState: UserState = {
  value: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      // Set currently logged in user.
    },

    setUsers: (state, action) => {
      // Set all users currently in the database.
    },
  },
});

export const { setUser, setUsers } = userSlice.actions;
export default userSlice.reducer;
