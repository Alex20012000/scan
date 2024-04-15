import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  authorization: false,
  companyLimit: "",
  currentToken: "data.payload.data.accessToken",
  error: false,
  histograms: null,
  loader: false,
  publication: [],
  publicationIds: [],
  riskFactors: [],
  totalDocuments: [],
  usedCompanyCount: "",
};

const url = "https://gateway.scan-interfax.ru";

export const getUser = createAsyncThunk(
  "authorization/getUser",
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${url}/api/v1/account/login`,
        { login, password },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const { data } = res;
      return { data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "authorization/getUserInfo",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${url}/api/v1/account/info`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      });
      return res.data.eventFiltersInfo;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getHistograms = createAsyncThunk(
  "histograms/getHistograms",
  async ({ token, startDate, endDate, inn, quantity }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${url}/api/v1/objectsearch/histograms`,
        {
          attributeFilters: {
            excludeAnnouncements: true,
            excludeDigests: true,
            excludeTechNews: true,
          },
          intervalType: "month",
          issueDateInterval: {
            endDate: endDate + "T23:59:59+03:00",
            startDate: startDate + "T00:00:00+03:00",
          },
          quantity,
          searchContext: {
            onlyMainRole: true,
            onlyWithRiskFactors: false,
            targetSearchEntitiesContext: {
              inBusinessNews: null,
              maxFullness: true,
              targetSearchEntities: [
                {
                  entityId: null,
                  inn,
                  maxFullness: true,
                  sparkId: null,
                  type: "company",
                },
              ],
              tonality: "any",
            },
          },
          similarMode: "duplicates",
          sortDirectionType: "desc",
          sortType: "sourceInfluence",
          histogramTypes: ["totalDocuments", "riskFactors"],
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        }
      );
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getObjectSearch = createAsyncThunk(
  "publication/getObjectSearch",
  async ({ token, startDate, endDate, inn, quantity }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${url}/api/v1/objectsearch`,
        {
          attributeFilters: {
            excludeAnnouncements: true,
            excludeDigests: true,
            excludeTechNews: true,
          },
          intervalType: "month",
          issueDateInterval: {
            endDate: endDate + "T23:59:59+03:00",
            startDate: startDate + "T00:00:00+03:00",
          },
          quantity,
          searchContext: {
            onlyMainRole: true,
            onlyWithRiskFactors: false,
            targetSearchEntitiesContext: {
              inBusinessNews: null,
              maxFullness: true,
              targetSearchEntities: [
                {
                  entityId: null,
                  inn,
                  maxFullness: true,
                  sparkId: null,
                  type: "company",
                },
              ],
              tonality: "any",
            },
          },
          similarMode: "duplicates",
          sortDirectionType: "desc",
          sortType: "sourceInfluence",
          histogramTypes: ["totalDocuments", "riskFactors"],
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        }
      );
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getObjectSearchId = createAsyncThunk(
  "publicationIds/getObjectSearchId",
  async ({ token, ids }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${url}/api/v1/documents`,
        { ids },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        }
      );
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const authorizationSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changePassOrLogin: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.authorization = false;
      state.currentToken = "";
    },
    saveToken: (state, action) => {
      state.currentToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.authorization = true;
        state.currentToken = action.payload.data.accessToken;
      })
      .addCase(getUser.rejected, (state) => {
        state.authorization = false;
        state.currentToken = "";
        state.error = true;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.loader = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loader = false;
        state.usedCompanyCount = action.payload.usedCompanyCount;
        state.companyLimit = action.payload.companyLimit;
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.loader = false;
      })
      .addCase(getHistograms.fulfilled, (state, action) => {
        state.histograms = action.payload.data;
      })
      .addCase(getObjectSearch.fulfilled, (state, action) => {
        state.publication = action.payload.data.items;
      })
      .addCase(getObjectSearchId.fulfilled, (state, action) => {
        state.publicationIds = action.payload.data;
      });
  },
});

export const { changePassOrLogin, logout, saveToken } =
  authorizationSlice.actions;
export default authorizationSlice.reducer;
