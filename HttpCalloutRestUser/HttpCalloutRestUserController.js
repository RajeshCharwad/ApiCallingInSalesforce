({
    makeCallout : function(component, event, helper) {
        helper.getResponse(component);
    },
    
    createUser : function(component, event, helper){
        helper.createNewUser(component);
    },
    
    getUserById : function(component,event,helper){
        helper.fetchUserById(component);
    },
    handleDelete: function (component, event, helper) {
        var clickedValue = event.getSource().get("v.value");
        helper.deleteUser(component,clickedValue);
    },
    openModel: function(component, event, helper) {
        component.set("v.isModalOpen", true);
        var userlist = component.get('v.listOfUser');
        var uid = event.getSource().get("v.value");
        helper.editUserDetails(component,uid,userlist);
    },
    closeModel: function(component, event, helper) {
        component.set("v.isModalOpen", false);
    },
    
    submitDetails: function(component, event, helper) {
        component.set("v.isModalOpen", false);
        var uid = component.get('v.userId');
        helper.updateUserDetails(component,uid);
    },
})