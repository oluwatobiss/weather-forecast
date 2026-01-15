# OluWeather

OluWeather is a simple, responsive web application that allows users to check the current weather conditions for any city in the world. Built with vanilla JavaScript, HTML, and CSS, it fetches real-time weather data from an external API and displays it in an intuitive interface.

## Features

- **City Search**: Enter any city name to get instant weather information.
- **Random City Selection**: On load, the app randomly selects and displays weather for a popular city.
- **Temperature Units**: Toggle between Fahrenheit and Celsius.
- **Weather Details**: View temperature, feels-like temperature, humidity, wind speed, and current time.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.

## Live Demo

Feel free to [use the app here](https://oluwatobiss.github.io/weather-forecast/).

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, etc.)
- Internet connection to fetch weather data

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/oluwatobiss/weather-forecast.git
   ```
2. Navigate to the project directory:
   ```bash
   cd weather-forecast
   ```
3. Open `index.html` in your web browser.

That's it! The app runs entirely in the browser with no build process required.

## API Usage

This app uses the OpenWeatherMap API to fetch weather data. You'll need an API key if you want to run it locally or modify it. Sign up at [OpenWeatherMap](https://openweathermap.org/api) to get a free API key.

## GitHub Actions Workflows

This project uses GitHub Actions for continuous integration and deployment:

- **Linting**: Before each deployment, the code is automatically checked for errors and style issues using ESLint (JavaScript), stylelint (CSS), and htmlhint (HTML). This ensures code quality and catches potential bugs early.
- **Inject Environment Variables**: During the build process, sensitive API keys and other environment variables are securely injected from GitHub Secrets into the application without exposing them in the source code.
- **Deployment**: On pushes to the `master` branch, the app is automatically deployed to GitHub Pages, making it live at the demo URL above.

The workflows are defined in `.github/workflows/static.yml`. You can view the action runs in the [Actions tab](https://github.com/oluwatobiss/weather-forecast/actions) of this repository.

### Setting Up Environment Variables

If you want to run this project with your own API key:

1. Add your OpenWeatherMap API key to GitHub Secrets in your repository settings as `API_KEY`.
2. The workflow will automatically inject it during deployment.
3. For local development, create an `env.js` file in the root directory with: `const ENV = { API_KEY: 'your-api-key' };`

## Technologies Used

- **JavaScript**: For dynamic functionality and API interactions
- **HTML**: For structure and content
- **CSS**: For styling and responsive design
- **GitHub Actions**: For CI/CD and automated deployment
- **GitHub Pages**: For hosting the live demo

## Contributing

This project is part of my learning journey, but feel free to fork it and experiment! If you find any issues or have suggestions, please open an issue or submit a pull request.

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Part of the [JavaScript course](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/weather-app) at [The Odin Project](https://www.theodinproject.com/)

Also, be sure to check out my articles at [CodeSweetly](https://www.codesweetly.com/) and the [freeCodeCamp](https://www.freecodecamp.org/news/author/oluwatobi/).
