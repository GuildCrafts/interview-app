

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
     header: 'Content-Type, application/JSON',
     mode: 'cors',
     credentials: 'same-origin'
   }).then(result => {
     return result.json()
   })
 }

 // add put request here



 export default {get, post}
