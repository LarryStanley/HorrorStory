angular.module("joker", ['ngSanitize'])
    .controller("JokerController",  ['$scope', function($scope) {
        var joker = this;
        joker.showCount = 5;
        $.getJSON("http://drink.fbstats.info/joker.json", function(data) {
            joker.data = data;
            $scope.$apply();
        });

    }]);
var adSenseTpl = '';

if ($(window).width() > 750)
    adSenseTpl = '<ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px" data-ad-client="ca-pub-7855893380609929" data-ad-slot="4446103290"></ins>';
else
    adSenseTpl = '<ins class="adsbygoogle" style="display:inline-block;width:320px;height:100px" data-ad-client="ca-pub-7855893380609929" data-ad-slot="7399569699"></ins>';

angular.module('joker')
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

angular.module('joker')
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