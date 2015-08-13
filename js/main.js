angular.module("horror", [])
    .controller("HorrorController", function($scope, $http){
        var horror = this;
        horror.allData = [];
        horror.showCount = 5;
        $.getJSON("data.json", function(data) {
            horror.allData = data;
            horror.data = allData;
            horror.data.posts = horror.data.posts.slice(0, 5);
            setTimeout(function(){
                $("#message").replaceWith("<div id='message'><p style='text-align:center' class='animated fadeIn'>沒有啦，騙你的啦哈哈</p></div>");
                setTimeout(function(){
                    $("#message").remove();
                    $("#downMessage").show();
                    $scope.$apply();
                    $("#info").show();
                    $(".page").show();
                }, 1500);
            }, 1000);
        });

        horror.showMore = function() {
            horror.showCount += 10;
            horror.data.posts = horror.allData.posts.slice(0, showCount);
            console.log(horror.data.posts.length);
        };
    });