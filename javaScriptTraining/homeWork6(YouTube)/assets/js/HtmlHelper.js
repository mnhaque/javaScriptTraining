var HtmlHelper = (function () {
    'use strict';

    function HtmlHelper() {}
    var apiHandler = new ApiHandler(),
        paginationHelper = new PaginationHelper();

    HtmlHelper.prototype.initializePage = function () {
        var _this = this,
            $search = document.createElement('div'),
            $searchBox;
        $search.classList.add('search');
        $searchBox = document.createElement('input');
        $searchBox.setAttribute('type', 'text');
        $searchBox.setAttribute('id', 'searchbox');
        $searchBox.addEventListener('keyup', function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                apiHandler.searchForVideos($searchBox.value).then(function (videos) {
                    paginationHelper.setCurrentPage(1);
                    _this.renderGrid(videos);
                });
            }
        });
        $search.appendChild($searchBox);
        document.body.appendChild($search);
        window.addEventListener('resize', function () {
            var videos = apiHandler.getVideos();
            if (videos.length) {
                paginationHelper.setCurrentPage(1);
                _this.renderGrid(videos);
            }
        });
    }

    HtmlHelper.prototype.renderPagenation = function (items) {
        this.renderPageNumbers(paginationHelper.getPageCount(items, apiHandler));
    }

    HtmlHelper.prototype.clearGrid = function () {
        this.clearHtmlContainer('#youtube-container');
    }

    HtmlHelper.prototype.clearPagination = function () {
        var $node = document.querySelector('#pagination');
        if ($node) {
            $node.removeEventListener('click', paginationClick);
        }
        this.clearHtmlContainer('#pagination');
    }

    HtmlHelper.prototype.clearHtmlContainer = function (selector) {
        var $node = document.querySelector(selector);
        if ($node) {
            document.body.removeChild($node);
        }
    }

    HtmlHelper.prototype.renderPageNumbers = function (numberOfpages) {
        var _this = this,
            $paginationFragment = document.createElement('div'),
            $anchor;
        $paginationFragment.setAttribute('id', 'pagination');
        $paginationFragment.setAttribute('class', 'pagination-controls');
        _this.clearPagination();
        for (var i = 0; i < numberOfpages; i++) {
            $anchor = document.createElement('a');
            $anchor.appendChild(document.createTextNode(i + 1));
            $anchor.setAttribute('id', 'page' + (i + 1));
            $anchor.setAttribute('href', '#');
            $paginationFragment.appendChild($anchor);
        }
        document.body.appendChild($paginationFragment);
        _this.setSelectedPageCss();
        _this.addPageClickEventListener();

    }

    HtmlHelper.prototype.addPageClickEventListener = function () {
        var _this = this,
            $paginationControlsElement = document.querySelector('#pagination');
        $paginationControlsElement.addEventListener('click', paginationClick);
    }

    function paginationClick(event) {
        if (event.target.tagName.toLowerCase() === 'a') {
            paginationHelper.setCurrentPage(event.target.text);
            HtmlHelper.prototype.renderGrid(apiHandler.getVideos());
            HtmlHelper.prototype.setSelectedPageCss();
        }
    }

    HtmlHelper.prototype.setSelectedPageCss = function () {
        var $paginationElement = document.querySelector('#pagination'),
            currentPage = paginationHelper.getCurrentPage(),
            $selectedPagination = $paginationElement.querySelector('#page' + currentPage),
            $previousActivePage;
        if (!$selectedPagination) {
            currentPage = 1;
            paginationHelper.setCurrentPage(currentPage);
            $selectedPagination = $paginationElement.querySelector('#page' + currentPage);
        }
        $previousActivePage = $paginationElement.querySelector('.active');
        if ($previousActivePage) {
            $previousActivePage.classList.remove('active');
        }
        if ($selectedPagination) {
            $selectedPagination.classList.add('active');
        }
    }

    HtmlHelper.prototype.renderGrid = function (videos) {
        var _this = this,
            $videosSection = document.createElement('div'),
            itemCount = apiHandler.getVideosPerPage(),
            startIndex = paginationHelper.getStartIndex(itemCount),
            range = startIndex + itemCount,
            numberOfpages, $node;
        $videosSection.setAttribute('id', 'youtube-container');
        _this.clearGrid();
        for (var i = startIndex; i < range; i++) {
            if (videos[i]) {
                $node = this.getVideoItem(videos[i], i);
                $videosSection.appendChild($node);
            }
        }
        document.body.appendChild($videosSection);
        numberOfpages = paginationHelper.getPageCount(videos, apiHandler.getVideosPerPage());
        _this.renderPageNumbers(numberOfpages);
    }

    HtmlHelper.prototype.getVideoItem = function (card, index) {
        var $template = document.importNode(document.querySelector('#video-container-tpl').content, true);
        $template.querySelector('.video-container').setAttribute('id', 'video_' + index);
        $template.querySelector('img').setAttribute('src', card.snippet.thumbnails.medium.url)

        var $videoLink = document.createElement('a');
        $videoLink.setAttribute('href', config.YOUTUBE_LINK + card.id.videoId);
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
    return HtmlHelper;
})();
