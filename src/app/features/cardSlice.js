import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCardApi,
  fetchCardApi,
  fetchCardsApi,
  updateCardApi,
  deleteCardApi,
} from "../../Apis/CardApi";

const cardSlice = createSlice({
  name: "card",
  initialState: {
    
    card: {
    title :'',
    assignees:[],
    deadline:'',
    created_at:'',
    priority:'',
    is_resolved:'n',
    description:'',
    list:'',
    },

    loading: "idle",
    error: "Cards could not be retreived",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCard.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchCard.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.cards = action.payload;
    });
    builder.addCase(fetchCard.rejected, (state, action) => {
      state.loading = "rejected";
      state.error = action.error.message;
    });
    builder.addCase(createCard.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.cards.push(action.payload);
    });
  },
});

export const fetchCards = createAsyncThunk(
  "card/fetchCards",
  async () => {
    try {
      const response = await fetchCardsApi();
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Problem fetching cards");
    }
  }
);

export const fetchCard = createAsyncThunk(
  "card/fetchCards",
  async (cardId) => {
    try {
      const response = await fetchCardApi(cardId);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Problem fetching card");
    }
  }
);

export const createCard = createAsyncThunk(
  "card/Cards",
  async (newCard) => {
    try {
      const response = await createCardApi(newCard);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Problem creating cards");
    }
  }
);

// export const updateCard = createAsyncThunk(
//   "card/updateCards",
//   async (cardId, newCard) => {
//     try {
//       const response = await updateCardApi(cardId, newCard);
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       console.log("Problem updating cards");
//     }
//   }
// );

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

//action

//reducer

//     .then(response=>{
//         setCardList(response.data)})
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);
export const selectCard = (state) => state.card.card;
export default cardSlice.reducer;
