import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk ile GET isteği
// fetchProducts async thunk
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (query) => {
    try {
        const response = await axios.get(`https://5fc9346b2af77700165ae514.mockapi.io/products?limit=12&${query}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
});

export const orderProducts = createAsyncThunk('products/orderProducts', async ({query, sortBy}) => {
    try {
        const response = await axios.get(`https://5fc9346b2af77700165ae514.mockapi.io/products?limit=12&${query}`);

        let sortedData;

        switch (sortBy) {
            case 'OldToNew':
                sortedData = response.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'NewToOld':
                sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'PriceHighToLow':
                sortedData = response.data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
                break;
            case 'PriceLowToHigh':
                sortedData = response.data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                break;
            default:
                sortedData = response.data;
                break;
        }

        return sortedData;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
});

export const search = createAsyncThunk('products/search', async ({searchTerm, searchType}) => {
    try {
        const response = await axios.get('https://5fc9346b2af77700165ae514.mockapi.io/products?limit=12');

        let filteredData;

        switch (searchType) {
            case 'brands':
                // eslint-disable-next-line no-case-declarations
                const uniqueBrands = [...new Set(response.data.map(product => product.brand))];
                filteredData = uniqueBrands.filter(brand => brand.toLowerCase().includes(searchTerm.toLowerCase()));
                break;
            case 'models':
                // eslint-disable-next-line no-case-declarations
                const uniqueModels = [...new Set(response.data.map(product => product.model))];
                filteredData = uniqueModels.filter(model => model.toLowerCase().includes(searchTerm.toLowerCase()));
                break;
            default:
                filteredData = response.data;
                break;
        }

        return filteredData;
    } catch (error) {
        console.error('Error searching:', error);
        throw error;
    }
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        brands: [],
        models: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
                //brands
                if (state.brands?.length === 0) {
                    state.brands = action.payload.map(product => product?.brand);
                }

                if (state.models?.length === 0) {
                    state.models = action.payload.map(product => product?.model);
                }
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(orderProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(orderProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(orderProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(search.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(search.fulfilled, (state, action) => {
                state.status = 'succeeded';

                // Filtreleme sonucuna göre ilgili alanı güncelle
                switch (action.meta.arg.searchType) {
                    case 'brands':
                        state.brands = action.payload;
                        break;
                    case 'models':
                        state.models = action.payload;
                        break;
                    default:
                        state.products = action.payload;
                        break;
                }
                // Search işlemi tamamlandığında, searchTerm ve searchType'i sıfırla
                state.searchTerm = '';
                state.searchType = '';
            })
            .addCase(search.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const {setProducts} = productsSlice.actions;
export default productsSlice.reducer;
