const post = (url, body) => {
  let headers = new Headers()
  headers.append('Content-Type', 'application/JSON')
   return fetch(url, {
     method:'POST',
     headers: headers,
     mode: 'cors',
     body: JSON.stringify(body),
     credentials: 'same-origin'
   })
 }

 const get = (url) => {
   return fetch(url, {
     method:'GET',
     mode: 'cors',
     credentials: 'same-origin'
   }).then(result => {
     return result.json()
   })
 }

const put = (url, body) => {
  let headers = new Headers()
  headers.append('Content-Type', 'application/JSON')
  return fetch(url, {
    method: 'PUT',
    mode: 'cors',
    headers: headers,
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

export default {get, post, put, deleteQuestion}
