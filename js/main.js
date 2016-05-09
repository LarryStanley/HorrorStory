angular.module("horror", ['ngSanitize'])
    .controller("HorrorController", function($scope, $http){
        var horror = this;
        horror.showCount = 5;
        $.getJSON("data.json", function(data) {
            horror.data = data;
            setTimeout(function(){
                $("#message").replaceWith("<div id='message'><p style='text-align:center' class='animated fadeIn'>資料載入中...</p></div>");
                setTimeout(function(){
                    $("#message").remove();
                    $scope.$apply();
                    $("#info").show();
                    $("#info").addClass("animated fadeIn");
                    $(".page").show();
                    $("#pageOne").append('<div class="animated fadeIn" id="downMessage" style="position: absolute; left: 50%; bottom:0; padding: 10px 10px 10px 10px;"><div style="position: relative; left: -50%; text-align:center">下拉查看排名<br><i class="fa fa-chevron-down"></i></div></div>')
                }, 1500);
            }, 2000);
        });

        horror.showMore = function(scope, el, attrs) {
            horror.showCount = horror.showCount + 10;
            if (horror.showCount > 200)
                $("#showMoreButton").hide();

        };

        horror.sortByLike = function() {
            $("#winnerResults").hide();
            $("#sortResults").show();
            $("#showMoreButton").show();
            $("#sortByLikeButton").addClass("active");
            $("#sortByCommentButton").removeClass("active");
            $("#winnerButton").removeClass("active");
            horror.data.posts.sort(function(a,b){
                return parseFloat(b.likes.summary.total_count) - parseFloat(a.likes.summary.total_count);
            });
        };

        horror.sortByComment = function() {
            $("#winnerResults").hide();
            $("#sortResults").show();
            $("#showMoreButton").show();
            $("#sortByLikeButton").removeClass("active");
            $("#sortByCommentButton").addClass("active");
            $("#winnerButton").removeClass("active");
            horror.data.posts.sort(function(a,b){
                return parseFloat(b.comments.summary.total_count) - parseFloat(a.comments.summary.total_count);
            });
        };

        horror.showWinnerList = function() {
            $("#sortResults").hide();
            $("#showMoreButton").hide();
            $("#sortByLikeButton").removeClass("active");
            $("#sortByCommentButton").removeClass("active");
            $("#winnerButton").addClass("active");
            $("#winnerResults").show();
        }
    });
$(document).ready(function(){
    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        if (scroll > 5){
            $("#downMessage").removeClass("animated fadeIn");
            $("#downMessage").addClass("animated fadeOut");
        } else {
            $("#downMessage").removeClass("animated fadeOut");
            $("#downMessage").addClass("animated fadeIn");
        }
    });
});

angular.module('horror')
    .filter('nlToBr', function() {
  return function(text) {
    text = text.replace(/(?:\r\n|\r|\n)/g, "<br />");

    return text;
  };
});