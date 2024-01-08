const clientId = '3c2cc3e107b940a0aa153239c95e6559';
const clientSecret = 'c9bc29a631d442f181e8ac2239150c30';
const playlistId = '2ppvs8McdARHn1V7Y84eok';

//API endpoints
const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const playlistEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

//access token using client credentials flow
async function getAccessToken() {
  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}
//get playlist tracks
async function getPlaylistTracks(accessToken) {
  const response = await fetch(playlistEndpoint, {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
  });

  const data = await response.json();
  return data.items;
}
//format the song information
function formatSongInfo(track) {
  const title = track.track.name;
  const artist = track.track.artists.map(artist => artist.name).join(', ');
  return `${title} -- ${artist}`;
}

async function getPlaylistInfo() {
  try {
    const accessToken = await getAccessToken();
    const tracks = await getPlaylistTracks(accessToken);

    const playlistInfo = tracks.map(formatSongInfo);
    console.log(playlistInfo);
    return playlistInfo;
  } catch (error) {
    console.error('Error:', error);
  }
}
//pick two random songs from the array
function pickTwoRandomSongs(playlistInfo) {
  if (playlistInfo.length < 2) {
    console.error('Not enough songs in the playlist to pick two.');
    return;
  }

  const randomIndexes = [];
  while (randomIndexes.length < 2) {
    const randomIndex = Math.floor(Math.random() * playlistInfo.length);
    if (!randomIndexes.includes(randomIndex)) {
      randomIndexes.push(randomIndex);
    }
  }

  const pickedSongs = randomIndexes.map(index => playlistInfo[index]);
  console.log('Picked Songs:', pickedSongs);
  return pickedSongs;
}

const playlistInfo = await getPlaylistInfo();

pickTwoRandomSongs(playlistInfo);