describe('ApiHandler Module', function () {
    var apiHandler;
    beforeAll(function () {
        apiHandler = new ApiHandler();
    });
    it('Test setter and getter for api handler expected behavior', function () {
        apiHandler.setVideos([]);
        expect(apiHandler.getVideos().length).toBe(0);
    });
    it('Test setter and getter for api handler un equality behavior', function () {
        apiHandler.setVideos([]);
        expect(apiHandler.getVideos().length).not.toBe(1);
    });
    it('Test url for API call', function () {
        var queryParams = {
                key: "token",
                part: "part",
                type: "type",
                maxResults: "max",
                q: "text"
            },
            url = apiHandler.getApiUrl(queryParams);
        expect(url).toBe("https://www.googleapis.com/youtube/v3/search?key=token&part=part&type=type&maxResults=max&q=text");
    });
})
