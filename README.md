# CAT304-CampusConnect (Py4)
CAT304 Group Project - Group 14 (Py4)

14/01/2025

Implemented:
- Have the system automatically check for events that have already expired (past its end date and time). These events will have their status changed from "approved" to "expired". Since only "approved" events is displayed, these "expired" events are treated similarly to "rejected" events.  ✅
- On the Admin's Event Request, modified the "Delete All Rejected Events" to "Delete All Rejected and Expired Events". Then, added confirmation message.
- RPA: CheckExpiredEvents(); Essentially, the system will check for expired events every one-minute intervals and change the status to "expired" ✅
- Added Reports page for Admin, showcasing visuals and statistics of the web app, can also print to pdf. Additionally, made Admin functionalities under a Dropdown Menu.
- Added some CSS for making button hovers.


To-do:
Maybe:
- Event approved/rejected --> Sends email notifying them about the approved/rejected
- Bug fixes
- Pending requests, the user can cancel.
