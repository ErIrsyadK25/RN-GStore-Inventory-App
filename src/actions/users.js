import URL from './URL'

export const login = data => {
  return {
    type: 'LOGIN',
    payload: URL.post('/login', data),
  };
};

export const register = data => {
  return {
    type: 'REGISTER',
    payload: URL.post('/register', data),
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};
// export const getProfile = () => {
//     return{
//         type: 'GET_PROFILE',
//         payload: Axios.get('http://localhost:4000/users/profile', {
//             headers:{
//                 auth: window.localStorage.getItem("token")
//             }
//         })
//     }
// }
