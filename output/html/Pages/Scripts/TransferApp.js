(function () {
    'use strict';

    // var app = angular.module("wguApp", []);
    // app.controller("transferControl", ['$scope', function ($scope) {
    //
    //     $scope.staten = undefined;
    //     $scope.colleges = [];
    //     $scope.programs = [];
    //     $scope.pathways = [];
    //     $scope.courses = [];
    //     $scope.institution = undefined;
    //
    //     function init(iid) {
    //
    //         if (iid == null || iid == "")
    //             return;
    //
    //         wgu.Institution.GetByID(iid, function (institution) {
    //             $scope.institution = institution;
    //             if (institution.HasReverse) jQuery("#resize_div").css("width", "520px");
    //             //Code below commented out due to 209 but brought back due to 225 and 226
    //
    //             console.log("System Value", institution.System);
    //             console.log("System Boolean Value", institution.IsSystem);
    //             if (institution.System != null && institution.IsSystem == true){
    //                 iid = institution.System;
	// 				console.log("SystemID", iid);
	// 			}
	// 			else{
	// 			   console.log("Leave id alone");
	// 			   console.log("InstitutionID", iid);
    //
	// 			}
    //
    //             wgu.College.GetAll(function (colleges) {
    //                 $scope.colleges = colleges;
    //                 $scope.$apply();
    //
    //                 wgu.Pathway.GetAll(function (pathways) {
    //                     $scope.pathways = pathways;
    //
    //                     wgu.Program.GetAll(function (programs){
    //                         $scope.programs = programs;
    //                         $scope.$apply();
    //
    //                         wgu.CourseAbbreviated.GetAllWithOriginalID(function (courses) {
    //                             $scope.courses = courses;
    //
    //                             wgu.Agreement.GetAllByInstitutionId(iid, function (agreements) {
    //                                 for (var k=0; k<agreements.length; k++) {
    //                                     agreements[k].Pathways = eval(agreements[k].Pathways);
    //                                     console.log("agreements[k].Applied", agreements[k].Applied);
    //                                     agreements[k].Applied = eval(agreements[k].Applied);
    //                                 }
    //
    //                                 for (var i=0; i<$scope.programs.length; i++) {
    //                                     $scope.programs[i].Agreements = [];
    //                                     for (var j=0; j<agreements.length; j++) {
    //                                         if (!contains_total_credits(agreements[j], $scope.programs[i])) continue;
    //                                         if (contains_program(agreements[j], $scope.programs[i]))
    //                                             $scope.programs[i].Agreements.push(agreements[j]);
    //                                     }
    //                                 }
    //
    //                                 for (var i=0; i<$scope.colleges.length; i++) {
    //                                     $scope.colleges[i].HasPrograms = false;
    //                                     for (var j=0; j<$scope.programs.length; j++) {
    //                                         if ($scope.colleges[i].Id != $scope.programs[j].College) continue;
    //                                         if ($scope.programs[j].Agreements.length == 0) continue;
    //
    //                                         $scope.colleges[i].HasPrograms = true;
    //                                         break;
    //                                     }
    //                                 }
    //
    //                                 wgu.StateOption.GetByID($scope.institution.State, function (state) {
    //                                     $scope.state = state;
    //                                     $scope.$apply();
    //                                 });
    //                             });
    //                         });
    //                     });
    //                 });
    //             });
    //         });
    //     }
    //
    //     function get_iid() {
    //         var d = jQuery.Deferred(function () {
    //             var currentTerm = _spFriendlyUrlPageContextInfo;
    //             var context = SP.ClientContext.get_current();
    //             var taxonomySession = SP.Taxonomy.TaxonomySession.getTaxonomySession(context);
    //             var termStore = taxonomySession.get_termStores().getByName("Managed Metadata Service");
    //             var termSet = termStore.getTermSet(currentTerm.termSetId);
    //             var term = termSet.getTerm(currentTerm.termId);
    //             context.load(term);
    //             context.executeQueryAsync(
    //             function () {  // Successfull
    //                 var iid = term.get_localCustomProperties().iid;
    //                 d.resolve(iid);
    //             },
    //             function (sender, args) {  // Failure
    //                 d.reject(args.get_message());
    //             });
    //         });
    //         return d.promise();
    //     }
    //
    //     function map_course(id) {
    //         for (var i=0; i<$scope.courses.length; i++) {
    //             if ($scope.courses[i].OriginalID == id)
    //                 return $scope.courses[i].Id;
    //         }
    //
    //         return null;
    //     }
    //
    //     function map_program(id) {
    //         for (var i=0; i<$scope.programs.length; i++) {
    //             if ($scope.programs[i].Id == id)
    //                 return $scope.programs[i].OriginalID;
    //         }
    //
    //         return null;
    //     }
    //
    //     function contains_total_credits(agreement, program) {
    //         var pid = map_program(program.Id);
    //         for (var i=0; i<agreement.Applied.length; i++) {
    //             if (agreement.Applied[i].Earned == null) continue;
    //             if (agreement.Applied[i].Exclude == true) continue; //missing caused exclusion from partners to not work added back in issue 228
    //             if (agreement.Applied[i].ProgramId == pid) return true;
    //         }
    //
    //         return false;
    //     }
    //
    //     function contains_program(agreement, program) {
    //         var pid = map_program(program.Id);
    //         for(var i=0; i<agreement.Pathways.length; i++) {
    //             var cid =  map_course(agreement.Pathways[i].CourseId);
    //             if (is_nontransferable(program, cid, agreement)) continue;
    //             if (is_additional_na(program, cid, agreement)) continue;
    //             if (agreement.Pathways[i].hasOwnProperty("Value") &&
    //                 agreement.Pathways[i].Value[pid] != null &&
    //                 agreement.Pathways[i].Value[pid] != "") {
    //                     return true;
    //             }
    //         }
    //         return false;
    //     }
    //
    //     function is_nontransferable(program, cid, agreement) {
    //         for (var i=0; i<$scope.pathways.length; i++) {
    //             if (!pathway_contains_program($scope.pathways[i], program)) continue;
    //             if ($scope.pathways[i].Course.Id == cid &&
    //                 $scope.pathways[i].Area == "Non-Transferable") {
    //                     return true;
    //             }
    //         }
    //
    //         return false;
    //     }
    //
    //     function is_additional_na(program, cid, agreement) {
    //         for (var i=0; i<$scope.pathways.length; i++) {
    //             if (pathway_contains_program($scope.pathways[i], program)) continue;
    //             if ($scope.pathways[i].Course.Id == cid &&
    //                 $scope.pathways[i].Area == "Additional Transfer") {
    //                     return true;
    //             }
    //         }
    //
    //         return false;
    //     }
    //
    //     function pathway_contains_program(pathway, program) {
    //         if (pathway.Programs == null) return false;
    //         for (var i=0; i<pathway.Programs.length; i++) {
    //             if (itg.SPGetLookupID(pathway.Programs[i]) == program.Id) return true;
    //         }
    //
    //         return false;
    //     }
    //
    //     // init...
    //     if (typeof _spFriendlyUrlPageContextInfo == "undefined") {
    //         // get iid from querystring when not friendly url...
    //         init(itg.ParseQueryString(window.location.search)['iid']);
    //     } else {
    //         // otherwise get iid from term store...
    //         get_iid().then( function (iid) {
    //             init(iid);
    //         });
    //     }
    //
    // }]);
})();
