const KEYCODE_TO_KEY = {
    0: 'C',
    1: 'D-flat',
    2: 'D',
    3: 'E-flat',
    4: 'E',
    5: 'F',
    6: 'G-flat',
    7: 'G',
    8: 'A-flat',
    9: 'A',
    10: 'B-flat',
    11: 'B'
};

const getArtists = (artists = []) => {
    let result = [];

    artists.forEach(artist => {
        result.push(String(artist.name));
    });

    return result.join(', ');
};

const getKey = key => {
    if (key < 0) {
        return null;
    }

    return KEYCODE_TO_KEY[key];
};

const getPercentage = num => {
    return 100 * Number(num).toFixed(1);
};

const Track = function({
    // basic
    id = '',
    artists = '',
    name = '',
    duration_ms = 0,
    preview_url = '',
    // features
    acousticness = 0,
    danceability = 0,
    energy = 0,
    key = 0,
    mode = 0,
    tempo = 0,
    time_signature = 0,
    valence = 0
} = {}) {
    this.id = String(id);
    this.artists = getArtists(artists);
    this.name = String(name);
    this.duration = Number(duration_ms);
    this.previewUrl = String(preview_url);

    this.acousticness = getPercentage(acousticness);
    this.danceability = getPercentage(danceability);
    this.energy = getPercentage(energy);
    this.key = getKey(key);
    this.mode = mode ? 'minor' : 'major';
    this.tempo = Number(tempo);
    this.timeSignature = Number(time_signature);
    this.valence = getPercentage(valence);
};

export default Track;
