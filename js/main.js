angular.module("horror", ['ngSanitize'])
    .controller("HorrorController",  ['$scope', function($scope) {
        var horror = this;
        horror.showCount = 5;
        $.getJSON("data.json", function(data) {
            horror.data = data;
            setTimeout(function(){
                setTimeout(function(){
                    $("#message").remove();
                    $scope.$apply();
                    $("#info").show();
                    $("#info").addClass("animated fadeIn");
                    $(".center").append('<p style="text-align:center">Made by <a href="https://goo.gl/7FSJVN" target="_blank">銀行汽車貸款＿吳先生</a><br />每十五分鐘更新一次<br /></p>');
                    $(".page").show();
                    $("#pageOne").append('<div class="animated fadeIn" id="downMessage" style="position: absolute; left: 50%; bottom:0; padding: 10px 10px 10px 10px;"><div style="position: relative; left: -50%; text-align:center">下拉查看排名<br><i class="fa fa-chevron-down"></i></div></div>')
                }, 1500);
            }, 2000);
        });

        horror.showMore = function(scope, el, attrs) {
            $("#showMoreButton").html("載入更多字......");
            setTimeout(function() {
                horror.showCount = horror.showCount + 10;
                $("#showMoreButton").html("載入更多字");
                $scope.$apply();
                if (horror.showCount > 200)
                    $("#showMoreButton").hide();
            }, 1500);
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

        horror.readMore = function(index) {
            horror.modalTitle = horror.data.posts[index].from.name;
            horror.modalPost = horror.data.posts[index].message.replace(/(?:\r\n|\r|\n)/g, "<br />");
            horror.modalLikesCount = horror.data.posts[index].likes.summary.total_count;
            horror.commentsCount = horror.data.posts[index].comments.summary.total_count;
            horror.modalRank = index + 1;
            horror.modalUserId = horror.data.posts[index].from.id;
            horror.modalLink = horror.data.posts[index].actions[0].link;
            horror.full_picture = horror.data.posts[index].full_picture;
            $('#readMoreModal').modal('toggle');
            return false;
        };
    }]);
var adSenseTpl = '';

if ($(window).width() > 750)
    adSenseTpl = '<ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px" data-ad-client="ca-pub-7855893380609929" data-ad-slot="4446103290"></ins>';
else
    adSenseTpl = '<ins class="adsbygoogle" style="display:inline-block;width:320px;height:100px" data-ad-client="ca-pub-7855893380609929" data-ad-slot="7399569699"></ins>';

angular.module('horror')
    .directive('googleAdsense', function($window, $compile) {
    return {
        restrict: 'A',
        transclude: true,
        template: adSenseTpl,
        replace: false,
        link: function postLink(scope, element, iAttrs) {
                element.html("");
                element.append(angular.element($compile(adSenseTpl)(scope)));
                if (!$window.adsbygoogle) {
                    $window.adsbygoogle = [];
                }
                $window.adsbygoogle.push({});
        }
    };
});

angular.module('horror')
    .filter('readMore', function() {
  return function(text) {
    text = text.split(/(?:\r\n|\r|\n)/g);
    for (var i = 0; i < 3; i++) {
        if (!text[i])
            text[i] = " ";
    }

    return text[0] + "<br>" + text[1] + "<br />" + text[2] + "<br />";
  };
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

        if($(window).scrollTop() + $(window).height() == $(document).height()) {
           $("#showMoreButton").click();
        }
    });
});