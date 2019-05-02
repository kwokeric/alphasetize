import React from 'react';

const controller = {
    getArtists(artists = [], featured = []) {
        let result = [];

        artists.forEach(artist => {
            result.push(artist.name);
        });

        return result.join(', ');
    },
    getText(text = '', value = '') {
        let textArr = [];
        let result = [];
        let delimeter = '';

        if (Array.isArray(text)) {
            textArr = text;
            delimeter = ',';
        } else {
            textArr = text.split(' ');
        }

        textArr.forEach(artist => {
            let notMatched = '';
            if (artist.indexOf(value) === 0) {
                result.push(<span className="Search-item-match">{value}</span>);
                notMatched = artist.slice(value.length, artist.length);
            } else {
                notMatched = artist;
            }
            result.push(<span>{`${notMatched}${delimeter} `}</span>);
        });

        return result;
    }
};

export default controller;
