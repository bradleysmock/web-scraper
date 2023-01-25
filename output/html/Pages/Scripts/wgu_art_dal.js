// a crud based data access layer for the wgu articulation project

var wgu = wgu || {};
var ARTICULATION_ADMINS = 11;

wgu.StateOption = function () {
    this.Id = undefined;
    this.State = undefined;
    this.Abbreviation = undefined;
    this.IsDBAState = undefined;
    this.AALogo = undefined;
}

wgu.StateOption.Bind = function (li) {
    var state = new wgu.StateOption();
    state.Id = li.get_id();
    state.State = li.get_item("Title");
    state.Abbreviation = li.get_item("Abbreviation");
    state.IsDBAState = li.get_item("IsDBAState");
	state.AALogo = li.get_item("AALogo").get_url().replace("artAgrLogos","WGU State Logos artAgrLogos");

    return state;
}

wgu.StateOption.GetAll = function (callback) {
    var list = 'State Options';
    var columns = 'Include(Id, Title, Abbreviation, IsDBAState, AALogo)';
    var query = "<View><Query><OrderBy><FieldRef Name='Title' Ascending='True' /></OrderBy></Query></View>";

    itg.SpListGet(list, columns, query, wgu.StateOption.Bind, callback);
}

wgu.StateOption.GetByID = function (id, callback) {
    var list = 'State Options';
    itg.SPListGetByID(id, list, wgu.StateOption.Bind, callback);
}
wgu.Notification = function () {		
    this.Id = undefined;		
    this.Subject = undefined;		
    this.ToGroup = undefined;		
    this.Content = undefined;		
    this.Institution = undefined;		
}		
wgu.Notification.Bind = function (li, notification) {		
    if (notification == undefined) {		
        notification = new wgu.Institution();		
        notification.Id = li.get_id();		
        notification.Subject = li.get_item("Title");		
        notification.ToGroup = itg.SPGetUserLookupID(li.get_item("ToGroup"));		
        notification.Content = li.get_item("Content");		
        notification.Institution = SPGetLookupID(li.get_item("Institution"));		
        return notification;		
    }		
    else {		
        if (notification.Subject !== undefined) li.set_item('Title', notification.Subject);		
        if (notification.ToGroup !== undefined) li.set_item('ToGroup', itg.SPSetUserLookupID(notification.ToGroup));		
        if (notification.Content !== undefined) li.set_item('Content', notification.Content);		
        if (notification.Institution !== undefined) li.set_item('Institution', itg.SPSetLookupID(notification.Institution));		
        return li;		
    }		
}		
wgu.Notification.GetAll = function (callback) {		
    var list = 'Notifications';		
    var columns = 'Include(Id, Title, ToGroup, Content, Institution)';		
    var query = "<View><Query><OrderBy><FieldRef Name='Title' Ascending='True' /></OrderBy></Query></View>";		
    itg.SpListGet(list, columns, query, wgu.Notification.Bind, callback);		
}		
wgu.Notification.GetByID = function (id, callback) {		
    var list = 'Notifications';		
    itg.SPListGetByID(id, list, wgu.Notification.Bind, callback);		
}		
wgu.Notification.Update = function(notification, callback) {		
    var list = 'Notifications';		
    itg.SPListUpdate(notification, list, wgu.Notification.Bind, callback);		
}		
wgu.Notification.Create = function (notification, callback) {		
    var list = "Notifications";		
    itg.SPListCreate(notification, list, wgu.Notification.Bind, callback);		
}		
wgu.Notification.SendApproval = function (iid, notes, callback) {		
    wgu.Institution.GetByID(iid, function (institution) {		
        var notification = {		
            ToGroup: ARTICULATION_ADMINS,		
            Institution: iid,		
            Subject: "Articulation Agreement for: " + institution.Name,		
            Content: "Your group's approval is needed on a new agreement in the Agreements list. " +		
                     "<a href='https://share.wgu.edu/Pages/Approval.aspx'>Click Here</a> to approve " +		
                     "the item in question. <br /><br />" +		
                     "Comment/ Notes : " + notes + " <br /><br />" +		
                     "Thank you"		
        };		
        wgu.Notification.Create(notification, callback);		
    });		
}		
wgu.Notification.SendCollaboration = function (iid, callback) {		
    wgu.Institution.GetByID(iid, function (institution) {		
        var notification = {		
            ToGroup: itg.SPGetUserLookupID(institution.Group),		
            Institution: iid,		
            Subject: "Articulation Agreement for: " + institution.Name,		
            Content: "The Articulation package for your Transfer Pathways has been completed. " +		
                     "Please let us know if you are satisfied with the Transfer Pathways and " +		
                     "terms by reviewing the documents that have been provided and leaving comments " +		
                     "in the Discussion tab. WGU will make the necessary adjustments.<br /><br />" +		
                     "<a href='https://share.wgu.edu/Pages/Collaboration.aspx?iid=" + iid + "&&institution=" + encodeURIComponent(institution.Name) +		
                     "'>Articulation Package</a><br/><br/>Sincerely,<br/>WGU Articulation Agreements"		
        };		
        wgu.Notification.Create(notification, callback);		
    });		
}

