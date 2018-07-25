
const clientId = '261176a1ef1440608bd6d3eae523ab83'
const responseType = 'token'
const redirectUrl = 'http://localhost:3000/'
const endPointAuth = 'https://accounts.spotify.com/authorize/'
const endPointSearch = 'https://api.spotify.com/v1/search'
const scope="playlist-modify-public"
const spotifyWebApiURL = `${endPointAuth}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUrl}&scope=${scope}`
const spotifyProfileURL = "https://api.spotify.com/v1/me";

const Spotify = {

    handleAuthFlow : function(authorized, authToken){
      if(authorized){
        return fetch(spotifyProfileURL, {
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
            return jsonResponse.id
          }
      )
    } else {
      window.location.assign(spotifyWebApiURL);
    }
  }
    ,

    _getTracks: function (searchValue, searchType, authToken) {
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
                          title: track.name.substring(0, 80),
                          artist: track.artists[0].name,
                          album: track.album.name
                       }
            }))
        }
    })
},

    getTracks :  async function (searchValue, authToken) {
       const result1 =  await this._getTracks(searchValue, 'artist', authToken)
       const result2  = await this._getTracks(searchValue, 'album', authToken)
       const result3  = await this._getTracks(searchValue, 'track', authToken)

       const trackList = await result1.concat(await result2).concat(await result3)
       return trackList
   }
}

export {Spotify}
