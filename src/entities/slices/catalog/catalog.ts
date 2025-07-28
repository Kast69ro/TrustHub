import { createSlice } from "@reduxjs/toolkit";
import { getCatalog, Resource } from '../../api/catalog/catalog';

interface CatalogState {
  catalog: Resource[];
}

const initialState: CatalogState = {
  catalog: [], 
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder.addCase(getCatalog.fulfilled,(state,action)=>{
        state.catalog = action.payload
    })
  }
});


export default catalogSlice.reducer;
