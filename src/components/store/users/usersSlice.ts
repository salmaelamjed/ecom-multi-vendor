import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@/types/shared";
import { isString } from "@/types/guard";
import { User } from "@/types/user";
import actGetUsers from "./act/actGetUsers";

interface IUser {
  records: User[];
  loading: TLoading;
  error: string | null;
}

const initialState: IUser = {
  records: [],
  loading: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    cleanUpUsersRecords: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetUsers.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetUsers.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetUsers.rejected, (state, action) => {
      state.loading = "failed";
      state.error = isString(action.payload) ? action.payload : "Unknown error";
    });
  },
});

export const { cleanUpUsersRecords } = usersSlice.actions;
export { actGetUsers };
export default usersSlice.reducer;
