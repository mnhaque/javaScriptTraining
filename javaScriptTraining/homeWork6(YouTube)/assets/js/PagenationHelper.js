var PagenationHelper = (function () {
    'use strict';

    function PagenationHelper() {};

    PagenationHelper.prototype.getPageCount = function (items, videosPerPage) {
        var totalVideos = items.length;
        return Math.floor(totalVideos / videosPerPage) + (totalVideos % videosPerPage === 0 ? 0 : 1);
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