wgu.Institution = function () {
    this.Id = undefined;
    this.Name = undefined;
    this.IsSystem = undefined;
    this.State = undefined;
    this.System = undefined;
    this.HasReverse = undefined;
    this.Logo = undefined;
    this.Group = undefined;
    this.OriginalID = undefined;
    this.District = undefined;
    this.IsDistrict = undefined;
}

wgu.Institution.Bind = function (li, institution) {
    if (institution == undefined) {
        institution = new wgu.Institution();
        institution.Id = li.get_id();
        institution.Name = li.get_item("Title");
        institution.IsSystem = li.get_item("IsSystem");
        institution.State = itg.SPGetLookupID(li.get_item("State"));
        institution.StateName = itg.SPGetLookupValue(li.get_item("State"));
        institution.System = itg.SPGetLookupID(li.get_item("System"));
        institution.HasReverse = li.get_item("HasReverse");
        
        //adding due to National Institutions not always having logos
        var checkLogo = li.get_item("Logo");
        if(checkLogo != undefined){

        	institution.Logo = li.get_item("Logo").get_url();
        	
        }else{
            
        }
        
        
        institution.Group = li.get_item("Group");
        institution.OriginalID = li.get_item("OriginalID");
		institution.District = itg.SPGetLookupID(li.get_item("District"));
		institution.IsDistrict = li.get_item("IsDistrict");

        return institution;
    }
    else {
        if (institution.Name !== undefined) li.set_item('Title', institution.Name);
        if (institution.IsSystem !== undefined) li.set_item('IsSystem', institution.IsSystem);
        if (institution.State !== undefined) li.set_item('State', itg.SPSetLookupID(institution.State));
        if (institution.System !== undefined) li.set_item('System', itg.SPSetLookupID(institution.System));
        if (institution.HasReverse !== undefined) li.set_item('HasReverse', institution.HasReverse);
        if (institution.Logo !== undefined) li.set_item('Logo', institution.Logo);
        if (institution.Group !== undefined) li.set_item('Group', institution.Group);
        if (institution.OriginalID !== undefined) li.set_item('OriginalID', institution.OriginalID);
		if (institution.District !== undefined) li.set_item('District', itg.SPSetLookupID(institution.District));
		if (institution.IsDistrict !== undefinfed) li.set_item('IsDistrict', instituion.IsDistrict);

        return li;
    }
}

wgu.Institution.GetByID = function (id, callback, param) {
    var list = 'Institutions';
    itg.SPListGetByID(id, list, wgu.Institution.Bind, callback, param);
}

wgu.Institution.GetAll = function (callback) {
    var list = 'Institutions';
    var columns = 'Include(Id, Title, IsSystem, State, System, HasReverse, Logo, Group, OriginalID, IsDistrict, District)';
    var query = "<View><Query><OrderBy><FieldRef Name='Title' Ascending='True' /></OrderBy></Query></View>";

    itg.SpListGet(list, columns, query, wgu.Institution.Bind, callback);
}

wgu.Institution.GetAllByStateId = function (id, callback) {
    var list = 'Institutions';
    var columns = 'Include(Id, Title, IsSystem, State, System, HasReverse, Logo, Group, OriginalID, IsDistrict, District)';
    var query = "<View><Query><Where><Eq><FieldRef Name=\"State\" LookupId=\"true\"/><Value Type=\"Lookup\">" + id + 
                "</Value></Eq></Where><OrderBy><FieldRef Name='Title' Ascending='True' /></OrderBy></Query></View>";

    itg.SpListGet(list, columns, query, wgu.Institution.Bind, callback);
}
wgu.Institution.GetAllByGroupIds = function (ids, callback) {		
    var list = 'Institutions';		
    var columns = 'Include(Id, Title, IsSystem, State, System, HasReverse, Logo, Group, IsDistrict, District)';		
    var query = "<View><Query><Where>";		
    var tmpl = "<Eq><FieldRef Name='Group' LookupId='TRUE'/><Value Type='Integer'>{0}</Value></Eq>";		
    if (ids.length == 1) {		
        query += tmpl.replace("{0}", ids[0].toString());		
    }		
    else {		
        var l = ids.length;		
        var ors = 0;		
        if (l >= 3) {		
            for (var j = 0; j < (l - 2); j++) {		
                query += "<Or>" + tmpl.replace("{0}", ids[j].toString());		
                ors += 1;		
            }		
        }		
        query += "<Or>" + tmpl.replace("{0}", ids[l - 2].toString());		
        query += tmpl.replace("{0}", ids[l - 1].toString()) + "</Or>";		
        for (var i = 0; i < ors; i++) {		
            query += "</Or>";		
        }		
    }		
    query += "</Where><OrderBy><FieldRef Name='Title' Ascending='True' /></OrderBy></Query></View>";		
    itg.SpListGet(list, columns, query, wgu.Institution.Bind, callback);		
}

