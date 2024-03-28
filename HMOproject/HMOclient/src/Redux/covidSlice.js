import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    covidDetails: '',
}
const apiUrl = 'https://localhost:7218/api'
export const getCovidD = createAsyncThunk(
    'getCovidD',
    async () => {
        try {
            const response = await axios.get(`${apiUrl}/CovidDetails`)
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            return error.message;
        }
    }
)
export const addCovidD = createAsyncThunk(
    'addCovidD',
    async () => {
        try {
            const response = await axios.post(`${apiUrl}/CovidDetails`, {

            });
            if (response.status === 200) {
                return response.data;
            }

        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
)

export const setPositiveResultDate = createAsyncThunk(
    'setPositiveDate',
    async (details) => {
        try {
            const response = await axios.put(`${apiUrl}/CovidDetails/${details.id}`, {
                vaccinations: details.vaccinations,
                positiveResultDate: details.newPositiveDate,
                recoveryDate: details.recoveryDate
            });
            if (response.status == 200) {
                return details.newPositiveDate;
            }
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
)

export const setRecoveryResultDate = createAsyncThunk(
    'setRecoveryResultDate',
    async (details) => {
        try {
            const response = await axios.put(`${apiUrl}/CovidDetails/${details.id}`, {
                vaccinations: details.vaccinations,
                positiveResultDate: details.positiveResultDate,
                recoveryDate: details.newRecoveryDate
            });
            if (response.status == 200) {
                return details.newRecoveryDate;
            }
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
)
export const setVaccines = createAsyncThunk(
    'setVaccines',
    async (details) => {
        try {
            const response = await axios.put(`${apiUrl}/CovidDetails/${details.id}`, {
                vaccinations: [...details.vaccinations, {
                    vaccinationDate: new Date(details.date).toISOString(),
                    vaccineManufacturer: details.manufacturer
                }],
                positiveResultDate: details.positiveResultDate,
                recoveryDate: details.recoveryDate
            });
            if (response.status == 200) {
                const vaccine = { vaccinationDate: new Date(details.date).toISOString(), vaccineManufacturer: details.manufacturer }
                return vaccine;
            }
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
)

export const deleteCovidD = createAsyncThunk(
    'delete',
    async (id) => {debugger
        try {
            const response = await axios.delete(`${apiUrl}/CovidDetails/${id}`)           
            return id;
        } catch (error) {
            return error.message
        }
    }
)

export const CovidSlice = createSlice({
    name: 'Member',
    initialState,
    reducers: {
        addCurrentPD: (state, action) => {
            state.currentPersonalD = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCovidD.fulfilled, (state, action) => {
            state.covidDetails = action.payload;
        })
    },
}
)
export const { addCurrentPD } = CovidSlice.actions

export default CovidSlice.reducer