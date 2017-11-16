import axios from 'axios'

export const IP = '/ElecForecast/';  //http://10.21.48.11:8080
export const myAxios = axios.create({
	baseURL: IP,
})