wgu.Institution.Update = function(institution, callback) {
    var list = 'Institutions';
    itg.SPListUpdate(institution, list, wgu.Institution.Bind, callback);
}

wgu.Institution.Create = function (institution, callback) {
    var list = "Institutions";
    itg.SPListCreate(institution, list, wgu.Institution.Bind, callback);
}

wgu.Course = function () {
    this.Id = undefined;
    this.Name = undefined;
    this.Code = undefined;
    this.Units = undefined;
    this.Description=undefined;
    this.OriginalId = undefined;
}

wgu.Course.Bind = function (li, course) {
    if (course == undefined) {
        course = new wgu.Course();
        course.Id = li.get_id();
        course.Name = li.get_item("Title");
        course.Code = li.get_item("Code");
        course.Units = li.get_item("Units");
        course.Description = li.get_item("Description");

        return course;
    }
    else {
        if (course.Name !== undefined) li.set_item('Title', college.Name);
        if (course.Code !== undefined) li.set_item('Code', college.Code);
        if (course.Units !== undefined) li.set_item('Units', college.Units);
        if (course.Description !== undefined) li.set_item('Description', college.Description);

        return li;
    }
}

wgu.Course.GetAll = function (callback) {
    var list = 'Courses';
    var columns = 'Include(Id, Title, Code, Units, Description)';
    var query = "<View><Query><OrderBy><FieldRef Name='Name' Ascending='True' /></OrderBy></Query></View>";

    itg.SpListGet(list, columns, query, wgu.Course.Bind, callback);
}


wgu.Course.GetByID = function (id, callback, param) {
    var list = 'Courses';
    itg.SPListGetByID(id, list, wgu.Course.Bind, callback, param);
}

wgu.CourseAbbreviated=function(){
	this.Id = undefined;
	this.OriginalID =undefined;
}

wgu.CourseAbbreviated.Bind = function (li, course) {
    if (course == undefined) {
        course = new wgu.CourseAbbreviated();
        course.Id = li.get_id();
        course.OriginalID = li.get_item("OriginalID");
        return course;
    }
}

wgu.CourseAbbreviated.GetAllWithOriginalID = function (callback) {
   var list = 'Courses';
    var columns = 'Include(Id, OriginalID)';
    var query = "<View><Query><OrderBy><FieldRef Name='Name' Ascending='True' /></OrderBy></Query></View>";

    itg.SpListGet(list, columns, query, wgu.CourseAbbreviated.Bind, callback);
}


wgu.College = function () {
    this.Id = undefined;
    this.Name = undefined;
    this.Abbreviation = undefined;
}

wgu.College.Bind = function (li, college) {
    if (college == undefined) {
        college = new wgu.College();
        college.Id = li.get_id();
        college.Name = li.get_item("Title");
        college.Abbreviation = li.get_item("Abbreviation");
         college.Note = li.get_item("Note");

        return college;
    }
    else {
        if (college.Name !== undefined) li.set_item('Title', college.Name);
        if (college.Abbreviation !== undefined) li.set_item('Abbreviation', college.Abbreviation);
        
        return li;
    }
}

wgu.College.GetAll = function (callback) {
    var list = 'Colleges';
    var columns = 'Include(Id, Title, Abbreviation, Note)';
    var query = "<View><Query><OrderBy><FieldRef Name='Name' Ascending='True' /></OrderBy></Query></View>";

    itg.SpListGet(list, columns, query, wgu.College.Bind, callback);
}

wgu.College.GetByID = function (id, callback) {
   var list = 'Colleges';
    itg.SPListGetByID(id, list, wgu.College.Bind, callback);
}


