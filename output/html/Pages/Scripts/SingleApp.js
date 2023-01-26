// (function (sp) {
//     'use strict';

//     var app = angular.module("wguApp", ['ngSanitize']);
//     app.controller("singleControl", ['$scope', '$sce', function ($scope, $sce) {
//     //     $scope.program = undefined;
//     //     $scope.agreement = undefined;
//     //     $scope.institution = undefined;
//     //     $scope.college = undefined;
//     //     $scope.isAAS = false;
//     //     $scope.pathways = undefined;
//     //     $scope.totalsearned = { ge: 0, core: 0, fun: 0, add: 0, nonx: 0, totce: 0 };
//     //     $scope.totals = { ge: 0, core: 0, fun: 0, add: 0, nonx: 0, totce: 0 };
//     //     $scope.course = undefined;
//     //     $scope.test = $sce.trustAsHtml("<b>Hello</b> World ...");
//     //     $scope.additionalunitsavailable = 0;
//     //     $scope.state = undefined;
//     //     //moved from share for Issue 200
//     //     $scope.fillIn = "";
//     //
//     //
//     //     $scope.details = function (cid) {
//     //         wgu.Course.GetByID(cid, function (course) {
//     //             $scope.course = course;
//     //             $scope.$apply();
//     //             $('#dlgDetails').modal('show');
//     //         });
//     //     }

//         $scope.print = function () {
//             $(".WGUHeader").addClass("no-print");
//             $(".globalNav").addClass("no-print");
//             $("#suiteBar").addClass("no-print");
//             $('#printDisclaimer').show();
//             //var footerDiv = $('#s4-workspace > footer')[0].innerHTML;
//             //document.body.innerHTML += footerDiv;
//             window.print();
//         }

