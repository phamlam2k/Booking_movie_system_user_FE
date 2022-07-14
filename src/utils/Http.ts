import axios from 'axios'
import qs from 'qs'
import { AUTH_TOKEN, USER_INFO } from '../config/const'
import { LOGIN } from '../config/path'

/**
 * Get access token
 */
export const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN) ? localStorage.getItem(AUTH_TOKEN) : ''
}

// GLOBAL DEFAULT
// axios.defaults.headers.common['Cache-Control'] = 'no-cache'
// axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.headers.common['Cache-Control'] = 'max-age=0'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

// get fuction handler un-authenticate request
export function getAxios(url: string, params: any, configs = {}) {
  axios.defaults.headers.common['AUTHORIZATION'] = `Bearer ${getToken()}`

  return new Promise((resolve, reject) => {
    axios
      .get(
        url,
        {
          params,
          paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
          },
          ...configs,
        },
        // configRequest
      )
      .then((response) => {
        if (response.data.code === 401 || (response.status !== 200 && response.data.code === 403)) {
          localStorage.removeItem(AUTH_TOKEN)
          localStorage.removeItem(USER_INFO)
          //   window.location = LOGIN
        }
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * @param {*} url
 * @param {*} body
 * @param config
 * @param isAuth
 */
export function postAxios(url: string, body: any, config = {}, isAuth = true) {
  axios.defaults.headers.common['AUTHORIZATION'] = `Bearer ${getToken()}`

  if (!isAuth) {
    // axios.defaults.headers.common['AUTHORIZATION'] = null
    // axios.defaults.headers.common['CLIENTAPIKEY'] = null
  }
  return new Promise((resolve, reject) => {
    axios
      .post(url, body, config)
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * @param {*} url
 * @param config
 */
export function deleteAxios(url: string, config = {}) {
  axios.defaults.headers.common['AUTHORIZATION'] = `Bearer ${getToken()}`

  return new Promise((resolve, reject) => {
    axios
      .delete(url, config)
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * @param {*} url
 * @param {*} body
 * @param config
 */
export function putAxios(url: string, body: any, config = {}) {
  axios.defaults.headers.common['AUTHORIZATION'] = `Bearer ${getToken()}`

  return new Promise((resolve, reject) => {
    axios
      .put(url, body, config)
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
