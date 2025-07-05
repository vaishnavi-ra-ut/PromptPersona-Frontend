## Starting Prompt Persona FRONTEND 

1. Project Setup
    Set up React + Vite frontend

    Set up Express + MongoDB backend

    Installed and configured Tailwind CSS + DaisyUI

    Setup Redux Toolkit for state management

    Created reusable API wrapper with Axios

2. Authentication System
 
    User Signup + Login with JWT

    Stored tokens securely using HttpOnly cookies

    Built /auth route with dynamic form toggling

    Added Redux slice for auth with setCredentials() and logout()

    Auto-login on page reload using cookie-based session check (/profile)

    Created secure logout flow (backend + frontend)

    Protected /edit page from unauthorized access


3. Edit Profile Feature
    
    Built EditProfile page with name, age, gender input

    Option to upload profile image (removed later)

    Dynamic preview of form values

    Gender-based avatar logic using 3 static images:

            Male → avatarB.png

            Female → avatarG.png

            Other → animal-avatar.png

    Stored updated data in DB via PUT /profile/edit

    Updated Redux store on profile save

    Toast message on successful save (🟢)


4. Navbar Component
  
  Built responsive Navbar with:

    Logo

    Theme toggle (🌙 / ☀️)

    Greeting (Hi, {user.name})

    Avatar with dropdown

    Avatar shows gender-based image (no profile upload now)

    Hide Navbar on /auth page (optional toggle)

    Added Logout button to dropdown that: Hits backend /logout , Clears Redux & cookie , Redirects to /auth


5. Visual & UX Enhancements
    
    Animated toast using Tailwind keyframes (slide-in)

    Avatar rings with Tailwind ring-* classes

    Gender emoji icons for quick UX cues

    Clean layout with Tailwind + DaisyUI
