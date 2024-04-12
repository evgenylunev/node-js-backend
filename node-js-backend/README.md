# RingCentral

The application is designed in accordance with MVC pattern but obviously without 'Views'.

As a method of authentication I decided to use widespread JSON Web Token (JWT) method (using Passport library). 
Example HTTPS server initialization code also provided - change 'enable_https' in 'config.js' file.
Sample certificates can be found (or replaced) in 'sslcert' folder.

## Usage
<h3>Installation</h3>
To install the application extract contents of ringcentral-1.0.0.tgz into a folder, 
run 
<br><em>npm install</em>
<br><br>in the 'package' folder, then run command
<br><em>node startup/start.js</em>

<h3>Database initialization</h3>
In the 'sql_script' folder I provided sample database, tables creation scripts and sample call entry.

<h3>Configuration setup</h3>
Configuration parameters can be found in 'config.js' file 
<br>(Please, set your database url/credentials, secret parameter for token creation, etc.)

<h3>Test requests</h3>
In the folder 'requests' there are sample requests (in JSON format - can be imported to Postman program)
<br><br>In order to create (register user) - call 
<br>POST method <em>/ring/users</em> <br>
with form parameters
'name' and 'password'. <br>
<br>
In order to login with above 'name' and 'password' - <br>
use POST <em>/ring/users/login</em> 
<br><br>Full list of implemented methods can be found in <br>
security/routing.js
<br> As an authorization the token returned by POST /ring/users/login is used : 
<br>add header 'Authorization' with value of the token ('token' attr in login response).


## Developing
WebStorm IDE



### Tools
Used Express JS, Passport, Sequelize frameworks
My SQL database
