const post = (url, body) => {
  return fetch(url, {method:'POST', mode: 'cors', body: JSON.stringify(body)})
}

// add get request here
const get = (url) => {

}

// add put request here



export default {post}
