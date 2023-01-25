// ITG support routines commonly used for all projects

    //https://itgdev-47cfc20b9270ed.sharepoint.com/sites/derek/WGUArticulationApp/Pages/Default.aspx?
    //    SPHostUrl=https%3A%2F%2Fitgdev%2Esharepoint%2Ecom%2Fsites%2Fderek&
    //    SPLanguage=en%2DUS&SPClientTag=0&
    //    SPProductNumber=16%2E0%2E4002%2E1226&
    //    SPAppWebUrl=https%3A%2F%2FITGdev%2D47cfc20b9270ed%2Esharepoint%2Ecom%2Fsites%2Fderek%2FWGUArticulationApp


var itg = itg || {};

itg.GetQueryStringParameter = function (param) {
    if (param == null || param === undefined) return null;
    var sph = document.URL.split("?")[1];
    if (sph == null || sph === undefined) return null;

    var params = sph.split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == param) {
            return singleParam[1];
        }
    }
}

itg.SetCookie = function (key, value) {
    if (value == null || value == "null") return;
    var expires = new Date();
    expires.setTime(expires.getTime() + 31536000000); //1 year  
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

itg.GetCookie = function (key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

itg.LogError = function (message) {
    console.log(message);
}

itg.SPListGetByID = function (id, list, bind, callback, param) {
    var clientContext = new SP.ClientContext.get_current();
    var web = clientContext.get_web();

    if (itg.SPHostUrl != null) {
        var hostcontext = new SP.AppContextSite(clientContext, itg.SPHostUrl);
        web = hostcontext.get_web();
    }

    var targetList = web.get_lists().getByTitle(list);
    var li = targetList.getItemById(id);

    clientContext.load(li);
    clientContext.executeQueryAsync(Function.createDelegate(li, onQuerySucceeded), Function.createDelegate(li, onQueryFailed));

    function onQuerySucceeded() {
        var item = bind(li);
        callback(item, param);
    }

    function onQueryFailed(sender, args) {
        var message = 'Request failed. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace();
        itg.LogError(message);
        alert(message);
    }
}

itg.SpListGet = function (list, columns, query, binder, callback) {
    var clientContext = new SP.ClientContext();
    var web = clientContext.get_web();

    if (itg.SPHostUrl != null) {
        var hostcontext = new SP.AppContextSite(clientContext, itg.SPHostUrl);
        web = hostcontext.get_web();
    }

    var targetList = web.get_lists().getByTitle(list);
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(query);

    var listItems = targetList.getItems(camlQuery);
    clientContext.load(listItems, columns);
    clientContext.executeQueryAsync(Function.createDelegate(this, onQuerySucceeded), Function.createDelegate(this, onQueryFailed));

    function onQuerySucceeded() {
        var liEnumerator = listItems.getEnumerator();
        var items = new Array();
        while (liEnumerator.moveNext()) {
            var li = liEnumerator.get_current();
            var item = binder(li);
            items.push(item);
        }

        callback(items);
    }

    function onQueryFailed(sender, args) {
        var message = 'Request failed. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace()
        itg.LogError(message);
        alert(message);
    }
}

itg.SPListItemDelete = function (item, list, callback) {
	var clientContext = new SP.ClientContext();
    var web = clientContext.get_web();

    if (itg.SPHostUrl != null) {
        var hostcontext = new SP.AppContextSite(clientContext, itg.SPHostUrl);
        web = hostcontext.get_web();
    }

    var targetList = web.get_lists().getByTitle(list);
    var li = targetList.getItemById(item.Id);
    li.deleteObject();
    clientContext.executeQueryAsync(Function.createDelegate(li, onQuerySucceeded), Function.createDelegate(li, onQueryFailed));
 	
 	function onQuerySucceeded() {
        if (callback) callback(true);
    }

    function onQueryFailed(sender, args) {
        var message = 'Request failed. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace();
        itg.LogError(message);
        alert(message);

        //callback(false);
    }
}

itg.SPListUpdate = function (item, list, binder, callback) {
    var clientContext = new SP.ClientContext();
    var web = clientContext.get_web();

    if (itg.SPHostUrl != null) {
        var hostcontext = new SP.AppContextSite(clientContext, itg.SPHostUrl);
        web = hostcontext.get_web();
    }

    var targetList = web.get_lists().getByTitle(list);
    var li = targetList.getItemById(item.Id);
    li = binder(li, item);
    li.update();

    clientContext.executeQueryAsync(Function.createDelegate(li, onQuerySucceeded), Function.createDelegate(li, onQueryFailed));

    function onQuerySucceeded() {
        if (callback) callback(true);
    }

    function onQueryFailed(sender, args) {
        var message = 'Request failed. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace();
        itg.LogError(message);
        alert(message);

        //callback(false);
    }
}

itg.SPListCreate = function (item, list, binder, callback) {
    var clientContext = new SP.ClientContext();
    var web = clientContext.get_web();

    if (itg.SPHostUrl != null) {
        var hostcontext = new SP.AppContextSite(clientContext, itg.SPHostUrl);
        web = hostcontext.get_web();
    }

    var targetList = web.get_lists().getByTitle(list);
    var itemCreateInfo = new SP.ListItemCreationInformation();
    var li = targetList.addItem(itemCreateInfo);

    li = binder(li, item);
    li.update();

    clientContext.load(li);
    clientContext.executeQueryAsync(Function.createDelegate(li, onQuerySucceeded), Function.createDelegate(li, onQueryFailed));

    function onQuerySucceeded() {
        if (callback) callback(li.get_id());
    }

    function onQueryFailed(sender, args) {
        var message = 'Request failed. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace();
        itg.LogError(message);
        alert(message);
    }
}

itg.SPGetCurrentUser = function (callback) {
    var clientContext = new SP.ClientContext();
    var web = clientContext.get_web();

    if (itg.SPHostUrl != null) {
        var hostcontext = new SP.AppContextSite(clientContext, itg.SPHostUrl);
        web = hostcontext.get_web();
    }

    var currentUser = web.get_currentUser();
    clientContext.load(currentUser);
    clientContext.executeQueryAsync(Function.createDelegate(currentUser, onQuerySucceeded), Function.createDelegate(currentUser, onQueryFailed));

    function onQuerySucceeded() {
        callback(currentUser);
    }

    function onQueryFailed(sender, args) {
        var message = 'Request failed. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace();
        itg.LogError(message);
        alert(message);
    }

};

itg.SPGetLookupID = function (value) {
    if (value == null) return null;
    var id = value.get_lookupId();
    return id;
}

itg.SPGetLookupValue = function (value) {
    if (value == null) return null;
    var name = value.get_lookupValue();
    return name;
}

itg.SPSetLookupID = function (id) {
    var value = new SP.FieldLookupValue();
    value.set_lookupId(id);
    return value;
}
itg.SPSetUserLookupID = function (id) {		
    var value = new SP.FieldUserValue();		
    value.set_lookupId(id);		
    return value;		
}		
itg.SPGetUserLookupID = function (value) {		
    if (value == null) return null;		
    var id = value.get_lookupId();		
    return id;		
}

itg.SPHostUrl = null; //itg.GetCookie("SPHostUrl");
//if (itg.SPHostUrl == null) {
//    var value = decodeURIComponent(itg.GetQueryStringParameter("SPHostUrl"));
//    itg.SetCookie("SPHostUrl", value);
//    itg.SPHostUrl = itg.GetCookie("SPHostUrl");
//    if (itg.SPHostUrl == null) {
//        itg.LogError("Warning: Host web url not found.");
//    }
//}

itg.ParseQueryString = function(location) {
    var pairs = location.substring(1).split("&");
    var obj = {};
    var pair;
    var i;

    for ( i in pairs ) {
      if ( pairs[i] === "" ) continue;

      pair = pairs[i].split("=");
      obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
    }

    return obj;
};

itg.SPGetGroups = function(callback) {
    var clientContext = new SP.ClientContext();
    var web = clientContext.get_web();

    if (itg.SPHostUrl != null) {
        var hostcontext = new SP.AppContextSite(clientContext, itg.SPHostUrl);
        web = hostcontext.get_web();
    }

    var collGroups = web.get_siteGroups();
    clientContext.load(collGroups);
    clientContext.executeQueryAsync(Function.createDelegate(collGroups, onQuerySucceeded), Function.createDelegate(collGroups, onQueryFailed));

    function onQuerySucceeded() {
        var groupEnumerator = collGroups.getEnumerator();
        var groups = [];
        while (groupEnumerator.moveNext()) {
            var group = groupEnumerator.get_current();
            groups.push(group);
        }

        callback(groups);
    }

    function onQueryFailed(sender, args) {
        var message = 'Request failed. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace();
        itg.LogError(message);
        alert(message);
    }
};

itg.SPGetMemberGroups = function(callback) {
    var clientContext = new SP.ClientContext();
    var web = clientContext.get_web();

    if (itg.SPHostUrl != null) {
        var hostcontext = new SP.AppContextSite(clientContext, itg.SPHostUrl);
        web = hostcontext.get_web();
    }

    var currentUser = web.get_currentUser();
    var allGroups = currentUser.get_groups(); 
    clientContext.load(allGroups);
    clientContext.executeQueryAsync(Function.createDelegate(allGroups, onQuerySucceeded), Function.createDelegate(allGroups, onQueryFailed));

    function onQuerySucceeded() {
        var groupEnumerator = allGroups.getEnumerator();
        var groups = [];
        while (groupEnumerator.moveNext()) {
            var group = groupEnumerator.get_current();
            groups.push(group);
        }

        callback(groups);
    }

    function onQueryFailed(sender, args) {
        var message = 'Request failed. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace();
        itg.LogError(message);
        alert(message);
    }
}

itg.SPCreateGroup = function (name, description, role, callback) {
    if (role == null) role = "Contribute";
    var clientContext = new SP.ClientContext();
    var web = clientContext.get_web();

    if (itg.SPHostUrl != null) {
        var hostcontext = new SP.AppContextSite(clientContext, itg.SPHostUrl);
        web = hostcontext.get_web();
    }

    var group = new SP.GroupCreationInformation();
    group.set_title(name);
    group.set_description(description);

    var member = web.get_siteGroups().add(group);
    var contribute = web.get_roleDefinitions().getByName(role);
    var collection = SP.RoleDefinitionBindingCollection.newObject(clientContext);
    collection.add(contribute);

    var assignemnts = web.get_roleAssignments();
    assignemnts.add(member, collection);

    clientContext.load(member);
    clientContext.executeQueryAsync(Function.createDelegate(this, onQuerySucceeded), Function.createDelegate(this, onQueryFailed));

    function onQuerySucceeded() {
        callback(true);
    }

    function onQueryFailed(sender, args) {
        var message = 'Request failed. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace();
        itg.LogError(message);
        alert(message);
    }
};

itg.SPSetGroupOwner = function (name, owner, callback) {
    var clientContext = new SP.ClientContext();
    var web = clientContext.get_web();

    if (itg.SPHostUrl != null) {
        var hostcontext = new SP.AppContextSite(clientContext, itg.SPHostUrl);
        web = hostcontext.get_web();
    }

    var gowner = web.get_siteGroups().getByName(owner);
    var group = web.get_siteGroups().getByName(name);

    group.set_owner(gowner);
    group.update();

    clientContext.load(group);
    clientContext.executeQueryAsync(Function.createDelegate(this, onQuerySucceeded), Function.createDelegate(this, onQueryFailed));

    function onQuerySucceeded() {
        callback(true);
    }

    function onQueryFailed(sender, args) {
        var message = 'Request failed. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace();
        itg.LogError(message);
        alert(message);
    }
}

itg.SPClean = function (name) {
    var clean = name.replace("|", "").replace("#", "").replace("{","").replace("}","").replace("%", "");
    clean = clean.replace("&", "").replace("\"", "").replace("~", "").replace("+", "").replace("\\", "");
    clean = clean.replace(":", "").replace("?", "").replace("”", "").replace("<", "").replace(">", "");
    clean = clean.replace("\t", "").replace("/", "").replace("*", "");

    return clean;
};

//  http://www.codeproject.com/Articles/607127/Using-SharePoint-Workflow-Services-JS-API

itg.SPStartWorkflow = function (list_name, wf_def_id) {
    // var clientContext = new SP.ClientContext();
    // var web = clientContext.get_web();

    // if (itg.SPHostUrl != null) {
    //     var hostcontext = new SP.AppContextSite(clientContext, itg.SPHostUrl);
    //     web = hostcontext.get_web();
    // }

    // context.load(web);

    // var list = web.get_lists().getByTitle(list_name);
    // context.load(list);

    // var items = list.getItems(SP.CamlQuery.createAllItemsQuery());
    // context.load(items);

    // var servicesManager = SP.WorkflowServices.WorkflowServicesManager.newObject(context, web);
    // context.load(servicesManager);

    // var subs = servicesManager.getWorkflowSubscriptionService().enumerateSubscriptionsByDefinition(wf_def_id);
    // context.load(subs);

    // clientContext.executeQueryAsync(Function.createDelegate(subs, onQuerySucceeded), Function.createDelegate(subs, onQueryFailed));

    // function onQuerySucceeded() {
    //     var groupEnumerator = subs.getEnumerator();
    //     while (subsEnum.moveNext()) {

    //         var sub = subsEnum.get_current();

    //         console.log('Web: ' + web.get_url() + ', Subscription: ' + 
    //           sub.get_name() + ', id: ' + sub.get_id());

    //         var initiationParams = {};
    //         servicesManager.getWorkflowInstanceService().startWorkflowOnListItem(
    //           sub, items.getItemAtIndex(0).get_id(), initiationParams);

    //         context.executeQueryAsync(function (sender, args) {
    //             console.log('Workflow started.');
    //         }, errFunc);

    //     }

    //     callback(true);
    // }

    // function onQueryFailed(sender, args) {
    //     var message = 'Request failed. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace();
    //     itg.LogError(message);
    //     alert(message);
    // }
};