wgu.Program = function () {
    this.Id = undefined;
    this.Name = undefined;
    this.Abbreviation = undefined;
    this.College = undefined;
    this.AASApply = undefined;
    this.AAASApply = undefined;
    this.BABSApply = undefined;
    this.NotesGeneral = undefined;
    this.NotesFundamental = undefined;
    this.NotesAdditional = undefined;
    this.NotesNonTransfer = undefined;
    this.NotesCore = undefined;
    this.NotesFinal = undefined;
    this.TDApply = undefined;
    this.Sequence = undefined;
    this.OriginalID = undefined;
}

wgu.Program.Bind = function (li, program) {
    if (program == undefined) {
        program = new wgu.Program();
        program.Id = li.get_id();
        program.Name = li.get_item("Title");
        program.Abbreviation = li.get_item("Abbreviation");
        program.College = itg.SPGetLookupID(li.get_item("College"));
        program.AASApply = li.get_item("AASApply");
        program.AAASApply = li.get_item("AAASApply");
        program.BABSApply = li.get_item("BABSApply");
        program.NotesGeneral = li.get_item("NotesGeneral");
        program.NotesFundamental = li.get_item("NotesFundamental");
        program.NotesAdditional = li.get_item("NotesAdditional");
        program.NotesNonTransfer = li.get_item("NotesNonTransfer");
        program.NotesCore = li.get_item("NotesCore");
        program.NotesFinal = li.get_item("NotesFinal");
        program.TDApply = li.get_item("TDApply");
        program.Sequence = li.get_item("Sequence");
		program.OriginalID = li.get_item("OriginalID");

        return program;
    }
    else {
        if (program.Name !== undefined) li.set_item('Title', program.Name);
        if (program.Abbreviation !== undefined) li.set_item('Abbreviation', program.Abbreviation);
        if (program.College !== undefined) li.set_item('College', itg.SPSetLookupID(program.College));
        if (program.AASApply !== undefined) li.set_item('AASApply', program.AASApply);
        if (program.AAASApply !== undefined) li.set_item('AAASApply', program.AAASApply);
        if (program.BABSApply !== undefined) li.set_item('BABSApply', program.BABSApply);
        if (program.NotesGeneral !== undefined) li.set_item('NotesGeneral', program.NotesGeneral);
        if (program.NotesFundamental !== undefined) li.set_item('NotesFundamental', program.NotesFundamental);
        if (program.NotesAdditional !== undefined) li.set_item('NotesAdditional', program.NotesAdditional);
        if (program.NotesNonTransfer !== undefined) li.set_item('NotesNonTransfer', program.NotesNonTransfer);
        if (program.NotesCore !== undefined) li.set_item('NotesCore', program.NotesCore);
        if (program.NotesFinal !== undefined) li.set_item('NotesFinal', program.NotesFinal);
        if (program.TDApply !== undefined) li.set_item('TDApply', program.TDApply);
        if (program.Sequence !== undefined) li.set_item('Sequence', program.Sequence);

        return li;
    }
}

wgu.Program.GetByID = function (id, callback) {
    var list = 'Programs';
    itg.SPListGetByID(id, list, wgu.Program.Bind, callback);
}

wgu.Program.GetAll = function (callback) {
    var list = 'Programs';
    var columns = 'Include(Id, Title, Abbreviation, College, AASApply, AAASApply, BABSApply, NotesGeneral, NotesFundamental, NotesAdditional, NotesNonTransfer, NotesFinal, NotesCore, TDApply, Sequence, OriginalID)';
    //var query = "<View><Query><OrderBy><FieldRef Name='Title' Ascending='True' /></OrderBy></Query></View>";//To change order change the name of the field
	var query = "<View><Query><Where><And><Neq><FieldRef Name='Abbreviation' /><Value Type='Text'>BSBAMGA</Value></Neq><Neq><FieldRef Name='Abbreviation' /><Value Type='Text'>BSBAMGB</Value></Neq></And></Where><OrderBy><FieldRef Name='Title' Ascending='True' /></OrderBy></Query></View>";
    itg.SpListGet(list, columns, query, wgu.Program.Bind, callback);
}

wgu.Program.GetAllByCollegeId = function (id, callback) {
    var list = 'Programs';
    var columns = 'Include(Id, Title, Abbreviation, College, AASApply, AAASApply, BABSApply, NotesGeneral, NotesFundamental, NotesAdditional, NotesNonTransfer, NotesFinal, NotesCore, TDApply, Sequence, OriginalID)';
    var query = "<View><Query><Where><Eq><FieldRef Name=\"College\" LookupId=\"true\"/><Value Type=\"Lookup\">" + id + 
                "</Value></Eq></Where><OrderBy><FieldRef Name='Sequence' Ascending='True' /></OrderBy></Query></View>";

    itg.SpListGet(list, columns, query, wgu.Program.Bind, callback);
}

