# GIPHYLAKE - alphabi-giphy

[Edit on StackBlitz ⚡️]

# GIPHY API

Giphy API is used for data source, checkout  https://developers.giphy.com/docs/api#quick-start-guide giphy docs.

# Folder Structure

Src
 |
 |_ _ assets (for images and other assets)
 |
 |_ _ layouts (for layout wrappers, auth and main, auth pages are wrapped under AuthLayout and others are in Main)
 |
 |_ _ pages (All pages are here..)
 |
 |_ _ App.jsx (root file after main.jsx)
 | 
 |_ _ firebase.js ( firebase configs key and values are stored uin .env)
 |
 |_ _ index.css ( global css, mainly for tailwindcss output)
 |
 |_ _ main.jsx ( App root file)

 # Built With

This project is built with ReactJs, firebase Authentication, firebase Firestore, TailwindCSS, for forms react-hook-form is used along with Yup for input validations. react-firebase-hooks is used for user auth state management.


 ### Installation


1. Get a free API Key at [https://developers.giphy.com/docs/api#quick-start-guide](https://developers.giphy.com/docs/api#quick-start-guide)
2. Clone the repo
   ```sh
   git clone https://github.com/originalkamaal/alphabi-giphy.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Setup Firebase Project

5. Create `.env` file in the root and Enter your configs. 
   ```js
    VITE_API_KEY=
    VITE_AUTH_DOMAIN=
    VITE_PROJECT_ID=
    VITE_STORAGE_BUCKET=
    VITE_MESSEGING_SENDER_ID=
    VITE_APP_ID=
    VITE_GIPPHY_API_KEY=
    VITE_GIPPHY_URL=https://api.giphy.com/v1/gifs/search?api_key=$VITE_GIPPHY_API_KEY&q=
   ```


    
