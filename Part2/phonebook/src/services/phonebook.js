import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

export const getAllContacts = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export const saveContact = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

export const updateContact = (id, newObject) => {
  const newId = Number(id)
  const request = axios.put(`${baseUrl}/${newId}`, newObject)
  return request.then(response => response.data)
}

export const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
};
