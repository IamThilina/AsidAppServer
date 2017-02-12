# AsidAppServer

### Server Ports

```
 AsidAppServer    -    localhost:3000
 
 GovernmentProfileAggregatingServer    -    localhost:8080
 
 SocialMediaProfileMatchingServer      -    localhost:5000
 
 SocialMediaAndGovernmentProfileMergingServer    -   localhost:4000
```

### Create User Roles

#### send a GET request to following URL
* http://seekthem.me/api/authorize/add/role/ROLE
* Username : ROLE_USER
* Password: ROLE_PASSWORD
* ROLES must be one of ["NIC", "MOTOR", "License"]