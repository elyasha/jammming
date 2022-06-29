let accessToken;
const CLIENT_ID = ''
const REDIRECT_URI = process.env.REDIRECT_URI || "http://jammming_elyasha.surge.sh/";

const Spotify = {
  getAccessToken: function () {
    if (accessToken) return accessToken;

    // check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiredInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiredInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiredInMatch[1]);
      // This clears the parameters, allowing us to grab a new access token when it expires
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
      window.location = accessUrl;
    }
  },
  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) return [];
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      });
  },
  savePlaylist(name, trackURIs) {
	if (!name || !trackURIs) return

	const accessToken = Spotify.getAccessToken();
	const headers = {Authorization: 'Bearer ' + accessToken}
	let userId;
	return fetch(`https://api.spotify.com/v1/me`, {headers: headers}).then((response) => {return response.json()}).then((jsonResponse) => {
		userId = jsonResponse.id
		return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {headers: headers, method: "POST", body: JSON.stringify({name: name})}).then(response => response.json()).then((jsonResponse) => {
			const playlistId = jsonResponse.id
			return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {headers: headers, method: 'POST', body: JSON.stringify({uris: trackURIs})})
		})
	})
  }
};

export default Spotify;
