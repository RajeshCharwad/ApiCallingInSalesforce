({
    getResponse : function(component) {
        var action = component.get("c.getCalloutResponse");
        action.setParams({
            "url" : "https://gorest.co.in/public/v1/users?access-token=3c3dc2a10907d01844d69299398099a2c6f6f696536f9ee14cec5d7f8f3aa15f"
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(component.isValid() && state === "SUCCESS"){
                component.set("v.response",response.getReturnValue());
                var getAllUsers = component.get("v.response")["data"];
                var userList = [];
                for(var key in getAllUsers){
                    userList.push(getAllUsers[key]);
                }
                component.set("v.listOfUser",userList);
            }
        });
        $A.enqueueAction(action);
    },
    
    createNewUser : function(component){
        var name = component.find('UserName');
        var nameData = component.find('UserName').get('v.value');
        if($A.util.isUndefinedOrNull(nameData) || $A.util.isUndefined(nameData) || $A.util.isEmpty(nameData)){
            name.set("v.errors",[{message:'User Name is required'}]);
        }else{
            name.set("v.errors",null);
        }
        
        var email = component.find('UserEmail');
        var emailData = component.find('UserEmail').get('v.value');
        if($A.util.isUndefinedOrNull(emailData) || $A.util.isUndefined(emailData) || $A.util.isEmpty(emailData)){
            email.set("v.errors",[{message:'User Email is required'}]);
        }else{
            email.set("v.errors",null);
        }
        
        var genderData = component.find('Gender').get('v.value');
        
        var status = component.find('Status');
        var statusData = component.find('Status').get('v.value');
        if($A.util.isUndefinedOrNull(statusData) || $A.util.isUndefined(statusData) || $A.util.isEmpty(statusData)){
            status.set("v.errors",[{message:'User Status is required'}]);
        }else{
            status.set("v.errors",null);
        }
        
        
        var action = component.get("c.createUserApex");
        action.setParams({
            "url" : "https://gorest.co.in/public/v1/users?access-token=3c3dc2a10907d01844d69299398099a2c6f6f696536f9ee14cec5d7f8f3aa15f",
            "userName" : nameData,
            "userEmail" : emailData,
            "userGender" : genderData,
            "userStatus" : statusData
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(component.isValid() && state === "SUCCESS"){
                var returnValue = response.getReturnValue();
                component.set("v.userId" , returnValue);
                this.showToast(component,returnValue);
                component.find('UserName').set('v.value',"");
                component.find('UserEmail').set('v.value',"");
                component.find('Gender').set('v.value',"");
                component.find('Status').set('v.value',"");
            }
            else{
                console.log('Unable to create user: '+ response.getError());
            }
        });
        $A.enqueueAction(action);
    },
    showToast : function(component,uId) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The user has been created successfully with id "+ uId
        });
        toastEvent.fire();
    },
    
    fetchUserById : function(component){
        var id = component.find('newUserId').get('v.value');
        var action = component.get("c.getCalloutResponse");
        action.setParams({
            "url" : "https://gorest.co.in/public/v1/users/"+id
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(component.isValid() && state === "SUCCESS"){
                component.set("v.response",response.getReturnValue());
                var getAllUsers = component.get("v.response")["data"];
                component.set("v.listOfUser",getAllUsers);
                component.find('newUserId').set('v.value',"");
            }
            
        });
        $A.enqueueAction(action);
    },
    deleteUser : function(component, userId) {
        var action = component.get("c.deleteUserRecord");
        action.setParams({
            "url" : "https://gorest.co.in/public/v1/users/"+userId+"?access-token=3c3dc2a10907d01844d69299398099a2c6f6f696536f9ee14cec5d7f8f3aa15f"
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(component.isValid() && state === "SUCCESS"){
                alert("User deleted successfully");
            }
        });
        $A.enqueueAction(action);
    },
    editUserDetails : function(component,idx,listuser){
        var keysOfObject = Object.keys(listuser);
        for(var i = 0; i< Object.keys(listuser).length; i++){
            if(idx === listuser[keysOfObject[i]].id){
                component.find('uName').set('v.value',listuser[keysOfObject[i]].name);
                component.find('uEmail').set('v.value',listuser[keysOfObject[i]].email);
                component.find('uGender').set('v.value',listuser[keysOfObject[i]].gender);
                component.find('uStatus').set('v.value',listuser[keysOfObject[i]].status);
                var setUserId = listuser[keysOfObject[i]].id;
                component.set("v.userId",setUserId);
                break;
            }
        }
    },
    
    updateUserDetails : function(component,updateId){
        var name = component.find('uName').get('v.value');
        var email = component.find('uEmail').get('v.value');
        var gender = component.find('uGender').get('v.value');
        var status = component.find('uStatus').get('v.value');
        var action = component.get("c.updateUserApex");
        action.setParams({
            "url" : "https://gorest.co.in/public/v1/users/"+updateId+"?access-token=3c3dc2a10907d01844d69299398099a2c6f6f696536f9ee14cec5d7f8f3aa15f",
            "userName" : name,
            "userEmail" : email,
            "userGender" : gender,
            "userStatus" : status
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(component.isValid() && state === "SUCCESS"){
                alert("User details updated successfully with id  " + response.getReturnValue());
                $A.get('e.force:refreshView').fire();
            }
        });
        $A.enqueueAction(action);
    }
})