# ZesClub

## _Zes Club Web Application_

## Some Steps to follow:

- in Mongodb.js change the db to your desired credentials on local. Credentials for live are also there
- In pages/api/payment/index.js and pages/user/events/[id]/payment.js Change the sandbox stripe code with the live stripe code.
- npm run build to create the build the repo
- Do not replace the Public Folder of Cpanel with the current public folder as all ftp are in that public folder
- For uploading the build in cPanel,copy whole build into other local folder. Remove public folder,readme file , .git file and node_modules.Upload the folder into the cPanel .Extract the compress file into folder.donot replace the public folder.
- Always take backup of public folder before uploading new build.
