import { combineReducers } from "@reduxjs/toolkit";
import countryReducer from "./countries/reducer";
import operatorReducer from "./operators/reducer";
import mobileNumLookupReducer from "./mobileLookup/reducer";
import productReducer from './products/reducer'

const rootReducer = combineReducers({
    countries: countryReducer,
    operators: operatorReducer,
    mobileNumLookup: mobileNumLookupReducer,
    products: productReducer,
});

export default rootReducer;