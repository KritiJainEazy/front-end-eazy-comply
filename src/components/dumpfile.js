



const obj1 = {
    "email": "satya@gmail.com",
    "firstName": "Satya",
    "lastName": "Suman",
    "name": "Satyawrat",
    "pwd": "Satya123",
    "userType": "Admin"
}

const obj2 = {
    "name":"Kriti1712",
    "firstName":"Kriti",
    "lastName":"Jain",
    "email":"kritijain1712@gmail.com",
    "pwd":"Kriti17",
    "userType":"Admin"
}



        {
            "id": "USE-21Dec2023193734221",
            "name": "dis",
            "firstName": "Disabling",
            "lastName": "test",
            "email": "dis@email.em",
            "userType": "User",
            "recordStatus": 1,
            "tenant": null,
            "organization": null
        }


Kittu123


//kritijain1712@gmail.com is successfully authenticated and has the authorities [READUSER, CREATEUSER, DELETEUSER, UPDATEUSER]


// {
//     message: "kritijain1712@gmail.com is successfully authenticated ",
//     authorities: [READUSER, CREATEUSER, DELETEUSER, UPDATEUSER],
// }


{
    "email": "kriti17122000@gmail.com",
    "firstName": "Kriti",
    "lastName": "Jain",
    "name": "Kriti17122000",
    "pwd": "Kriti123",
    "userType": "ADMIN"
}



WebSecurityConfigurerAdapter
WebSecurityConfigurerAdapter
The source of redirection lies within create-session="stateless". Just remove it from you http configuration element and you are able to login successful. create-session="stateless" prohibits the use of a server side session, which however is required for a form based login




PER-19Dec2023070330145
PER-18Dec2023070330145 - read
PER-16Dec2023070330225
PER-17Dec2023070330145




ROL-11Dec2023070330145 - A
ROL-19Dec2023070330145


USE-19Dec2023173927830 - A
USE-19Dec2023174305494





stuff to do - 

1. checkbox, pagination
2. sign out
3. remember me
4. to add enter keypress onClick functions
5. revisit pagination
6. to get all details once we remove the text from searchbar
7. not allow to go back to login page
8. not allow to go to main page
9. To extract tenant/organization name from object
10. to not send a call if no data is selected for bulk delete/disable/edit
11. to compare previous response and new response, and send if anything is changed


1. sorting
2. 

Done - 

3. api - create, read, delete, disable, 


test cases - 
1. Will I be able to create a user with same email if I have deleted that user previously




Here is what I did but had to unfortunately remove because they broke down at the last moment and my focus was to complete API integration first - 
pagination 
Sign out 
Not letting user go back to sign in page if already logged in
Not letting the user go to the main page if not logged in
remember me


Here is what I have to do based on fresh feedback and during the test cases that I ran through - 
to add enter keypress onClick functions
to get all the details once we remove the text from the search bar
to not send a call if no data is selected for bulk delete/disable
to compare previous responses and new responses, and send if anything is changed in edit field
sorting
 filtering
 code cleanup
avoiding magic strings


. 
to do - 
1. add checkbox only when delete permission given 


done - 
1. To change back to active inactive status
2. 