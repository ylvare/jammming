
const clientId = '261176a1ef1440608bd6d3eae523ab83'
const responseType = 'token'
const redirectUrl = 'http://localhost:3000/'
const endPointAuth = 'https://accounts.spotify.com/authorize/'
const endPointSearch = 'https://api.spotify.com/v1/search'
const scope="playlist-modify-public"
const queryAuth = `${endPointAuth}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUrl}&scope=${scope}`


const Spotify = {
    _getTracks: function (searchValue, searchType) {
      if (window.location.href ==='http://localhost:3000/') {
        window.location.assign(queryAuth)
      }
      const url = window.location.href
      const authToken = url.split("token=")[1].split("&")[0].trim()
      const querySearch = `${endPointSearch}?q=${searchType}:${searchValue}&type=track`

      return fetch(querySearch, {
        headers: {
          'Authorization': 'Bearer ' + authToken
        }
      }).then(response => {
        if (response.ok){
          return response.json()
        }
        throw new Error ('Request failed')
      }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
        if(jsonResponse.tracks.items){
            return (jsonResponse.tracks.items.map((track) => {
                          const timeStamp = new Date().getTime();
                          return {
                          key: track.id + timeStamp,
                          id:  track.id,
                          title: track.name.substring(0, 100),
                          artist: track.artists[0].name,
                          album: track.album.name
                       }
            }))
        }
    })
},

    getTracks :  async function (searchValue) {
       const result1 =  await this._getTracks(searchValue, 'artist')
       const result2  = await this._getTracks(searchValue, 'album')
       const result3  = await this._getTracks(searchValue, 'track')

       const trackList = await result1.concat(await result2).concat(await result3)
       return trackList
   }
}

export {Spotify}