//     //     $scope.calculate_difference = function () {
//     //         //(program.Totals.General + program.Totals.Core + program.Totals.Fundamental + program.Totals.Additional) - program.Totals.Earned
//     //         var dif = (handleNaN($scope.totalsearned.ge) + handleNaN($scope.totalsearned.core) + handleNaN($scope.totalsearned.fun) + handleNaN($scope.totalsearned.add)) - handleNaN($scope.totals.totce);
//     //         if (dif > 0) {
//     //             return "+" + dif.toString();
//     //         }
//     //         else {
//     //             return dif.toString();
//     //         }
//     //     }
//     //
//     //     function handleNaN(val) {
//     //         if (val == undefined || val == null || isNaN(val)) {
//     //             return 0;
//     //         }
//     //         else return val;
//     //     }
//     //
//     //     function startsWithStr(chk, val) {
//     //         try {
//     //             return chk.toString().slice(0, val.length) === val.toString();
//     //         } catch (e) {
//     //             return false;
//     //         }
//     //     }
//     //
//     //     function pathwayAdded(arr, path) {
//     //         var added = false;
//     //         try {
//     //             for (var i = 0; i < arr.length; i++) {
//     //                 try {
//     //                     if (path.Id === arr[i].Id) {
//     //                         added = true;
//     //                         break;
//     //                     }
//     //                 } catch (e) {
//     //                 }
//     //             }
//     //         } catch (e) {
//     //         }
//     //         return added;
//     //     }
//     //
//     //     function init() {
//     //         var aid = itg.ParseQueryString(window.location.search)['aid'];
//     //         if (aid == null || aid == "") {
//     //             alert("Error: The Agreement Id (aid) must be passed in the query string. Returning to Share screen");
//     //             //window.location = "Share.aspx";
//     //             return;
//     //         }
//     //
//     //         var pid = itg.ParseQueryString(window.location.search)['pid'];
//     //         if (pid == null || pid == "") {
//     //             alert("Error: The Program Id (pid) must be passed in the query string. Returning to Share screen");
//     //             //window.location = "Share.aspx";
//     //             return;
//     //         }
//     //          wgu.Program.GetByID(pid, function (program) {
//     //                 $scope.program = program;
//     //                 $scope.$apply();
//     //
//     //         wgu.Agreement.GetById(aid, function (agreement) {
//     //             $scope.isAAS = startsWithStr(agreement.Name, "AAS");
//     //             $scope.agreement = agreement;
//     //             console.log("Agreement",$scope.agreement);
//     //             $scope.agreement.Pathways = eval(agreement.Pathways);
//     //             $scope.agreement.Applied = eval(agreement.Applied);
//     //             $scope.agreement.ProgramNotes = eval(agreement.ProgramNotes);
//     //
//     //             //Moved from share for issue 200
//     //             var splitAgreement = $scope.agreement.Name.split(" ")[0];
//     //             //console.log("Abrv",splitAgreement);
//     //             $scope.fillIn = splitAgreement + " - " + $scope.agreement.InstitutionName;
//     //             //end of lines moved from share for issue 200
//     //
//     //
//     //             for (var i = 0; i < $scope.agreement.Applied.length; i++) {
//     //                 if ($scope.agreement.Applied[i].ProgramId == $scope.program.OriginalID)
//     //
//     //                     $scope.totals.totce = $scope.agreement.Applied[i].Earned;
//     //             }
//     //
//     //             $scope.$apply();
//     //
//     //             wgu.Institution.GetByID(agreement.Institution, function (institution) {
//     //                 $scope.institution = institution;
//     //                 console.log("Insitution",$scope.institution);
//     //
//     //                wgu.StateOption.GetByID(institution.State, function(state){
//     //                 	$scope.state = state;
//     //                 	console.log("State", $scope.state);
//     //
//     //                 });
//     //                   $scope.$apply();
//     //             });
//     //
//     //             wgu.College.GetByID(agreement.College, function (college) {
//     //                 $scope.college = college;
//     //                 $scope.$apply();
//     //             });
//     //
//     //
//     //
//     //                 if ($scope.agreement.ProgramNotes != undefined) {
//     //                     for (var i = 0; i < $scope.agreement.ProgramNotes.length; i++) {
//     //                         if ($scope.agreement.ProgramNotes[i].Program == $scope.program.OriginalID) {
//     //                             $scope.program.Notes = $scope.agreement.ProgramNotes[i].Notes;
//     //                         }
//     //                     }
//     //                 }
//     //
//     //                 wgu.Pathway.GetAllByCollegeId(agreement.College, function (pathways) {
//     //                     $scope.pathways = [];
// 	// 					console.log("Initial Pathways", pathways);
//     //                     for (var h = 0; h < pathways.length; h++) {
//     //                         for (var j = 0; j < $scope.agreement.Pathways.length; j++) {
//     //
//     //
//     //
//     //                            if ($scope.agreement.Pathways[j].CourseId == pathways[h].Course.OriginalId) {
//     //                                 if (pathways[h].Area == "Additional Transfer") {
//     //                                     pathways[h].Course.Required = ""
//     //                                     if ($scope.agreement.Pathways[j].hasOwnProperty("Required") &&
//     //                                         $scope.agreement.Pathways[j].Required[$scope.program.OriginalID]) {
//     //                                         pathways[h].Course.Required = "Yes";
//     //                                         $scope.additionalunitsavailable += $scope.agreement.Pathways[j].CourseUnits;
//     //                                     }
//     //
//     //                                    else if ($scope.agreement.Pathways[j].hasOwnProperty("Value") && $scope.agreement.Pathways[j].Value[$scope.program.OriginalID]){
//     //                                         pathways[h].Course.Required = "No";
//     //                                     }
//     //                                 }
//     //                                 if ($scope.agreement.Pathways[j].hasOwnProperty("Value")) {
//     //
//     //                                     pathways[h].Course.Value = $scope.agreement.Pathways[j].Value[$scope.program.OriginalID];
//     //
//     //                                 }
//     //
//     //                                 break;
//     //                             }
//     //                         }
// 	//
// 	// 						for (var i = 0; i < pathways[h].Programs.length; i++) {
//     //                             var id = itg.SPGetLookupID(pathways[h].Programs[i]);
//     //                             if (id == program.Id) {
//     //                                 var added = pathwayAdded($scope.pathways, pathways[h]);
//     //                                 if (added === false) {
//     //                                     $scope.pathways.push(pathways[h]);
//     //
//     //                                     if (pathways[h].Area == "General Education") {
//     //                                         $scope.totals.ge += pathways[h].Course.Units;
//     //                                         if (pathways[h].Course.Value) {
//     //                                             $scope.totalsearned.ge += pathways[h].Course.Units;
//     //                                         }
//     //                                     }
//     //                                     else if (pathways[h].Area == "Core") {
//     //                                         $scope.totals.core += pathways[h].Course.Units;
//     //                                         if (pathways[h].Course.Value) {
//     //                                             $scope.totalsearned.core += pathways[h].Course.Units;
//     //                                         }
//     //                                     }
//     //                                     else if (pathways[h].Area == "Fundamental") {
//     //                                         $scope.totals.fun += pathways[h].Course.Units;
//     //                                         if (pathways[h].Course.Value) {
//     //                                             $scope.totalsearned.fun += pathways[h].Course.Units;
//     //                                         }
//     //                                     }
//     //
//     //                                     else if (pathways[h].Area == "Additional Transfer") {
//     //                                         $scope.totals.add += pathways[h].Course.Units;
//     //                                         if (pathways[h].Course.Value) {
//     //                                             //per Susan Sept 23 email that required courses should not count in Additional Course Transfer Credit Awarded
//     //                                             if ($scope.agreement.Pathways[j].hasOwnProperty("Required") && $scope.agreement.Pathways[j].Required[$scope.program.OriginalID]) { } //do nothing
//     //                                             else {
//     //                                                 $scope.totalsearned.add += pathways[h].Course.Units;
//     //                                             }
//     //                                         }
//     //                                     }
//     //                                     else if (pathways[h].Area == "Non-Transferable") $scope.totals.nonx += pathways[h].Course.Units;
//     //
//     //                                 }
//     //                                 break;
//     //                             }
//     //                         }
//     //                     }
// 	// 					console.log("Pathways final", $scope.pathways);
//     //                     $scope.$apply();
//     //                 });
//     //             });
//     //         });
//     //     }
//     //
//     //     init();
//     }]);

// })(SP);
