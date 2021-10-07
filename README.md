<b>BALLAST TOOL</b>

https://ballast.web.app/

Easily Add Custom URL (i.e. https://tents.ifai.com/tool for example using https://firebase.google.com/docs/hosting)

Application is written entirely in React JS. I have currently focused on it as a Web app, but is extensible to Android, iOS, and as a Windows or macOS app.
https://reactjs.org/
Google Cloud and Firebase are tightly integrated as the tools backend. I am most familiar with Google’s services, and they take care of security and reliability from anywhere in the world.
Use https://firebase.google.com/docs/cli tool to update any changes to the website, or the cloud functions.
https://github.com/firebase/firebase-admin-node (For algorithms, account security, and any other code users should not have direct access to).
https://github.com/firebase/firebase-js-sdk (Client side use. Allows users to query, delete, and modify their data) Firebase is an industry standard with very good documentation and very low costs.
Reliable and Familiar User Interface
https://material-ui.com/ is well documented and popular open source design library.
Secure Accounts
https://firebase.google.com/support/guides/security-checklist
https://firebase.google.com/support/privacy
https://firebase.google.com/support/privacy/clear-export-data
3rd party account creation I have also made possible. This is important for IFAI implementation. Users can potentially sign in with the accounts they already have set up with the IFAI.
Custom Security Roles
Rule based access to data.
Allows for easy control of access to all features, URLs, photos, and data within the tool.
Analytics
Users can opt in and out of analytics
View usage data and anonymized user demographic data to assess and improve the application.

Create Groups for Collaboration on Ballast Tool data. (In Progress)
Work with saved form data based on location, time, and/or the title.
Different privacy settings for who can access, change or view tent data.

Easy to edit documentation
The documentation about the tool is hosted on Github as a markdown document. No programming knowledge is required to change the information.
