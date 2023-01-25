
(function (sp) {
    'use strict';

    // var app = angular.module("wguApp", []);
    // app.controller("partnerInstsControl", ['$scope','$filter', function ($scope, $filter) {
    //     // $scope.state = undefined;
    //     // $scope.institutions = undefined;
    //
    //     function init() {
    //     //     var sid = itg.ParseQueryString(window.location.search)['sid'];
    //     //     if (sid == null || sid == "") {
    //     //         alert("Error: The State Id (sid) must be passed in the query string. Returning to State screen");
    //     //         //window.location = "Partners.aspx";
    //     //         return;
    //     //     }
    //     //
    //     //     wgu.StateOption.GetByID(sid, function (state) {
    //     //         $scope.state = state;
    //     //         $scope.$apply();
    //     //     });
	// 	//
	// 	// $scope.get_institutes = function (group) {
    //     //     if ($scope.institutions == null) return;
	// 	// 	var count = Math.ceil($scope.institutions.length/3);
	// 	// 	var start = group * count;
	// 	// 	var end = group * count + count;
	// 	// 	if (end > $scope.institutions.length) end = $scope.institutions.length;
    //     //
	// 	// 	var results = [];
    //     //
    //     //     for (var i=start; i<end; i++){
    //     //         results.push($scope.institutions[i]);
	// 	// 	}
    //     //     return results;
    //     // };
    //     //
    //     //     wgu.Institution.GetAllByStateId(sid, function (institutions) {
    //     //     angular.forEach(institutions, function(inst, i){
	// 	// 				if (inst.District){
	// 	// 					var instArr = $filter('filter')(institutions, {
	// 	// 						Id: inst.District
	// 	// 					}, true);
	// 	// 					if (instArr.length > 0){
	// 	// 						if (!instArr[0].ChildDistricts){
	// 	// 							instArr[0].ChildDistricts = [];
	// 	// 							instArr[0].ChildDistricts.push(inst);
	// 	// 						}
	// 	// 						else{
	// 	// 							instArr[0].ChildDistricts.push(inst);
	// 	// 						}
	// 	// 					}
	// 	// 				}
	// 	// 			});
	// 	// 			for(var i = institutions.length - 1; i >= 0; i--){
	// 	// 				if (institutions[i].District){
	// 	// 					institutions.splice(i, 1);
	// 	// 				}
	// 	// 			}
    //     //
    //     //         $scope.institutions = institutions;
    //     //         $scope.$apply();
    //     //     });
    //     }
    //
    //     init();
    // }]);

})(SP);