wgu.Pathway = function () {
    this.Id = undefined;
    this.College = undefined;
    this.Area = undefined;
    this.Course = undefined;
    this.Programs = undefined;
    this.Sequence = undefined;
}

wgu.Pathway.Bind = function (li, pathway) {
    if (pathway == undefined) {
        pathway = new wgu.Pathway();
        pathway.Id = li.get_id();
        pathway.College = itg.SPGetLookupID(li.get_item("College"));
        pathway.Area = li.get_item("Area");
    	
        pathway.Course = new wgu.Course();
        pathway.Course.Id = itg.SPGetLookupID(li.get_item("Course"));
        pathway.Course.Name = itg.SPGetLookupValue(li.get_item("Course_x003a_Name"));
        pathway.Course.Code = itg.SPGetLookupValue(li.get_item("Course_x003a_Code"));
        pathway.Course.OriginalId = itg.SPGetLookupValue(li.get_item("Course_x003a_OriginalID"));
        pathway.Course.Units = parseFloat(itg.SPGetLookupValue(li.get_item("Course_x003a_Units")));
        pathway.Programs = li.get_item("Programs");
        pathway.Sequence = li.get_item("Sequence");

        return pathway;
    }
    else {
        console.log("wgu.Pathway.Bind - not implemented");
        return li;
    }
}

wgu.Pathway.GetAll = function (callback) {
    var list = 'Pathways';
    var columns = 'Include(Id, College, Area, Course, Course_x003a_Name, Course_x003a_Code, Course_x003a_Units,Course_x003a_OriginalID, Programs, Sequence)';
    var query = "<View><Query><OrderBy><FieldRef Name='Sequence' Ascending='True' /></OrderBy></Query></View>";

    itg.SpListGet(list, columns, query, wgu.Pathway.Bind, callback);
}

wgu.Pathway.GetAllByCollegeId = function (id, callback) {
    var list = 'Pathways';
    var columns = 'Include(Id, College, Area, Course, Course_x003a_Name, Course_x003a_Code, Course_x003a_Units, Course_x003a_OriginalID, Programs, Sequence)';
    var query = "<View><Query><Where>" + 
                "<Eq><FieldRef Name=\"College\" LookupId=\"true\"/><Value Type=\"Lookup\">" + id + "</Value></Eq>" +
                "</Where>" + 
                "<OrderBy><FieldRef Name='Sequence' Ascending='True' /></OrderBy></Query></View>";

    itg.SpListGet(list, columns, query, wgu.Pathway.Bind, callback);
}

wgu.Agreement = function () {
    this.Id = undefined;
    this.Name = undefined;
    this.Institution = undefined;
    this.InstitutionName = undefined;
    this.College = undefined;
    this.Pathways = undefined;
    this.CourseLookup = undefined;
    this.Applied = undefined;
    this.LockedBy = undefined;
    this.Modified = undefined;
   	this.Published = undefined;
    this.Status = undefined;
    this.RejectionComments = undefined;
    this.NotesForApprover = undefined;
    this.ProgramNotes = undefined;
}

wgu.Agreement.Bind = function (li, agreement) {
    if (agreement == undefined) {
        agreement = new wgu.Agreement();
        agreement.Id = li.get_id();
        agreement.Name = li.get_item("Title");

        agreement.Institution = itg.SPGetLookupID(li.get_item("Institution"));
        agreement.InstitutionName = itg.SPGetLookupValue(li.get_item("Institution"));
        agreement.College = itg.SPGetLookupID(li.get_item("College"));

        agreement.Pathways = li.get_item("Pathways");
        agreement.CourseLookup = li.get_item("Course_x0020_Lookup");
        agreement.Applied = li.get_item("Applied");
        agreement.LockedBy = li.get_item("LockedBy");
        agreement.Modified = li.get_item("Modified");
		agreement.Published= li.get_item("Published");
        agreement.Status= li.get_item("Status");
        agreement.RejectionComments= li.get_item("RejectionComments");
        agreement.NotesForApprover= li.get_item("NotesForApprover");
        agreement.ProgramNotes= li.get_item("ProgramNotes");

        return agreement;
    }
    else {
        if (agreement.Name !== undefined) li.set_item('Title', agreement.Name);
        if (agreement.Institution !== undefined) li.set_item('Institution', itg.SPSetLookupID(agreement.Institution));
        if (agreement.College !== undefined) li.set_item('College', itg.SPSetLookupID(agreement.College));
        if (agreement.Pathways !== undefined) li.set_item('Pathways', agreement.Pathways);
        if (agreement.CourseLookup !== undefined) li.set_item('Course_x0020_Lookup', agreement.CourseLookup);
        if (agreement.Applied !== undefined) li.set_item('Applied', agreement.Applied);
        if (agreement.LockedBy !== undefined) li.set_item('LockedBy', agreement.LockedBy);
		if (agreement.Published !== undefined) li.set_item('Published', agreement.Published);
        if (agreement.Status !== undefined) li.set_item('Status', agreement.Status);
        if (agreement.RejectionComments !== undefined) li.set_item('RejectionComments', agreement.RejectionComments);
        if (agreement.NotesForApprover !== undefined) li.set_item('NotesForApprover', agreement.NotesForApprover);
        if (agreement.ProgramNotes !== undefined) li.set_item('ProgramNotes', agreement.ProgramNotes);

        return li;
    }
}

