export default {
  token: localStorage.getItem('token'),
  profile: localStorage.getItem('profile'),
  isAuth: !!localStorage.getItem('token')
}
