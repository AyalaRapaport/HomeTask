import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    personalDetails: [],
}
// const apiUrl = process.env.URL;
const apiUrl = 'https://localhost:7218/api'

export const getPDetails = createAsyncThunk(
    'getPDetails',
    async () => {
        try {
            const response = await axios.get(`${apiUrl}/PersonalDetails`);
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

export const getMemberDetailsById = createAsyncThunk(
    'MemberDetails',
    async (id) => {
        try {
            const response = await axios.post(`${apiUrl}/Member/${id}`);
            console.log(response.status);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
            return (error.message);
        }
    }
);

export const addPDetails = createAsyncThunk(
    'addPDetails',
    async (member) => {
        try {
            const isExist = await axios.post(`${apiUrl}/PersonalDetails/${member.memberId}`);
            if (isExist.status === 200) {
                console.log("exist");
                return true;
            }
            const formData = new FormData();
            formData.append('memberId', member.memberId);
            formData.append('firstName', member.firstName);
            formData.append('lastName', member.lastName);
            formData.append('city', member.city);
            formData.append('street', member.street);
            formData.append('number', member.number);
            formData.append('phoneNumber', member.phone);
            formData.append('mobileNumber', member.mobile);
            formData.append('dateOfBirth', member.birthDate);
            formData.append('profileImg', member.img);
            let response = await axios.post(`${apiUrl}/PersonalDetails`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                return response.data;
            }
        }
        catch (error) {
            return (error.message);
        }
    });
export const EditPDetails = createAsyncThunk(
    'EditPDetails',
    async (member) => {
        try {
            const formData = new FormData();
            formData.append('memberId', member.memberId);
            formData.append('firstName', member.firstName);
            formData.append('lastName', member.lastName);
            formData.append('city', member.city);
            formData.append('street', member.street);
            formData.append('number', member.number);
            formData.append('phoneNumber', member.phone);
            formData.append('mobileNumber', member.mobile);
            formData.append('dateOfBirth', member.birthDate);
            formData.append('profileImg', member.img);
            let response = await axios.put(`${apiUrl}/PersonalDetails/${member.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                return response.data;
            }
        }
        catch (error) {
            return (error.message);
        }
    });
export const deletePersonalD = createAsyncThunk(
    'delete',
    async (id) => {
        debugger
        try {
            const response = await axios.delete(`${apiUrl}/PersonalDetails/${id}`)
            return id;
        } catch (error) {
            return error.message
        }
    }
)

export const personalDetailsSlice = createSlice({
    name: 'personalDetails',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getPDetails.fulfilled, (state, action) => {
            state.personalDetails = action.payload;

        })
        // builder.addCase(getMemberDetailsById.fulfilled, (state, action) => {
        //     state.status = 'fulfilled'
        //     state.currentMember = action.payload;
        // })
        builder.addCase(addPDetails.fulfilled, (state, action) => {
            return {
                ...state,
                personalDetails: [...state.personalDetails, action.payload]
            };
        })
    },
}
)
export const { } = personalDetailsSlice.actions

export default personalDetailsSlice.reducer