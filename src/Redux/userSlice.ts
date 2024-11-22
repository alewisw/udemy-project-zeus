import { createSlice } from "@reduxjs/toolkit";
import { userType } from "../Types";
import { User } from "@firebase/auth";

export const USER_STORAGE_NAME = "zeus.user";

export const defaultUser: userType = {
  id: "",
  img: "",
  isOnline: false,
  username: "Unknown",
  email: "",
  bio: "",
};

export interface UserState {
  authUserUid?: string;

  user: userType[];
  currentUser: userType;
  currentSelectedUser: userType | undefined;
}

const initialState: UserState = {
  authUserUid: undefined,
  user: [],
  currentUser: defaultUser,
  currentSelectedUser: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setAuthUserUid: (state, action) => {
      state.authUserUid = action.payload;
    },

    setUser: (state, action) => {
      const user = action.payload;

      // Store to local storage.
      localStorage.setItem(USER_STORAGE_NAME, JSON.stringify(user));

      // Set currently logged in user.
      state.currentUser = action.payload;
    },

    setUsers: (state, action) => {
      // Set all users currently in the database.
    },
  },
});

export const { setAuthUserUid, setUser, setUsers } = userSlice.actions;
export default userSlice.reducer;
