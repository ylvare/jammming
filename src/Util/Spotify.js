
const clientId = '261176a1ef1440608bd6d3eae523ab83'
const responseType = 'token'
const redirectUrl = 'http://localhost:3000/'
const endPointAuth = 'https://accounts.spotify.com/authorize/'
const endPointSearch = 'https://api.spotify.com/v1/search'
const scope='playlist-modify playlist-modify-public'
const spotifyWebApiURL = `${endPointAuth}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUrl}&scope=${scope}`
const spotifyProfileURL = "https://api.spotify.com/v1/me";
const querySearch = "{endPointSearch}?q={searchValue}&type=track"
const spotifyCreatePlayListURL = "https://api.spotify.com/v1/users/{profileId}/playlists"
const spotifyAddTracksToPlayListURL =  `https://api.spotify.com/v1/users/{profileId}/playlists/{playListId}/tracks`

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

    getTracks :  async function (searchValue, authToken) {
      const q = querySearch.replace("{endPointSearch}", endPointSearch).replace("{searchValue}", searchValue)
      return fetch(q, {
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

                          return {
                          key: track.id,
                          uri: track.uri,
                          title: track.name.substring(0, 60),
                          artist: track.artists[0].name,
                          album: track.album.name
                       }
            }))
        }
    })
   },

   savePlayListToSpotify: async function (playListName, trackSpotifyUris, profileId, authToken){
      const q = spotifyCreatePlayListURL.replace("{profileId}", profileId)
      fetch(q, {
       method: 'POST',
       headers: {
         'Authorization': 'Bearer ' + authToken,
         'Content-Type': 'application/json'
       },
      body:JSON.stringify( {
        'name': playListName
      })
     }).then(response => {
       if (response.ok){
         return response.json()
       }
       throw new Error ('Request failed')
     }, networkError => console.log(networkError.message)
   ).then(jsonResponse => {
         const playListId = jsonResponse.id
         const q2 = spotifyAddTracksToPlayListURL.replace("{profileId}", profileId).replace("{playListId}", playListId)
         fetch(q2, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
          },
         body:JSON.stringify( {
           'uris': trackSpotifyUris
         })
        }).then(response => {
          if (response.ok){
            return true
          }
          throw new Error ('Request failed!')
        }, networkError => console.log(networkError.message)
      )})
   }
}

export {Spotify}
