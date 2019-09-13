async function setAuth(_, { token, user }, { cache }) {
  localStorage.setItem('token', token)
  localStorage.setItem('profile', JSON.stringify(user))
  cache.writeData({
    data: { token, profile: JSON.stringify(user), isAuth: true }
  })

  return true
}

function resetAuth(_, __, { cache }) {
  localStorage.removeItem('token')
  localStorage.removeItem('profile')

  cache.writeData({ data: { token: '', profile: '', isAuth: false } })
  return true
}

export default {
  Mutation: {
    setAuth,
    resetAuth
  }
}
