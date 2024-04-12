# RingCentral
This is my first experience in developing REST services on Node.js (used to build it on Java frameworks)
 – so thank you for your patience as it entailed extensive learning curve and
please, be gracious to possible faults.
I decided to choose the proposed technology as  it is always exciting to learn something new 
and the knowledge might be quite beneficial to the project which we discussed during the interview.
As suggested in the task I used Express JS framework and Sequelize for persistence layer with MySQL database underneath.

Since the requirements impose very little restrictions and the application is developed more as prototype or demonstrator 
I tried to keep it as simple as possible I assumed that Users are provided only for authorization purposes (‘users’ table) 
and all phone call data will be contained in another table (‘calls’). 
As there was no special requirement for user to 'own' a call 
so two tables will not be in relationship (like one-to-one, one-to-many etc.) and all calls are accessible by all users. .
On the other hand Sequelize supports model associations - so a relationship of some sort can be added if needed. 

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