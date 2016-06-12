angular.module('snugfeed.service.articles', [])
    .service('snugfeedArticlesService', [ "$http", "$q", "$rootScope", function ($http, $q, $rootScope) {

        var getArticles = function (page,ids) {
            var query = page ? '&start='+page : '';
            ids = '?ids='+ids.join();
            return $http.get("/api/articles"+ids+query);
        };

        var saveArticle = function(id) {
            return $http.put("/api/article/"+id);
        };

        var getArticle = function(id) {
            return $http.get("/api/article/"+id);
        };

        var getArticlesByIds = function(ids) {
            return $http.get("/api/articles?article-ids="+ids);
        };

        var getSavedArticles = function() {
            return $http.get("/api/article");
        };

        return {
            getArticles: getArticles,
            saveArticle: saveArticle,
            getSavedArticles: getSavedArticles,
            getArticle: getArticle,
            getArticlesByIds: getArticlesByIds
        };

    }]);