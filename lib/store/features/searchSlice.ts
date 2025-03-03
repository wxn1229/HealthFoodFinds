import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import { HealthFoodInfo } from "@/lib/types/search";

interface DateFormat {
  calendar: {
    identifier: string;
  };
  era: string;
  year: number;
  month: number;
  day: number;
}

interface SearchResponse {
  code: number;
  results: HealthFoodInfo[];
  count: number;
}

export const fetchSearchResults = createAsyncThunk(
  "search/fetchResults",
  async (_, { getState }) => {
    const state = getState() as { search: SearchState };
    const {
      keypoint,
      id,
      startDate,
      endDate,
      applicant,
      certification,
      ingredient,
      benefit,
      page,
      orderBy,
      orderDir,
    } = state.search;

    const formatDate = (dateString: string | null): DateFormat | null => {
      if (!dateString) return null;
      const date = new Date(dateString);
      return {
        calendar: {
          identifier: "gregory",
        },
        era: "AD",
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      };
    };

    try {
      const { data } = await axios.post<SearchResponse>(
        "/searching/multisearching",
        {
          keypoint,
          id,
          start_date: formatDate(startDate),
          end_date: formatDate(endDate),
          applicant,
          certification,
          ingredient,
          benefit,
          page,
          orderBy,
          orderDir,
        }
      );

      return data;
    } catch (error) {
      throw error;
    }
  }
);

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
  loading: boolean;
  error: string | null;
  results: SearchResponse["results"];
  totalCount: number;
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
  loading: false,
  error: null,
  results: [],
  totalCount: 0,
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
    clearSearchCondition: (state) => {
      state.keypoint = "";
      state.applicant = "";
      state.certification = "";
      state.ingredient = "";
      state.benefit = "";
      state.id = "";
      state.startDate = null;
      state.endDate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.results;
        state.totalCount = action.payload.count;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "發生錯誤";
      });
  },
});

export const {
  setSearchCondition,
  setSearchPage,
  setSearchOrderBy,
  setSearchOrderDir,
  clearSearchCondition,
} = searchSlice.actions;

export default searchSlice.reducer;
