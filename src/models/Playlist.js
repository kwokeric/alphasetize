const getImage = images => {
    return String(images[images.length - 1].url);
};

const Playlist = function({
    images = [{}],
    id = '',
    name = '',
    tracks = {}
} = {}) {
    this.images = getImage(images);
    this.id = String(id);
    this.name = String(name);
    this.length = Number(tracks.total || 0);
    this.tracksUrl = String(tracks.href || '');
};

export default Playlist;
