angular.module("horror", [])
    .controller("HorrorController", function($scope, $http){
        var horror = this;
        var allData;
        var showCount = 5;
        $.getJSON("data.json", function(data) {
            allData = data;
            horror.data = allData;
            horror.data.posts = horror.data.posts.slice(0, 5);
            $("#message").replaceWith("<div id='message'><p style='text-align:center' class='animated fadeIn'>沒有啦，騙你的啦哈哈</p></div>");
            setTimeout(function(){
                $("#message").remove();
                $("#downMessage").show();
                $scope.$apply();
                $("#info").show();
                $(".page").show();
            }, 1500);
        });

        horror.showMore = function() {
            showCount += 10;
            horror.data.posts = allData.posts.slice(0, showCount);
            //$scope.$apply();
        };
    });