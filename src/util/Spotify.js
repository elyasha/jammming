let accessToken;
const CLIENT_ID = '';
const REDIRECT_URI = 'http://localhost:3000/'

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
		const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`
		window.location = accessUrl;
	}
  },
};

export default Spotify;