wgu.Agreement.GetAll = function (callback) {
    var list = 'Agreements';
    var columns = 'Include(Id, Title, Institution, College, Pathways, Course_x0020_Lookup, Applied, LockedBy, Modified, Published, Status, ' +
                    'RejectionComments, NotesForApprover, ProgramNotes)';
    var query = "<View><Query><OrderBy><FieldRef Name='Name' Ascending='True' /></OrderBy></Query></View>";

    itg.SpListGet(list, columns, query, wgu.Agreement.Bind, callback);
}

wgu.Agreement.GetById = function (id, callback) {
   var list = 'Agreements';
    itg.SPListGetByID(id, list, wgu.Agreement.Bind, callback);
}

wgu.Agreement.GetAllByInstitutionId = function (id, callback) {
    var list = 'Agreements';
    var columns = 'Include(Id, Title, Institution, College, Pathways, Course_x0020_Lookup, Applied, LockedBy, Modified, Published, Status, ' +
                    'RejectionComments, NotesForApprover, ProgramNotes)';
    var query = "<View><Query><Where><Eq><FieldRef Name=\"Institution\" LookupId=\"true\"/><Value Type=\"Lookup\">" + id + 
                "</Value></Eq></Where><OrderBy><FieldRef Name='Title' Ascending='True' /></OrderBy></Query></View>";

    itg.SpListGet(list, columns, query, wgu.Agreement.Bind, callback);
}

wgu.Agreement.GetAllPending = function (callback) {
    var list = 'Agreements';
    var columns = 'Include(Id, Title, Institution, College, Pathways, Course_x0020_Lookup, Applied, LockedBy, Modified, Published, Status, ' +
                    'RejectionComments, NotesForApprover, ProgramNotes)';
    var query = "<View><Query><Where><Eq><FieldRef Name=\"Status\" /><Value Type=\"Text\">Pending" + 
                "</Value></Eq></Where><OrderBy><FieldRef Name='Title' Ascending='True' /></OrderBy></Query></View>";

    itg.SpListGet(list, columns, query, wgu.Agreement.Bind, callback);
}

wgu.Agreement.Create = function (agreement, callback) {
    var list = "Agreements";
    itg.SPListCreate(agreement, list, wgu.Agreement.Bind, callback);
}

wgu.Agreement.Update = function(agreement, callback) {
    var list = 'Agreements';
    itg.SPListUpdate(agreement, list, wgu.Agreement.Bind, callback);
}

wgu.Agreement.Delete = function(agreement, callback) {
    var list = 'Agreements';
    itg.SPListItemDelete(agreement, list, callback);
}

wgu.ReverseTransferRequest = function () {
    Institution = undefined;
    Signature = undefined;
    SignatureDate = undefined;
    StudentId = undefined;
    CUEarned = undefined;
    Agree1 = undefined;
    Agree2 = undefined;
    FirstName = undefined;
    MiddleName = undefined;
    LastName = undefined;
    OtherName = undefined;
    Birthdate = undefined;
    Social = undefined;
    Email = undefined;
    Phone = undefined;
    Address = undefined;
    City = undefined;
    State = undefined;
    Zip = undefined;
    Agree3 = undefined;
    AttendanceFrom = undefined;
    AttendanceTo = undefined;
    AttendanceState = undefined;
    PartnerName = undefined;
    Program = undefined;
    CreditsEarned = undefined;
    ReferUrl = undefined;
}

