
// update Live Chat agents unavailability
List<Audit_Log__c> logs = [Select Id,Type__c,Clicked_Button__c FROM Audit_Log__c WHERE Type__c='Live Chat agents unavailability' LIMIT 1000];
System.debug('logs.size '+ logs.size());
if(!logs.isEmpty()){
    for (Audit_Log__c log : logs){
        log.Type__c = 'Live Chat';
        log.Duration__c = 0;
        if(log.Clicked_Button__c == 'CS Agent Unavailable'){
            log.Clicked_Button__c = 'No CS Agents Online';
        }else{
            log.Clicked_Button__c = 'No TSE Agents Online';
        }
        
        System.debug('log '+ log);
    }
}

update logs;

// update SLA Warning logs
List<Audit_Log__c> logs = [Select Id,Type__c FROM Audit_Log__c WHERE Type__c='SLA Warning' LIMIT 1000];
System.debug('logs.size '+ logs.size());
if(!logs.isEmpty()){
    for (Audit_Log__c log : logs){
        log.Type__c = 'Live Chat';
        log.Duration__c = 60;
        System.debug('log '+ log);
    }
}

update logs;


// update Chat Presented logs
List<Audit_Log__c> presentedlogs = [Select Id,Type__c,Messaging_Session__c,Time_Stamp__c FROM Audit_Log__c WHERE Type__c='Chat Presented' LIMIT 1000];
System.debug('Presented logs.size '+ presentedlogs.size());
Map<Id, Audit_Log__c> sessionIdToPresentedLog = new Map<Id, Audit_Log__c>();
if(!presentedlogs.isEmpty()){
    for (Audit_Log__c presentedlog : presentedlogs){
        presentedlog.Type__c = 'Live Chat';
        presentedlog.Duration__c = 0;
        sessionIdToPresentedLog.put(presentedlog.Messaging_Session__c, presentedlog);
        System.debug('presentedlog '+ presentedlog);
    }

    List<Audit_Log__c> acceptedlogs = [Select Id,Type__c,Messaging_Session__c,Time_Stamp__c FROM Audit_Log__c WHERE Type__c='Chat Accepted' AND Messaging_Session__c IN :sessionIdToPresentedLog.keySet() LIMIT 1000];
    System.debug('Accepted logs.size '+ acceptedlogs.size());
    if(!acceptedlogs.isEmpty()){
        for (Audit_Log__c acceptedlog : acceptedlogs){
            acceptedlog.Type__c = 'Live Chat';
            acceptedlog.Duration__c = Integer.valueOf(Math.round((acceptedlog.Time_Stamp__c.getTime() - sessionIdToPresentedLog.get(acceptedlog.Messaging_Session__c).Time_Stamp__c.getTime()) / 1000));
            System.debug('acceptedlog '+ acceptedlog);

        }
        update acceptedlogs;

    }

    update presentedlogs;

}



