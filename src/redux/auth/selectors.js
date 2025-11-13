// Mevcut kullanıcı giriş yaptı mı?
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

// Kullanıcı bilgileri (name, email)
export const selectUser = (state) => state.auth.user;

// Kullanıcı yenileme (token kontrolü) işlemi devam ediyor mu?
export const selectIsRefreshing = (state) => state.auth.isRefreshing;

export const selectToken = (state) => state.auth.token;
