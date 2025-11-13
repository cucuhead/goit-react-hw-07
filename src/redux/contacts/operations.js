import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { selectToken } from "../auth/selectors"; // token selector

axios.defaults.baseURL = "https://connections-api.goit.global";

// Tüm işlemlerde token header ekleme fonksiyonu
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// FETCH CONTACTS
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    const token = selectToken(thunkAPI.getState());
    if (!token) return thunkAPI.rejectWithValue("Token bulunamadı");

    setAuthHeader(token);
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ADD CONTACT
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, thunkAPI) => {
    const token = selectToken(thunkAPI.getState());
    if (!token) return thunkAPI.rejectWithValue("Token bulunamadı");

    setAuthHeader(token);
    try {
      const response = await axios.post("/contacts", newContact);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// DELETE CONTACT
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    const token = selectToken(thunkAPI.getState());
    if (!token) return thunkAPI.rejectWithValue("Token bulunamadı");

    setAuthHeader(token);
    try {
      await axios.delete(`/contacts/${contactId}`);
      return contactId; // sadece id döndür
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
