const post = (url, body) => {
   return fetch(url, {
     method:'POST',
     mode: 'cors',
     body: JSON.stringify(body),
     credentials: 'same-origin'
   })
 }

 const get = (url, params={}) => {
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