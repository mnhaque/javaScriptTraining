var HtmlHelper = (function () {
    'use strict';

    function HtmlHelper() {};
    ApiHandler = new ApiHandler();
    PagenationHelper = new PagenationHelper();

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
                ApiHandler.searchForVideos($searchBox.value).then(function (videos) {
                    PagenationHelper.setCurrentPage(1);
                    _this.renderGrid(videos);
                    _this.renderPagenation(videos);
                    window.addEventListener('resize', function () {
                        _this.renderGrid(videos);
                        _this.renderPagenation(videos)
                    });
                });
            }
        });
        $search.appendChild($searchBox);
        document.body.appendChild($search);
    }

    HtmlHelper.prototype.renderPagenation = function (items) {
        this.renderPageNumbers(PagenationHelper.getPageCount(items));
    }

    HtmlHelper.prototype.clearGrid = function () {
        this.clearHtmlContainer('#youtube-container');
    }

    HtmlHelper.prototype.clearPagination = function () {
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
            $paginationFragment = document.createElement('div');
        $paginationFragment.setAttribute('id', 'pagination');
        $paginationFragment.setAttribute('class', 'pagination-controls');
        _this.clearPagination();
        for (var i = 0; i < numberOfpages; i++) {
            var $anchor = document.createElement('a');
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
        var $paginationControlsElement = document.querySelector('#pagination'),
            _this = this;
        $paginationControlsElement.addEventListener('click', function (event) {
            if (event.target.tagName.toLocaleLowerCase() === 'a') {
                PagenationHelper.setCurrentPage(event.target.text);
                _this.renderGrid(ApiHandler.getVideos());
                _this.setSelectedPageCss();
            }
        });
    }

    HtmlHelper.prototype.setSelectedPageCss = function () {
        var $paginationElement = document.querySelector('#pagination'),
            currentPage = PagenationHelper.getCurrentPage(),
            $selectedPagination = $paginationElement.querySelector('#page' + currentPage);
        if (!$selectedPagination) {
            currentPage = 1;
            PagenationHelper.setCurrentPage(currentPage);
            $selectedPagination = $paginationElement.querySelector('#page' + currentPage);
        }
        var $previousActivePage = $paginationElement.querySelector('.active');
        if ($previousActivePage) {
            $previousActivePage.classList.remove('active');
        }
        $selectedPagination.classList.add('active');
    }

    HtmlHelper.prototype.renderGrid = function (videos) {
        var _this = this,
            $videoItem = document.createDocumentFragment(),
            $videosSection = document.createElement('div'), //querySelector('#youtube-container'),
            itemCount = ApiHandler.getVideosPerPage(),
            startIndex = PagenationHelper.getStartIndex(itemCount),
            numberOfpages;
        $videosSection.setAttribute('id', 'youtube-container');
        _this.clearGrid();
        for (var i = startIndex; i < (startIndex + itemCount); i++) {
            if (videos[i]) {
                var $node = this.getVideoItem(videos[i], i);
                $videoItem.appendChild($node);
            }
        }
        $videosSection.appendChild($videoItem);
        document.body.appendChild($videosSection);
        numberOfpages = PagenationHelper.getPageCount(videos);
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
