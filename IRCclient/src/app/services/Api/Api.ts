import axios from 'axios'

export default () => { // give back a connector
  return axios.create({ // axios obj that point to the URL
    baseURL: 'http://localhost:3000/',
    headers: {
      // Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
} // Heading our differents end point
