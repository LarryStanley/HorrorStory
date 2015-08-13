angular.module("horror", [])
    .controller("HorrorController", function($scope, $http){
        var horror = this;
        horror.showCount = 5;
        $.getJSON("data.json", function(data) {
            horror.data = data;
            setTimeout(function(){
                $("#message").replaceWith("<div id='message'><p style='text-align:center' class='animated fadeIn'>沒有啦，騙你的啦哈哈</p></div>");
                setTimeout(function(){
                    $("#message").remove();
                    $scope.$apply();
                    $("#info").show();
                    $(".page").show();
                }, 1500);
            }, 2000);
        });

        horror.showMore = function(scope, el, attrs) {
            horror.showCount = horror.showCount + 10;
        };

        horror.sortByLike = function() {
            $("#sortByLikeButton").addClass("active");
            $("#sortByCommentButton").removeClass("active");
            horror.data.posts.sort(function(a,b){
                return parseFloat(b.likes.summary.total_count) - parseFloat(a.likes.summary.total_count);
            });
        };

        horror.sortByComment = function() {
            $("#sortByLikeButton").removeClass("active");
            $("#sortByCommentButton").addClass("active");
            horror.data.posts.sort(function(a,b){
                return parseFloat(b.comments.summary.total_count) - parseFloat(a.comments.summary.total_count);
            });
        };
    });