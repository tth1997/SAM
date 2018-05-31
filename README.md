# SAM
SAM web application for Ship audititing.

## Installation Instructions ##

1. Create a new directory in your local files and move to that directory. 
2. Clone this repository to your local git repository by typing ```git clone https://github.com/tth1997/SAM.git``` in your console.
3. Once you've cloned, open your mongodb folder and initalise your database through ```mongod --dbpath new_folder/SAM/NodeEmployee/data```
and import the counters.json located in the new_folder/SAM/NodeEmployee into your local database. Here's the command: ```mongoimport -db <your database> -c counters -f <new folder>/SAM/NodeEmployee```
NOTE: Be sure to run this command in the same folder as mongoimport executable.
4. Open the app.js in the cloned repository and change the ```mongoose.connect('mongodb://localhost/shipping')``` line to whichever database you plan to host on.
By Default, localhost is used.
5. Make sure you have installed Node.js. After you've installed Node.js, open the cloned repository's directory in command line and enter ```npm install```
to install all dependencies in the project.
6. Afterwards, enter ```npm start``` to run the project.
7. Open your web browser and go to ('localhost:3000'). This where you will run the application. Alternatively, you can change the ports by adding an extra line in app.js specifying your port number.
