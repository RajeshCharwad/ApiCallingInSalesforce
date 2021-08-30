public with sharing class HttpRestCallout {
    @AuraEnabled
    public static Map<String,Object> getCalloutResponse(String url){
        Http http = new Http();
        
        HttpRequest req = new HttpRequest();
        req.setEndpoint(url);
        req.setMethod('GET');
        
        HttpResponse res = http.send(req);
        
        Map<String, Object> responseMap = (Map<String,Object>) JSON.deserializeUntyped(res.getBody());
        
        return responseMap;
    }
    
    @AuraEnabled
    public static Integer createUserApex(String url, String userName, String userEmail, String userGender, String userStatus){
        Http http = new Http();
        JSON2Apex.Data responseJson = new JSON2Apex.Data();
        HttpRequest req = new HttpRequest();
        
        responseJson.name = userName;
        responseJson.email = userEmail;
        responseJson.gender = userGender;
        responseJson.status = userStatus;
        
        String jsonString = JSON.serialize(responseJson);
        req.setHeader('Content-Type','application/json');
        req.setEndpoint(url);
        req.setMethod('POST');
        req.setBody(jsonString);
        HttpResponse resp = http.send(req);
        
        JSON2Apex retJson = (JSON2Apex)Json.deserialize(resp.getBody(), JSON2Apex.Class);
        JSON2Apex.Data retData = retJson.data;
        Integer ret = retData.id;
        return ret;
        
    }
    
    @AuraEnabled
    public static void deleteUserRecord(String url){
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setHeader('Content-Type','application/json');
        req.setEndpoint(url);
        req.setMethod('DELETE');
        HttpResponse resp = http.send(req);
    }
    
    @AuraEnabled
    public static Integer updateUserApex(String url, String userName, String userEmail, String userGender, String userStatus){
        Http http = new Http();
        JSON2Apex.Data responseJson = new JSON2Apex.Data();
        HttpRequest req = new HttpRequest();
        
        responseJson.name = userName;
        responseJson.email = userEmail;
        responseJson.gender = userGender;
        responseJson.status = userStatus;
        
        String jsonString = JSON.serialize(responseJson);
        req.setHeader('Content-Type','application/json');
        req.setEndpoint(url);
        req.setMethod('PATCH');
        req.setBody(jsonString);
        HttpResponse resp = http.send(req);
        
        JSON2Apex retJson = (JSON2Apex)Json.deserialize(resp.getBody(), JSON2Apex.Class);
        JSON2Apex.Data retData = retJson.data;
        Integer ret = retData.id;
        return ret;
        
    }
}