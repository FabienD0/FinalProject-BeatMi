<h1 align="center">
<a href="http://beatmi.com">
<img height="100" src="https://github.com/FabienD0/FinalProject-BeatMi/blob/main/beatMiLogo.png"><br/>
</a>
BeatMi, Music Sequencer 
</h1>

<p align="center">A dynamic music sequencer application that offers a <b>unique</b> and <b>engaging</b> platform to <b>create</b>, <b>share</b> and <b>interact</b> with beats.<br/><br/>With <b><a href="http://beatmi.com">BeatMi</a></b>, you have the ability to create your own beats, which includes <b>chords</b>, <b>melody</b>, and <b>drum patterns</b>.</p>



### <b><a href="http://beatmi.com"><p align="center">🔗BeatMi.com</p></a></b>

#

<p align="center">
<a href="http://BeatMi.com">
<img align="center" src="https://github.com/FabienD0/FinalProject-BeatMi/blob/main/beatMiGif.gif">
</a>
</p>

## 📝 Features
- "Most Favorite" section will showcase the beats that have received the highest number of likes.
- To play a user's beat, click on it.
- In the "Beats" section, you can browse through all the beats created by users, search beats using the artist's name,title or filter by mood.
- Create a sequence of drums, melody, and chords to compose your beat.
- Choose from a range of velocity options.
- Create your own chords or generate random chords that complement each other.
- Scale helper to assist you in finding the appropriate note.
- Ability to modify the tempo of the beat and octave of the melody.
- Volume mixer that enables you to adjust the level of the instruments or mute it entirely.
- Select from a range of drum kit sounds and melody instruments.
- Using a pagination system, you can add up to 4 measures (bars) to your beat.
- Save and share your beat for others to view.
- You can comment and like a beat.
- An interactive piano section that allows you to play using either the mouse or keyboard.
- A secure login system that uses JWT, where you can modify your avatar and upload a custom one.

## 🔨 Challenges

<b>This is my most significant Full-Stack project to date, and I learned a lot of new things in the process.</b>

#### ✏️ Design /w Styled-Components
I like to begin with Figma to ensure a good design before starting the coding process. My biggest challenge was developing the Beatmaker since it has many functionalities, and I wanted to ensure that the user was not overwhelmed or confused by them. So, I came up with the idea of an animated menu. 

Also, since the grid are generated using mapping, it was challenging to change the color of individual cells when the user clicks on them. I resolved the issue by passing a function as a prop that determines which color to apply based on the parameters.

### 🎹 Sequencer
This is the main feature of my website and this is where I spent most of my time. Finding a way to synchronize everything in a loop and only play the note that the user selected was difficult, especially while ensuring that the code remained clean and easy to read. 

The pagination was not initially intended, I was very happy on having it. It was easy to add more <i>grids</i> and managing them with CSS overflow but it wasn't clean enough for me. To fix that, I found a way to slice the grid while preserving the complete sequence array.

I really pushed myself with this challenge, and that's what I love about programming.

### 🔑 Authentification

Although I had never implemented my own authentication system, I was eager to acquire this skill. I learned about HTTP Headers, Cookies, Passport middleware, Cryptography and JSON Web Token. I can now use this authentication system for future projects.

### 🐛 Bug controls
I'm doing the best I can to fix every little bug that could happen. I assumed that implementing straightforward features like deleting an account or commenting on a beat would be simple. However, I did not anticipate the number of actions that needed to be taken afterward. 

I had to play a lot with the backend. For example, if a user deletes their account, I have to remove their beats from the database and also remove their likes on other beats from the beat array where they were stored

## ⚙️ Installation

### Backend
- ``cd backend``
- ``yarn install``
- Generate a public key and a private key running node on ``generateKeypair.js``
- Create a `.env` with these variables :<br/>
``MONGO_URI= (your MongoDb connection string)``<br/>
``CLOUDINARY_API_SECRET= (your Cloudinary secret key)``<br/>
``PRIVATE_KEY2= (copy/paste between apostrophe('') the crypto private key that you generated before) ``<br/>
- in ``index.js`` remove ``res.header("Access-Control-Allow-Origin", "https://beatmi.onrender.com");``<b>(line 53)</b><br/> and uncomment ``res.header("Access-Control-Allow-Origin", "http://localhost:3000");``
- ``yarn start``

### Frontend
- ``cd frontend``
- ``yarn install``
- Create a `.env` with these variables :<br/>
``REACT_APP_SERVER_URL= "http://localhost:8000"``<br/>
``REACT_APP_CLOUDINARY_URL= (your Cloudinary upload url)``<br/>
``REACT_APP_PRESET_NAME= (your Cloudinary preset name)``<br/>
- ``yarn start``
## 📖 Dependencies

This project was built with the help of the following APIs and packages:

<a href="https://tonejs.github.io/">Tone.js</a> - A Web Audio framework for creating interactive music in the browser<br/>
<a href="https://github.com/tonaljs/tonal">Tonal.js</a> - A music theory library for JavaScript<br/>
<a href="https://cloudinary.com/">Cloudinary</a> - An end-to-end image and video management platform for the web<br/>
<a href="http://www.passportjs.org/">Passport</a> - An authentication middleware for Node.js<br/>

## 📧 Contact

If you would like to learn more or report a bug, please do not hesitate to contact me via my <b><a href="http://www.FabienD.ca">portfolio</a></b> or locate me on <b><a href="https://www.linkedin.com/in/fabien-developer/">LinkedIn</a></b>
