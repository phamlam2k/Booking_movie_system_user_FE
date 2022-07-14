export const BASE_API = process.env.NEXT_PUBLIC_API

export const API_AUTH = `${BASE_API}/auth`
export const API_LOGIN = `${API_AUTH}/login`
export const API_REGISTER = `${API_AUTH}/register`
export const API_RE_REGISTER = `${API_AUTH}/re_register`
export const API_LOGOUT = `${API_AUTH}/logout`
export const API_USER_PROFILE = `${API_AUTH}/user-profile`
export const API_VERIFY = `${API_AUTH}/email/verify_OTP`
export const API_LOGOUT_VERIFY = `${API_AUTH}/email/logout_OTP`

export const API_ADVERTISEMENT = `${BASE_API}/advertise`

export const API_SHOWTIME = `${BASE_API}/showtime`
export const API_MOVIES = `${BASE_API}/movies`
export const API_MOVIE_DETAIL = `${BASE_API}/movies/:id`
