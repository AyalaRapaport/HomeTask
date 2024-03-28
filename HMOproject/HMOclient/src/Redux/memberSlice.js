import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    members: [],
    MemberDetails: [],
    status: 'init',
    currentMember: null,
}
// const apiUrl = process.env.URL;
const apiUrl = 'https://localhost:7218/api'

export const addMember = createAsyncThunk(
    'Members',
    async (member) => {
        try {
            const response = await axios.post(`${apiUrl}/Member`, {
                covidInfoId: member.covidId,
                personalInfoId: member.personalId
            });
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
export const removeMember = createAsyncThunk(
    'delete',
    async (id) => {debugger
        try {
            const response = await axios.delete(`${apiUrl}/Member/${id}`)
            return id;
        } catch (error) {
            return error.message
        }
    }
)
export const getMemberDetailsById = createAsyncThunk(
    'MemberDetails',
    async (id) => {
        try {
            const response = await axios.get(`${apiUrl}/Member/${id}`);
            console.log(response.status);
            if (response.status === 200) {
                let Member = response.data;


                return Member;
            }
        } catch (error) {
            console.log(error);
            return (error.message);
        }
    }
);



export const MemberSlice = createSlice({
    name: 'Member',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(addMember.fulfilled, (state, action) => {
            state.members.push(action.payload);
        })

    },
}
)
export const { } = MemberSlice.actions

export default MemberSlice.reducer