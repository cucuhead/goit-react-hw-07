// src/redux/contactsOps.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ⚠️ ÖNEMLİ: Burayı kendi MockAPI.io backend URL'niz ile değiştirin
// Örnek: https://6534567890abcdef0123456.mockapi.io/api/v1
axios.defaults.baseURL = "https://691474523746c71fe0484696.mockapi.io";

/**
 * fetchContacts - GET yöntemi ile kişi dizisini alma.
 * Temel eylem türü: "contacts/fetchAll"
 */
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      return response.data; // Kişi dizisini döndür
    } catch (e) {
      // HTTP istek hatalarını işleme
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

/**
 * addContact - Yeni bir kişi ekleme (POST yöntemi).
 * Temel eylem türü: "contacts/addContact"
 */
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, thunkAPI) => {
    try {
      // newContact: { name: "...", number: "..." }
      const response = await axios.post("/contacts", newContact);
      return response.data; // Backend'in atadığı ID ile birlikte yeni kişiyi döndür
    } catch (e) {
      // HTTP istek hatalarını işleme
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

/**
 * deleteContact - ID’ye göre bir kişiyi silme (DELETE yöntemi).
 * Temel eylem türü: "contacts/deleteContact"
 */
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      // DELETE isteğini gönder
      await axios.delete(`/contacts/${contactId}`);
      // Silme işlemi başarılı olursa, reducer'ın state'ten kaldırması için ID'yi döndür
      return contactId;
    } catch (e) {
      // HTTP istek hatalarını işleme
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
