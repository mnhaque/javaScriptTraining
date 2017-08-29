(function () {
    function start() {
        apiHandler = new apiHandler();
        pagenationHelper = new pagenationHelper();
        htmlHelper = new htmlHelper();
        htmlHelper.iniTializeSearchPage();
    }
    start();
})();
