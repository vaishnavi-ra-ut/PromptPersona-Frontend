import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Async Thunks
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/routes/Fav/favorites");
      return res.data.favorites.map((p) => p._id);
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch favorites");
    }
  }
);

export const toggleFavorite = createAsyncThunk(
  "favorites/toggleFavorite",
  async (personaId, { getState, rejectWithValue }) => {
    const { favorites } = getState().favorites;
    const isFav = favorites.includes(personaId);

    try {
      if (isFav) {
        await API.delete(`/routes/Fav/favorites/${personaId}`);
        return { personaId, action: "remove" };
      } else {
        await API.post(`/routes/Fav/favorites/${personaId}`);
        return { personaId, action: "add" };
      }
    } catch (err) {
      return rejectWithValue("Toggle favorite failed");
    }
  }
);

// Slice
const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const { personaId, action: act } = action.payload;
        if (act === "add") {
          state.favorites.push(personaId);
        } else {
          state.favorites = state.favorites.filter((id) => id !== personaId);
        }
      });
  },
});

export default favoriteSlice.reducer;
