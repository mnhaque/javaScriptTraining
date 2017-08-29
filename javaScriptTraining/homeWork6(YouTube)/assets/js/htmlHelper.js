var htmlHelper = (function () {
    'use strict';

    function htmlHelper() {};

    htmlHelper.prototype.iniTializeSearchPage = function () {
        var _this = this,
            $searchBox = document.querySelector('#youtubesearch');
        $searchBox.addEventListener('keyup', function (event) {
            event.preventDefault();
            if (event.keyCode == 13) {
                var searchText = $searchBox.value;
                apiHandler.searchForVideos(searchText).then(function (videos) {
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
        var _this = this;
        _this.renderPageNumbers(pagenationHelper.getPageCount(items));
        _this.addPageClickEventListener();
    }

    htmlHelper.prototype.clearGrid = function () {
        var $allVideos = document.querySelector('#youtube-container');
        if ($allVideos) {
            var $last;
            while ($last = $allVideos.lastChild) {
                $allVideos.removeChild($last);
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

    htmlHelper.prototype.clearPagination = function () {
        var $paginationElement = document.querySelector('#pagination .pagination-controls');
        if ($paginationElement) {
            var $last;
            while ($last = $paginationElement.lastChild) {
                $paginationElement.removeChild($last);
            }
        }
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
            startIndex = pagenationHelper.getStartIndexForPage(itemCount),
            numberOfpages;
        this.clearGrid();
        for (var i = startIndex; i < (startIndex + itemCount); i++) {
            if (videos[i]) {
                var $node = this.getVideoItem(videos[i], i);
                $videoItem.appendChild($node);
            }
        }
        $videosSection.appendChild($videoItem);
        numberOfpages = pagenationHelper.getPageCount(videos);
        _this.renderPageNumbers(numberOfpages);
        _this.addPageClickEventListener();
    }

    htmlHelper.prototype.getVideoItem = function (card, index) {
        var $template = document.importNode(document.querySelector('#video-container-tpl').content, true);
        $template.querySelector('.video-container').setAttribute('id', 'video_' + index);

        var $imgElement = $template.querySelector('img');
        $imgElement.setAttribute('src', card.snippet.thumbnails.medium.url);

        var $title = $template.querySelector('.title');
        var $videoLink = document.createElement('a');
        $videoLink.setAttribute('href', 'https://www.youtube.com/watch?v=' + card.id.videoId);
        $videoLink.setAttribute('target', '_blank');
        $videoLink.appendChild(document.createTextNode(card.snippet.title));
        $title.appendChild($videoLink);

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
