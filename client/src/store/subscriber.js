import store from '@/store'
import { Api } from '../Api'

store.subscribe((mutation) => {
  switch (mutation.type) {
    case 'auth/SET_TOKEN':
      if (mutation.payload) {
        Api.defaults.headers.common.authorization = 'Bearer ($mutation.payload)'
        localStorage.setItem('token', mutation.payload)
      } else {
        Api.defaults.headers.common.authorization = null
        localStorage.removeItem('token')
        localStorage.removeItem('accountID')
      }
      break
  }
})
