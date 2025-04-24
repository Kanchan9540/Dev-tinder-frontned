# DevTinder Frontend
- Create a Vite + React application
- Remove unnessary code and create a Hello World app
- Install tailwind CSS
- daisyUi used for designing purpose 
- Install Diasy UI
- Add NavBar component to App.jsx
- Create a NavBar.jsx separate Component  file
- Install react router dom
- create BrowserRouter > Routes > Router=/ Body > RouteChildren
- Create an Outlet in your Body Component 
- Create a Footer 
- Create a Login Page
- Install axios 
- CORS - Install cors in Backend => add middleware to with configuration: origin, credential: true
- Whenever you are making API call so pass {withcredential: true}
- Install Redux toolkit
- Install react-redux + @reduxjs/toolkit => configureStore => provider => createSlice => add resucer to store
- Add redux devtools in chrome
- Login and see if your data is comming properly in the store
- Navbar should update as soon as user logs in 
- Refactor our code to add constants file + create a component folder
- you should not be access other routes without login
- If token is not present, redirect user to login page 
- Logout feature
- Profile page
- Get the feed and add the feed in the store.
- Build the userCard on feed
- Edit profile feature
- Show Toast Message on Save of profile.
- New page to See all my connections
- New page to See all my connection requests
- Feature - Accept/Reject connection request
- Send or Ignore the user card from feed
- Signup new user
- E2E Testing


Body 
   Navbar
   Router = / =>    Feed
   Router = /login => Login
   Router = /connections => Connections
   Router = /profile => Profile



# AWS DEPLOYEMENT STEPS
- Signup on AWS
- Launch Instance
- chmod 400 <secret>.pem
- ssh -i "Kanchan-Secret.pem" ubuntu@ec2-13-61-149-53.eu-north-1.compute.amazonaws.com
- Install node version 22.12.0
- git clone
# Frontend
- npm install -> Its install the dependencies 
- npm run build
- sudo apt update -> update the system
- sudo apt install nginx -> we will use this http server to deploy our application.
- sudo systemctl start nginx
- sudo systemctl enable nginx
- copy code from dist(build files) folder to /var/www/html/
- sudo scp -r dist/* /var/www/html/
- Enable port 80 of your Instance

# Backend
-  Allowed EC2 Instance public IP on mongoDb server
- npm install pm2 -g
- pm2 start npm -- start
- pm2 logs
- pm2 list, pm2 flush <name>, pm2 stop <name>, pm2 delete <name>.
-  pm2 start npm --name "devtinder-backend" -- start
- nginx config : sudo nano /etc/nginx/sites-available/default
- restart nginx : sudo systemctl restart nginx
- Modify the BASE URL in Frontend project to "/api". 

- Frontend - http://13.61.149.53/
- Backend - http://13.61.149.53:3000/

Domain Name = devtinder.com -> 13.61.149.53

- Frontend = devtinder.com
- Backend = devtinder.com:3000 -> devtinder.com/api

# nginx config

server_name 13.61.149.53;

 location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

