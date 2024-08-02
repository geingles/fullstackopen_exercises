import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then( response=> response.data)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const remove = objectId => {
    return axios.delete(`${baseUrl}/${objectId}`)
}

const update = (objectId, newObject) => {
    return axios.put(`${baseUrl}/${objectId}`, newObject)
}

export default { getAll, create, remove, update}