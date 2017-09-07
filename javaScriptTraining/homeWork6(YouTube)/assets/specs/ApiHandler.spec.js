describe('ApiHandler', function () {
    var apiHandler;
    beforeAll(function () {
        apiHandler = new ApiHandler();
    });
    it('first', function () {
        apiHandler.setVideos([]);
        expect(apiHandler.getVideos().length, 0);
    })
})
