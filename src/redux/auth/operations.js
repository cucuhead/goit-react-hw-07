import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// ✅ Doğru temel URL
axios.defaults.baseURL = "https://connections-api.goit.global";

// Token'ı HTTP başlığına ekleyen yardımcı fonksiyon
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Token'ı HTTP başlığından kaldıran yardımcı fonksiyon
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

/*
 * register: Yeni bir kullanıcı kaydı
 */
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/users/signup", credentials);
      setAuthHeader(res.data.token);
      toast.success("Kayıt başarılı! Hoş geldiniz.");
      return res.data;
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
      toast.error("Kayıt işlemi başarısız. Bu e-posta zaten kayıtlı olabilir.");
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

/*
 * login: Giriş işlemi
 */
export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/users/login", credentials);
      setAuthHeader(res.data.token);
      toast.success("Giriş başarılı!");
      return res.data;
    } catch (error) {
      // Sunucudan dönen hata varsa onu kullan
      if (error.response?.status === 400) {
        toast.error("E-posta veya şifre hatalı.");
      } else if (error.response?.status === 401) {
        toast.error(
          "Yetkisiz giriş denemesi. Lütfen bilgilerinizi kontrol edin."
        );
      } else {
        toast.error("Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.");
      }

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * logout: Çıkış işlemi
 */
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader();
    toast("Başarıyla çıkış yaptınız 👋");
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

/*
 * refreshUser: Token ile oturum yenileme
 */
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("Token yok");
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get("/users/current");
      return res.data;
    } catch (error) {
      clearAuthHeader();
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
