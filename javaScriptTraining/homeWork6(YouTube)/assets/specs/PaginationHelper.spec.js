describe('Pagination Helper Module getPageCount function', function () {
    var paginationHelper;
    beforeAll(function () {
        paginationHelper = new PaginationHelper();
    });
    it("Test page count for 2 videos per page", function () {
        var videos = [{
            "one": "one"
        }, {
            "two": "two"
        }];
        expect(paginationHelper.getPageCount(videos, 2)).toBe(1);
    });
    it("Test page count for 4 videos per page", function () {
        var videos = [{
            "one": "one"
        }, {
            "two": "two"
        }];
        expect(paginationHelper.getPageCount(videos, 4)).toBe(1);
    });
    it("Test page count for 4 videos per page", function () {
        var videos = [{
            "one": "one"
        }, {
            "two": "two"
        }, {
            "three": "three"
        }, {
            "four": 4
        }, {
            "five": 5
        }];
        expect(paginationHelper.getPageCount(videos, 4)).toBe(2);
    });
});
describe('Pagination Helper Module getCurrentPage function', function () {
    var paginationHelper;
    beforeAll(function () {
        paginationHelper = new PaginationHelper();
    });
    it("Test current page when un initialized", function () {
        expect(paginationHelper.getCurrentPage()).toBe(1);
    });
    it("Test current page when surrent page is set to 2", function () {
        paginationHelper.setCurrentPage(2);
        expect(paginationHelper.getCurrentPage()).toBe(2);
    });
});
describe('Pagination Helper Module getStartIndex function', function () {
    var paginationHelper;
    beforeAll(function () {
        paginationHelper = new PaginationHelper();
    });
    it("Test start indexfor 2 videos per page", function () {
        expect(paginationHelper.getStartIndex(2)).toBe(0);
    });
    it("Test start indexfor 8 videos per page", function () {
        paginationHelper.setCurrentPage(2);
        expect(paginationHelper.getStartIndex(8)).toBe(8);
    });
});
