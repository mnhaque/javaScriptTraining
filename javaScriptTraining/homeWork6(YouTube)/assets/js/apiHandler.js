var ApiHandler = (function () {
    'use strict';

    function ApiHandler() {};

    ApiHandler.prototype.searchForVideos = function (searchText) {
        var _this = this,
            queryParams = {
                key: config.ACCESS_TOKEN,
                part: config.PART,
                type: config.TYPE,
                maxResults: config.MAX_RESULTS,
                q: searchText
            };
        return fetch(this.getApiUrl(queryParams)).then(function (response) {
            return response.json();
        }).then(function (responseJson) {
            _this.setVideos(responseJson['items']);
            return responseJson['items'];
        }).catch(function (error) {
            console.log('error in api call' + error);
        });
    }

    ApiHandler.prototype.getApiUrl = function (queryParams) {
        var encodedString = '';
        for (var prop in queryParams) {
            if (encodedString.length > 0) {
                encodedString += '&';
            }
            encodedString += encodeURI(prop + '=' + queryParams[prop]);
        }
        return config.API_URL + encodedString;
    }
    ApiHandler.prototype.setVideos = function (items) {
        this.searchResults = items;
    }

    ApiHandler.prototype.getVideos = function () {
        return this.searchResults || [];
    }

    ApiHandler.prototype.getVideosPerPage = function () {
        var videosPerPage = config.MIN_VIDEOS_PER_PAGE;
        videosPerPage = Math.floor(window.innerWidth / config.VIDEO_WIDTH);
        return (videosPerPage > 1) ? videosPerPage : 1;
    }

    return ApiHandler;
})();
