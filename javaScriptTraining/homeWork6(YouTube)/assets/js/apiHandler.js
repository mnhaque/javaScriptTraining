var apiHandler = (function () {
    'use strict';

    function apiHandler() {};
    apiHandler.prototype.searchForVideos = function (searchText) {
        var _this = this,
            queryParams = {
                key: 'AIzaSyAAZmiXXZeEmUNBUhIT497rQ23Uqn_fXTA',
                part: "snippet",
                type: 'video',
                maxResults: 25,
                q: searchText
            };
        return fetch(this.getApiUrl(queryParams)).then(function (response) {
            return response.json();
        }).then(function (responseJson) {
            _this.setVideos(responseJson['items']);
            return responseJson['items'];
        }).catch(function (error) {
            //exception Handling
        });
    }

    apiHandler.prototype.getApiUrl = function (queryParams) {
        var encodedString = '';
        for (var prop in queryParams) {
            if (encodedString.length > 0) {
                encodedString += '&';
            }
            encodedString += encodeURI(prop + '=' + queryParams[prop]);
        }
        return 'https://www.googleapis.com/youtube/v3/search?' + encodedString;
    }
    apiHandler.prototype.setVideos = function (items) {
        this.searchResults = items;
    }

    apiHandler.prototype.getVideos = function () {
        return this.searchResults || [];
    }
    apiHandler.prototype.getVideosPerPage = function () {
        var videosPerPage = 1;
        var videoWidth = 330;
        while ((videosPerPage * videoWidth) < window.innerWidth) {
            videosPerPage += 1;
        }
        return (videosPerPage > 1) ? videosPerPage - 1 : 1;
    }
    return apiHandler;
})();
