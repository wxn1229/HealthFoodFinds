import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  keypoint: string;
  applicant: string;
  certification: string;
  ingredient: string;
  benefit: string;
  id: string;
  startDate: string | null;
  endDate: string | null;
  page: number;
  orderBy: string;
  orderDir: string;
}
const initialState: SearchState = {
  keypoint: "",
  applicant: "",
  certification: "",
  ingredient: "",
  benefit: "",
  id: "",
  startDate: null,
  endDate: null,
  page: 1,
  orderBy: "desc",
  orderDir: "id",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchCondition: (state, action) => {
      state.keypoint = action.payload.keypoint;
      state.applicant = action.payload.applicant;
      state.certification = action.payload.certification;
      state.ingredient = action.payload.ingredient;
      state.benefit = action.payload.benefit;
      state.id = action.payload.id;
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
    setSearchPage: (state, action) => {
      state.page = action.payload;
    },
    setSearchOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
    setSearchOrderDir: (state, action) => {
      state.orderDir = action.payload;
    },
  },
});

export const {
  setSearchCondition,
  setSearchPage,
  setSearchOrderBy,
  setSearchOrderDir,
} = searchSlice.actions;

export default searchSlice.reducer;
