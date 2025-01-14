# CAT304-CampusConnect (Py4)
CAT304 Group Project - Group 14 (Py4)

14/01/2025

Implemented:
- Whenever the user access the Events page, have the system automatically check for events that's already expired (past its end date and time). These events will have their status changed from "approved" to "expired". Since only "approved" events is displayed, these "expired" events are treated similarly to "rejected" events.  ✅
- Then, on the Admin's Event Request, modify the "Delete All Rejected Events" to "Delete All Rejected and Expired Events". Then, on the modal after clicking the "Delete All Rejected and Expired Events, under "Are you sure you want to delete all rejected events? This action cannot be undone.", display a list of the events (using their Event Title) that would be deleted. ✅
- RPA: CheckExpiredEvents(); Essentially, system will check for expired events every one minute intervals and change status to "expired" ✅


To-do:
Maybe:
- Event approved/rejected --> Sends email notifying them about the approved/rejected
- RPA - Report: myCSD events? most popular venue? events approved? Simple Statistic / Graph (Python?)
- Make the web app look more attractive and interesting
- Bug fixes
- Pending requests, user can cancel.
