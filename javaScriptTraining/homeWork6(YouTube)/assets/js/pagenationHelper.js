var pagenationHelper = (function () {
    'use strict';

    function pagenationHelper() {};

    pagenationHelper.prototype.getPageCount = function (items) {
        var videosPerPage = apiHandler.getVideosPerPage(),
            totalVideos = items.length,
            pageCount = Math.floor(totalVideos / videosPerPage);
        pageCount = pageCount + (totalVideos % videosPerPage === 0 ? 0 : 1);
        return pageCount;
    }

    pagenationHelper.prototype.getCurrentPage = function () {
        return this.currentPage || 1;
    }

    pagenationHelper.prototype.setCurrentPage = function (pageNumber) {
        this.currentPage = pageNumber;
    }

    pagenationHelper.prototype.getStartIndexForPage = function (numberOfCards) {
        var currentPage = this.getCurrentPage();
        return (currentPage * numberOfCards) - numberOfCards
    }
    return pagenationHelper;
})();
