var htmlHelper = (function () {
    'use strict';

    function htmlHelper() {};

    htmlHelper.prototype.iniTializeSearchPage = function () {
        var _this = this,
            $searchBox = document.querySelector('#youtubesearch');
        $searchBox.addEventListener('keyup', function (event) {
            pagenationHelper.setCurrentPage(1);
            event.preventDefault();
            if (event.keyCode == 13) {
                apiHandler.searchForVideos($searchBox.value).then(function (videos) {
                    _this.renderGrid(videos);
                    _this.renderPagenation(videos);
                    window.addEventListener('resize', function () {
                        _this.renderPagenation(videos)
                    });
                });
            }
        });
    }

    htmlHelper.prototype.renderPagenation = function (items) {
        this.renderPageNumbers(pagenationHelper.getPageCount(items));
    }

    htmlHelper.prototype.clearGrid = function () {
        this.clearHtmlContainer('#youtube-container');
    }

    htmlHelper.prototype.clearPagination = function () {
        this.clearHtmlContainer('#pagination .pagination-controls');
    }

    htmlHelper.prototype.clearHtmlContainer = function (selector) {
        var $node = document.querySelector(selector);
        if ($node) {
            var $last;
            while ($last = $node.lastChild) {
                $node.removeChild($last);
            }
        }
    }

    htmlHelper.prototype.renderPageNumbers = function (numberOfpages) {
        var _this = this,
            $paginationFragment = document.querySelector('#pagination .pagination-controls');
        _this.clearPagination();
        for (var i = 0; i < numberOfpages; i++) {
            var $anchor = document.createElement('a');
            $anchor.appendChild(document.createTextNode(i + 1));
            $anchor.setAttribute('id', 'page' + (i + 1));
            $anchor.setAttribute('href', '#');
            $paginationFragment.appendChild($anchor);
        }
        _this.setSelectedPageCss();
        _this.addPageClickEventListener();
    }

    htmlHelper.prototype.addPageClickEventListener = function () {
        var $paginationControlsElement = document.querySelector('#pagination').firstElementChild,
            _this = this;
        $paginationControlsElement.addEventListener('click', function (event) {
            if (event.target.tagName.toLocaleLowerCase() === 'a') {
                pagenationHelper.setCurrentPage(event.target.text);
                _this.renderGrid(apiHandler.getVideos());
                _this.setSelectedPageCss();
            }
        });
    }

    htmlHelper.prototype.setSelectedPageCss = function () {
        var $paginationElement = document.querySelector('#pagination').firstElementChild,
            currentPage = pagenationHelper.getCurrentPage(),
            $selectedPagination = $paginationElement.querySelector('#page' + currentPage);
        if (!$selectedPagination) {
            currentPage = 1;
            pagenationHelper.setCurrentPage(currentPage);
            $selectedPagination = $paginationElement.querySelector('#page' + currentPage);
        }
        var $previousActivePage = $paginationElement.querySelector('.active');
        if ($previousActivePage) {
            $previousActivePage.classList.remove('active');
        }
        $selectedPagination.classList.add('active');
    }

    htmlHelper.prototype.renderGrid = function (videos) {
        var _this = this,
            $videoItem = document.createDocumentFragment(),
            $videosSection = document.querySelector('#youtube-container'),
            itemCount = apiHandler.getVideosPerPage(),
            startIndex = pagenationHelper.getStartIndex(itemCount),
            numberOfpages;
        _this.clearGrid();
        for (var i = startIndex; i < (startIndex + itemCount); i++) {
            if (videos[i]) {
                var $node = this.getVideoItem(videos[i], i);
                $videoItem.appendChild($node);
            }
        }
        $videosSection.appendChild($videoItem);
        numberOfpages = pagenationHelper.getPageCount(videos);
        _this.renderPageNumbers(numberOfpages);
    }

    htmlHelper.prototype.getVideoItem = function (card, index) {
        var $template = document.importNode(document.querySelector('#video-container-tpl').content, true);
        $template.querySelector('.video-container').setAttribute('id', 'video_' + index);
        $template.querySelector('img').setAttribute('src', card.snippet.thumbnails.medium.url)

        var $videoLink = document.createElement('a');
        $videoLink.setAttribute('href', 'https://www.youtube.com/watch?v=' + card.id.videoId);
        $videoLink.setAttribute('target', '_blank');
        $videoLink.appendChild(document.createTextNode(card.snippet.title));
        $template.querySelector('.title').appendChild($videoLink);

        var $channelTitle = $template.querySelector('.channel-title');
        $channelTitle.appendChild(document.createTextNode(card.snippet.channelTitle));

        var $publishedDate = $template.querySelector('.published-date');
        $publishedDate.appendChild(document.createTextNode(card.snippet.publishedAt.substr(0, card.snippet.publishedAt.indexOf('T'))));

        var $description = $template.querySelector('.description');
        $description.appendChild(document.createTextNode(card.snippet.description));

        return $template;
    }
    return htmlHelper;
})();
