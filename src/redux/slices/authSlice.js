import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../features/auth/authService";

// async thunks
export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try { return await authService.register(userData); }
  catch (err) { return thunkAPI.rejectWithValue(err.response?.data || { error: 'Register failed' }); }
});

export const verifyOtp = createAsyncThunk("auth/verifyOtp", async (payload, thunkAPI) => {
  try { return await authService.verifyOtp(payload); }
  catch (err) { return thunkAPI.rejectWithValue(err.response?.data || { error: 'OTP failed' }); }
});

export const loginUser = createAsyncThunk("auth/login", async (creds, thunkAPI) => {
  try { return await authService.login(creds); }
  catch (err) { return thunkAPI.rejectWithValue(err.response?.data || { error: 'Login failed' }); }
});

export const fetchSession = createAsyncThunk("auth/fetchSession", async (_, thunkAPI) => {
  try { return await authService.fetchSession(); }
  catch (err) { return thunkAPI.rejectWithValue(null); }
});

export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try { return await authService.logout(); }
  catch (err) { return thunkAPI.rejectWithValue(null); }
});

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) { state.user = action.payload; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        // backend returns { message, session } as you wrote earlier
        state.user = action.payload.session || action.payload.user || action.payload;
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload?.error || "Login failed";
        state.status = "failed";
      })

      .addCase(registerUser.fulfilled, (state) => { state.status = "registered"; })
      .addCase(registerUser.rejected, (state, action) => { state.error = action.payload?.error; })

      .addCase(verifyOtp.fulfilled, (state, action) => { state.status = "verified"; })
      .addCase(verifyOtp.rejected, (state, action) => { state.error = action.payload?.error; })

      .addCase(fetchSession.fulfilled, (state, action) => { state.user = action.payload.user; })
      .addCase(fetchSession.rejected, (state) => { state.user = null; })

      .addCase(logoutUser.fulfilled, (state) => { state.user = null; });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
