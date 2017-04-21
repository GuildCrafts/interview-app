const post = (url, body) => {
   return fetch(url, {
     method:'POST',
     headers: {'Content-Type': 'text/plain'},
     mode: 'cors',
     body: JSON.stringify(body),
     credentials: 'same-origin'
   })
 }

 const getUserName = (url, params={}) => {
   return fetch(url, {
     method:'GET',
     headers: {'Content-Type': 'application/json'},
     mode: 'cors',
     credentials: 'same-origin'
   }).then(result => {
     return result.json()
   })
 }

 const getDatabaseQuestions = (url, params={}) => {
   return fetch(url, {
     method:'GET',
     headers: {'Content-Type': 'text/plain'},
     mode: 'cors',
     credentials: 'same-origin'
   }).then(result => {
     console.log(result);
     return result.json()
   })
 }

 // add put request here
const put = (url, body) => {
  return fetch(url, {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(body),
    credentials: 'same-origin'
  })
}

const deleteQuestion = (url, id) => {
  return fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    credentials: 'same-origin'
  })
}



 export default {getUserName, getDatabaseQuestions, post, put, deleteQuestion}
