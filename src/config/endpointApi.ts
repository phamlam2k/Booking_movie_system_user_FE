export const BASE_API = process.env.NEXT_PUBLIC_API

export const API_AUTH = `${BASE_API}/auth`
export const API_LOGIN = `${API_AUTH}/login`
export const API_REGISTER = `${API_AUTH}/register`
export const API_RE_REGISTER = `${API_AUTH}/re_register`
export const API_LOGOUT = `${API_AUTH}/logout`
export const API_CHANGE_PASSWORD = `${API_AUTH}/change_password`
export const API_USER_PROFILE = `${API_AUTH}/user_profile`
export const API_VERIFY = `${API_AUTH}/email/verify_OTP`
export const API_LOGOUT_VERIFY = `${API_AUTH}/email/logout_OTP`
export const API_UPDATE_PROFILE = `${API_AUTH}/update_profile`

export const API_ADVERTISEMENT = `${BASE_API}/advertise`

export const API_SHOWTIME = `${BASE_API}/showtime`
export const API_SHOWTIME_DETAIL = `${BASE_API}/showtime/:id`

export const API_MOVIES = `${BASE_API}/movies`
export const API_MOVIE_DETAIL = `${BASE_API}/movies/:id`

export const API_SEAT_OF_ROOM = `${BASE_API}/seat/in_room/:id`

export const API_TICKET = `${BASE_API}/tickets`
export const API_TICKET_ORDER = `${API_TICKET}/order`
export const API_TICKET_PAY = `${API_TICKET}/pay`
export const API_TICKET_DELETE = `${API_TICKET}/delete`
export const API_TICKET_SHOWTIME = `${API_TICKET}/ticket_showtime`
export const API_TICKET_USER_ID = `${API_TICKET}/ticket_user_id`
export const API_TICKET_CHECK = `${API_TICKET}/ticket_check/:id`
