
(function (sp) {
    'use strict';

//     var app = angular.module("wguApp", []);
//     app.controller("partnersControl", ['$scope', function ($scope) {
//         $scope.states = [];
//         $scope.admin = true;
//         $scope.loading = true;
//
//         $scope.get_states = function (group) {
//             if ($scope.states == null) return;
//
//             var nationalIndex;
//         	for (var i = 0; i < $scope.states.length; i++) {
//         		if ($scope.states[i].Id == 80)
//         		nationalIndex = i;
//         	}
//
// 			if (nationalIndex)
// 			    $scope.states.splice(nationalIndex, 1);
//
//             var count = Math.ceil($scope.states.length/4);
//             var start = group * count;
//             var end = group * count + count;
//             if (end > $scope.states.length) end = $scope.states.length;
//
//             var results = [];
//             for (var i=start; i<end; i++) {
//                 results.push($scope.states[i]);
//             }
//
//             return results;
//         };

        function init() {
//             wgu.StateOption.GetAll(function (states) {
//                 $scope.loading = false;
//                 $scope.states = states;
//                 $scope.$apply();
//             });
//
//             //Get all national institutions.
//             wgu.Institution.GetAllByStateId(80, function (institutions) {
//                 $scope.nationals = institutions;
//                 $scope.$apply();
//             });
        }

        init();
    });

(SP);
