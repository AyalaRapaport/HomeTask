import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { setPositiveResultDate, setRecoveryResultDate, setVaccines } from './covidSlice';
import { addMember } from './memberSlice';

const initialState = {
    currentPersonalD: '',
    currentCovidD: '',
    currentMemberId: 0,
    currentCovidId: 0,
    status: false
}
const apiUrl = 'https://localhost:7218/api'

export const getCDetails = createAsyncThunk(
    'getCDetails',
    async (id) => {
        try {
            const response = await axios.post(`${apiUrl}/CovidDetails/${id}`);
            console.log(response.status);
            if (response.status === 200) {
                return response.data;
            }
        }
        catch (error) {
            console.log(error);
            return (error.message);
        }
    }
);
export const setCurrentP = createAsyncThunk(
    'set',
    async (current) => {
        debugger
        let res;
        if (!current.profileImg) {
            res = await axios.get(`${apiUrl}/PersonalDetails/GetImage/${current.urlProfileImg}`);
            console.log(res);
        }
        return { current, urlProfileImg: res ? res.data : null };
    }
)
export const getMembers = createAsyncThunk(
    'getMembers',
    async (personalId) => {
        try {
            const response = await axios.get(`${apiUrl}/Member`);
            if (response.status === 200) {
                console.log(response.data);
                const member = response.data.find(x => x.personalInfoId === personalId)
                return member;
            }
        } catch (error) {
            return error.message
        }

    }
)

export const CurrentMemberSlice = createSlice({
    name: 'Member',
    initialState,
    reducers: {
        addCurrentPD: (state, action) => {
            state.currentPersonalD = action.payload;
        },
        setCurrentPD: async (state, action) => {
            let res;
            if (!action.payload.profileImg) {
                res = await axios.get(`${apiUrl}/PersonalDetails/GetImage/${action.payload.urlProfileImg}`);
                console.log(res);
            }
            return { ...state, currentPersonalD: [...action.payload, res.data] }
        },

    },
    extraReducers: (builder) => {
        builder.addCase(getCDetails.fulfilled, (state, action) => {
            state.currentCovidD = action.payload;
        })
        // builder.addCase(addMember.fulfilled, (state, action) => {
        //     state.currentPersonalD = action.payload;
        // })
        builder.addCase(setCurrentP.fulfilled, (state, action) => {
            state.currentPersonalD = action.payload.current;
            state.currentPersonalD.urlProfileImg = action.payload.urlProfileImg;
        })
        builder.addCase(getMembers.fulfilled, (state, action) => {
            if (action.payload) {
                state.status = true;
                state.currentMemberId = action.payload.id;
                state.currentCovidId = action.payload.covidInfoId;
            }
        })
        builder.addCase(setVaccines.fulfilled, (state, action) => {
            return {
                ...state,
                currentCovidD: {
                    ...state.currentCovidD,
                    vaccinations: [...state.currentCovidD.vaccinations, action.payload]
                }
            }
        })
        builder.addCase(setPositiveResultDate.fulfilled, (state, action) => {
            return {
                ...state, currentCovidD: {
                    ...state.currentCovidD,
                    positiveResultDate: action.payload
                }
            }
        })
        builder.addCase(setRecoveryResultDate.fulfilled, (state, action) => {
            return {
                ...state, currentCovidD: {
                    ...state.currentCovidD,
                    recoveryDate: action.payload
                }
            }
        })
    },
}
)
export const { addCurrentPD, setCurrentPD } = CurrentMemberSlice.actions

export default CurrentMemberSlice.reducer