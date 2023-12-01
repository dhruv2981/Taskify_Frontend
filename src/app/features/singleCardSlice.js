import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCardApi, updateCardApi, deleteCardApi } from "../../Apis/CardApi";

const singleCardSlice = createSlice({
  name: "singleCard",
  initialState: {
    card: {
      title: "",
      assignees: [],
      deadline: "",
      created_at: "",
      priority: "",
      is_resolved: "n",
      description: "",
      list: "",
      loading: "idle",
      error: "Card could not be retreived",
    },
  },
  reducers: {
    updateCardState: (state, action) => {
      const { updatedCard } = action.payload;
      state.card = updatedCard;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCard.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchCard.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.card = action.payload;
    });
    builder.addCase(fetchCard.rejected, (state, action) => {
      state.loading = "rejected";
      state.error = action.error.message;
    });
    builder.addCase(updateCard.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.card = action.payload;
    });
  },
});

export const fetchCard = createAsyncThunk("card/fetchCard", async (cardId) => {
  try {
    const response = await fetchCardApi(cardId);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Problem fetching card");
  }
});

export const updateCard = createAsyncThunk(
  "card/updateCards",
  async (object) => {
    try {
    const { cardId, newCard } = object;
    console.log(cardId);
    console.log(newCard,"object");
      const response = await updateCardApi(cardId, newCard);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Problem updating cards");
    }
  }
);

// export const deleteCard = createAsyncThunk(
//   "card/deleteCard",
//   async (cardId, newCard) => {
//     try {
//       await deleteCardApi(cardId);
//       return cardId;
//     } catch (error) {
//       console.log("Problem deleting cards");
//     }
//   }
// );

export const selectCard = (state) => state.singleCard.card;
export const { updateCardState } = singleCardSlice.actions;
export default singleCardSlice.reducer;