wgu.ReverseTransferRequest.Bind = function (li, rtr) {
    if (rtr == undefined) {
        rtr = new wgu.ReverseTransferRequest();
        rtr.Id = li.get_id();
        rtr.Institution = itg.SPGetLookupID(li.get_item("Institution"));
        rtr.Signature = li.get_item("Title");
        rtr.SignatureDate = li.get_item("SignatureDate");
        rtr.StudentId = li.get_item("StudentId");
        rtr.CUEarned = li.get_item("CUEarned");
        rtr.Agree1 = li.get_item("Agree1");
        rtr.Agree2 = li.get_item("Agree2");
        rtr.FirstName = li.get_item("FirstName");
        rtr.MiddleName = li.get_item("MiddleName");
        rtr.LastName = li.get_item("LastName");
        rtr.OtherName = li.get_item("OtherName");
        rtr.Birthdate = li.get_item("Birthdate");
        rtr.Social = li.get_item("Social");
        rtr.Email = li.get_item("Email");
        rtr.Phone = li.get_item("Phone");
        rtr.Address = li.get_item("Address");
        rtr.City = li.get_item("City");
        rtr.State = itg.SPGetLookupID(li.get_item("State"));
        rtr.Zip = li.get_item("Zip");
        rtr.Agree3 = li.get_item("Agree3");
        rtr.AttendanceFrom = li.get_item("AttendanceFrom");
        rtr.AttendanceTo = li.get_item("AttendanceTo");
        rtr.AttendanceState = li.get_item("AttendanceState");
        rtr.PartnerName = li.get_item("PartnerName");
        rtr.Program = li.get_item("Program");
        rtr.CreditsEarned = li.get_item("CreditsEarned");
        rtr.ReferUrl = li.get_item("ReferUrl");
        return rtr;
    }
    else {
        if (rtr.Institution !== undefined) li.set_item('Institution', itg.SPSetLookupID(rtr.Institution));
        if (rtr.Signature !== undefined) li.set_item('Title', rtr.Signature);
        if (rtr.SignatureDate !== undefined) li.set_item('SignatureDate', rtr.SignatureDate);
        if (rtr.StudentId !== undefined) li.set_item('StudentId', rtr.StudentId);
        if (rtr.CUEarned !== undefined) li.set_item('CUEarned', rtr.CUEarned);
        if (rtr.Agree1 !== undefined) li.set_item('Agree1', rtr.Agree1);
        if (rtr.Agree2 !== undefined) li.set_item('Agree2', rtr.Agree2);
        if (rtr.FirstName !== undefined) li.set_item('FirstName', rtr.FirstName);
        if (rtr.MiddleName !== undefined) li.set_item('MiddleName', rtr.MiddleName);
        if (rtr.LastName !== undefined) li.set_item('LastName', rtr.LastName);
        if (rtr.OtherName !== undefined) li.set_item('OtherName', rtr.OtherName);
        if (rtr.Birthdate !== undefined) li.set_item('Birthdate', rtr.Birthdate);
        if (rtr.Email !== undefined) li.set_item('Email', rtr.Email);
        if (rtr.Phone !== undefined) li.set_item('Phone', rtr.Phone);
        if (rtr.Address !== undefined) li.set_item('Address', rtr.Address);
        if (rtr.City !== undefined) li.set_item('City', rtr.City);
        if (rtr.State !== undefined) li.set_item('State', itg.SPSetLookupID(rtr.State));
        if (rtr.Zip !== undefined) li.set_item('Zip', rtr.Zip);
        if (rtr.Agree3 !== undefined) li.set_item('Agree3', rtr.Agree3);
        if (rtr.AttendanceFrom !== undefined) li.set_item('AttendanceFrom', rtr.AttendanceFrom);
        if (rtr.AttendanceTo !== undefined) li.set_item('AttendanceTo', rtr.AttendanceTo);
        if (rtr.AttendanceState !== undefined) li.set_item('AttendanceState', rtr.AttendanceState);
        if (rtr.PartnerName !== undefined) li.set_item('PartnerName', rtr.PartnerName);
        if (rtr.Program !== undefined) li.set_item('Program', rtr.Program);
        if (rtr.Social !== undefined) li.set_item('Social', rtr.Social);
        if (rtr.CreditsEarned !== undefined) li.set_item('CreditsEarned', rtr.CreditsEarned);
        if (rtr.ReferUrl !== undefined) li.set_item('ReferUrl', rtr.ReferUrl);
        return li;
    }
}

