# 🌦️ Weather Web Application

## 📌 Overview

This is a full-stack weather web application that provides real-time weather information for any city. Users can search for weather details or use their current location to fetch live weather data. The application also stores searched cities using a database for better tracking and usability.

---

## 🚀 Features

* 🌍 Search weather by city name
* 📍 Fetch weather using current location (Geolocation API)
* 🌡️ Display temperature, weather conditions, humidity, etc.
* 🔄 Real-time data from OpenWeatherMap API
* 💾 Store searched cities in MongoDB
* ⚡ Responsive and user-friendly interface

---

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### API

* OpenWeatherMap API

---

## 📁 Project Structure

```
project-root/
│
├── public/        # Frontend files (HTML, CSS, JS)
├── routes/        # Backend routes
├── app.js         # Main server file
├── package.json   # Dependencies and scripts
├── .gitignore
```

---

## ⚙️ Installation & Setup

1. Clone the repository:

```bash
git clone <your-repository-link>
```

2. Navigate to the project directory:

```bash
cd your-project-folder
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file and add:

```
MONGO_URI=your_mongodb_connection_string
API_KEY=your_openweather_api_key
```

5. Start the server:

```bash
npm start
```

6. Open in browser:

```
http://localhost:3000
```

---

## 🌐 Usage

* Enter a city name to get current weather details
* Allow location access to fetch weather based on your location
* View real-time updates instantly

---

## 🔮 Future Enhancements

* 🔐 User authentication (Login/Signup)
* ⭐ Save favorite locations
* 📊 Weather history tracking
* 🌙 Dark mode
* 📱 Improved mobile responsiveness

---

## 👩‍💻 Author

**Kalluru Sree Poojitha**

---

## 📜 License

This project is licensed under the MIT License.
