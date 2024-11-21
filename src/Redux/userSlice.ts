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
  user: userType[];
  currentUser: userType;
  currentSelectedUser: userType | undefined;
}

const initialState: UserState = {
  user: [],
  currentUser: defaultUser,
  currentSelectedUser: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action);
      // Set currently logged in user.
      //state.currentUser = action.payload
    },

    setUsers: (state, action) => {
      // Set all users currently in the database.
    },
  },
});

export const { setUser, setUsers } = userSlice.actions;
export default userSlice.reducer;