wgu.ReverseTransferRequest.GetAll = function (callback) {
    var list = 'Reverse Transfer Requests';
    var columns = 'Include(Id, Institution, Signature, SignatureDate, StudentId, CUEarned, Agree1' + 
        'Agree2, FirstName, MiddleName, LastName, OtherName, Birthdate, Social, Email, Phone, ' +
        'Address, City, State, Zip, Agree3, AttendanceFrom, AttendanceTo, AttendanceState, ' +
        'PartnerName, Program, CreditsEarned, ReferUrl)';

    var query = "<View><Query><OrderBy><FieldRef Name='Name' Ascending='True' /></OrderBy></Query></View>";

    itg.SpListGet(list, columns, query, wgu.ReverseTransferRequest.Bind, callback);
}

wgu.ReverseTransferRequest.GetById = function (id, callback) {
   var list = 'Reverse Transfer Requests';
    itg.SPListGetByID(id, list, wgu.ReverseTransferRequest.Bind, callback);
}

wgu.ReverseTransferRequest.GetAllByInstitutionId = function (id, callback) {
    var list = 'Reverse Transfer Requests';
    var columns = 'Include(Id, Institution, Signature, SignatureDate, StudentId, CUEarned, Agree1' + 
        'Agree2, FirstName, MiddleName, LastName, OtherName, Birthdate, Social, Email, Phone, ' +
        'Address, City, State, Zip, Agree3, AttendanceFrom, AttendanceTo, AttendanceState, ' +
        'PartnerName, Program, CreditsEarned, ReferUrl)';

    var query = "<View><Query><Where><Eq><FieldRef Name=\"Institution\" LookupId=\"true\"/><Value Type=\"Lookup\">" + id + 
                "</Value></Eq></Where><OrderBy><FieldRef Name='Title' Ascending='True' /></OrderBy></Query></View>";

    itg.SpListGet(list, columns, query, wgu.ReverseTransferRequest.Bind, callback);
}

wgu.ReverseTransferRequest.Create = function (rtr, callback) {
    var list = "Reverse Transfer Requests";
    itg.SPListCreate(rtr, list, wgu.ReverseTransferRequest.Bind, callback);
}

wgu.ReverseTransferRequest.Update = function(rtr, callback) {
    var list = 'Reverse Transfer Requests';
    itg.SPListUpdate(rtr, list, wgu.ReverseTransferRequest.Bind, callback);
}

wgu.Groups = function () {
    this.Id = undefined;
    this.Title = undefined;
    this.Description = undefined;
}

wgu.Groups.GetAll = function (callback) {
    itg.SPGetGroups(function (groups) {
        var wgroups = [];
        for (var i=0; i<groups.length; i++) {
            var title = groups[i].get_title();

            var wgroup = new wgu.Groups();
            wgroup.ID = groups[i].get_id();
            wgroup.Title = title;
            wgroup.Description = groups[i].get_description();

            wgroups.push(wgroup);
        }

        callback(wgroups);
    });
}
/*Recreated this function with a different name, because I don't understand the implication 		
of the 'JAX' prefix or where it is used.*/		
wgu.Groups.GetMyGroups = function (callback) {		
    itg.SPGetMemberGroups(function (groups) {		
        var wgroups = [];		
        for (var i=0; i<groups.length; i++) {		
            var wgroup = new wgu.Groups();		
            wgroup.ID = groups[i].get_id();		
            wgroup.Title = groups[i].get_title();		
            wgroup.Description = groups[i].get_description();		
            wgroups.push(wgroup);		
        }
	        callback(wgroups);		        
  });
}

wgu.Groups.GetMine = function (callback) {
    itg.SPGetMemberGroups(function (groups) {
        var wgroups = [];
        for (var i=0; i<groups.length; i++) {
            var title = groups[i].get_title();
            if (title.indexOf("JAX") == 0) {
                var wgroup = new wgu.Groups();
                wgroup.ID = groups[i].get_id();
                wgroup.Title = title;
                wgroup.Description = groups[i].get_description();

                 wgroups.push(wgroup);
            }
        }

        callback(wgroups);
    });
}

wgu.Groups.Create = function (name, description, role, owner, callback) {
    itg.SPCreateGroup(name, description, role, function (result) {
        if (!result) {
            alert ("Error: could not create group '" + name + "'");
            return;
        }
        itg.SPSetGroupOwner(name, owner, function (result) {
            if (!result) {
                alert ("Error: could not set owner on group '" + name + "'");
                return;
            }
            itg.SPGetGroups(function (groups) {
                for (var i=0; i<groups.length; i++) {
                    var title = groups[i].get_title();
                    if (title == name) {
                        var wgroup = new wgu.Groups();
                        wgroup.ID = groups[i].get_id();
                        wgroup.Title = title;
                        wgroup.Description = groups[i].get_description();

                        callback(wgroup);
                        return;
                    }
                }

                callback(null);
            });
        });
    });
};