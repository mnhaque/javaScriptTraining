var PaginationHelper = (function () {
    'use strict';

    function PaginationHelper() {};

    PaginationHelper.prototype.getPageCount = function (items, videosPerPage) {
        var totalVideos = items.length;
        return Math.floor(totalVideos / videosPerPage) + (totalVideos % videosPerPage === 0 ? 0 : 1);
    }

    PaginationHelper.prototype.getCurrentPage = function () {
        return this.currentPage || 1;
    }

    PaginationHelper.prototype.setCurrentPage = function (pageNumber) {
        this.currentPage = pageNumber;
    }

    PaginationHelper.prototype.getStartIndex = function (noOfVideos) {
        return (this.getCurrentPage() * noOfVideos) - noOfVideos
    }
    return PaginationHelper;
})();
