export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectMessage = (state) => state.auth.message;
export const selectError = (state) => state.auth.error;
export const selectLoading = (state) => state.auth.loading;