import constants from '../constants';

const getArtists = (artists = []) => {
    let result = [];

    artists.forEach(artist => {
        result.push(String(artist.name));
    });

    return result.join(', ');
};

const getKey = (key, mode) => {
    if (key < 0) {
        return null;
    }

    return constants.KEYCODE_TO_KEY[key] + (mode ? 'm' : '');
};

const getCamKey = key => {
    return constants.KEYCODE_TO_CAMELOT_KEY[key];
};

const getPercentage = num => {
    return Math.round(100 * Number(num));
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
    this.key = getKey(key, mode);
    this.camKey = getCamKey(this.key);
    this.tempo = Math.round(Number(tempo));
    this.timeSignature = Number(time_signature);
    this.valence = getPercentage(valence);
};

export default Track;
