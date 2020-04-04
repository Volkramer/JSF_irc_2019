import axios from 'axios'

export default () => { // give back a connector
  return axios.create({ // axios obj that point to the URL
    baseURL: 'http://localhost:4200/',
    headers: {
      // Authorization: `Bearer ${store.state.token}`
    }
  })
} // Heading our differents end point
