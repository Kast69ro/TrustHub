import { createSlice } from "@reduxjs/toolkit";
import { getCatalog, Resource,  getCatalogById } from '../../api/catalog/catalog';

interface CatalogState {
  catalog: Resource[],
  catalogById: Resource | null, // логичнее хранить один ресурс, а не массив
}

const initialState: CatalogState = {
  catalog: [], 
  catalogById: null,
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCatalog.fulfilled, (state, action) => {
      state.catalog = action.payload;
    });

    builder.addCase(getCatalogById.fulfilled, (state, action) => {
      state.catalogById = action.payload; 
    });
  }
});

export default catalogSlice.reducer;
