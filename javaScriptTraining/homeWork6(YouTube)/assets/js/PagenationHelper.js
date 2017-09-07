var PagenationHelper = (function () {
    'use strict';

    function PagenationHelper() {};

    PagenationHelper.prototype.getPageCount = function (items, apiHandler) {
        var videosPerPage = apiHandler.getVideosPerPage(),
            totalVideos = items.length,
            pageCount = Math.floor(totalVideos / videosPerPage);
        pageCount = pageCount + (totalVideos % videosPerPage === 0 ? 0 : 1);
        return pageCount;
    }

    PagenationHelper.prototype.getCurrentPage = function () {
        return this.currentPage || 1;
    }

    PagenationHelper.prototype.setCurrentPage = function (pageNumber) {
        this.currentPage = pageNumber;
    }

    PagenationHelper.prototype.getStartIndex = function (noOfVideos) {
        return (this.getCurrentPage() * noOfVideos) - noOfVideos
    }
    return PagenationHelper;
})();
