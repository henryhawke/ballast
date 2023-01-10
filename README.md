<b>BALLAST TOOL</b>

<b>USING node v14.18.2 (npm v9.1.2)</b>

I recommend installing Node Version Manager

For Apple (mac)

1. install homebrew https://brew.sh/ -> You'll thank me later

   # ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

2. install nvm https://tecadmin.net/install-nvm-macos-with-homebrew/

   # brew update

   # brew install nvm

   # mkdir ~/.nvm

   Now, configure the required environment variables. Edit the following configuration file in your home directory

   #vim ~/.bash_profile

   and, add the below lines to ~/.bash_profile ( or ~/.zshrc for macOS Catalina or newer versions)

   # export NVM_DIR=~/.nvm

   # source $(brew --prefix nvm)/nvm.sh

   Press ESC + :wq to save and close your file.

   <b>Next</b>, load the variable to the current shell environment. From the next login, it will automatically loaded.

   # source ~/.bash_profile

   That’s it. The NVM has been installed on your macOS system. Go to next step to install Node.js versions with the help of nvm.

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

Create Groups for Collaboration on Ballast Tool data.

Work with saved form data based on location, time, and/or the title.

Different privacy settings for who can access, change or view tent data.

Easy to edit documentation

The documentation about the tool is hosted on Github as a markdown document. No programming knowledge is required to change the information.
