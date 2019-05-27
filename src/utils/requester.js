import axios from 'axios';

export default function requester({
    method = 'get',
    path,
    queryParams = {},
    header = {}
}) {
    return function(dispatch, getState) {
        const { accessToken } = getState().user;
        // const startTime = new Date().getTime();
        const headers = {
            'Content-Type': header.contentType
                ? header.contentType
                : 'application/json',
            Authorization: 'Bearer ' + accessToken
        };

        let requestOptions = {
            method,
            url: path,
            params: queryParams,
            headers
        };

        return axios(requestOptions).then(response => {
            // const endTime = new Date().getTime();
            // const duration = endTime - startTime;

            return response.data;
        });
    };
}
