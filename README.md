# Django Website Project

A modern Django website featuring a responsive design with Bootstrap, animated counters, video integration, and an AI chatbot.

## Features

- Responsive navigation bar with logo
- Bootstrap carousel with smooth transitions
- Animated counters
- Video integration
- AI-powered chatbot
- Modern UI with animations and transitions

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Virtual environment (recommended)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Create and activate a virtual environment:
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/MacOS
python3 -m venv venv
source venv/bin/activate
```

3. Install required packages:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the project root and add your environment variables:
```
SECRET_KEY=your_django_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
GEMINI_API_KEY=your_gemini_api_key
```

5. Apply database migrations:
```bash
python manage.py migrate
```

6. Collect static files:
```bash
python manage.py collectstatic
```

## Running the Project

1. Start the development server:
```bash
python manage.py runserver
```

2. Open your browser and navigate to:
```
http://127.0.0.1:8000/
```

## Project Structure

```
project_root/
├── main/                   # Main application
│   ├── static/            # Static files
│   │   └── main/
│   │       ├── css/       # CSS files
│   │       ├── js/        # JavaScript files
│   │       ├── img/       # Images
│   │       └── video/     # Video files
│   ├── templates/         # HTML templates
│   │   └── main/
│   └── ...
├── static/                # Project-wide static files
├── media/                 # User-uploaded files
├── manage.py
├── requirements.txt
└── .env                  # Environment variables
```

## Required Files

Make sure you have the following files in your project:

1. Logo image: `main/static/main/img/logo.png`
2. Video file: `main/static/main/video/video.mp4`

## Features Configuration

### Carousel
- Images are loaded dynamically
- 3-second transition interval
- Smooth fade effects
- Touch-enabled for mobile devices

### Video
- Autoplays on load
- Muted by default
- Loops continuously
- Responsive design

### Chatbot
- Powered by Google's Gemini AI
- Real-time responses
- Error handling
- Loading indicators

## Troubleshooting

1. If static files are not loading:
   ```bash
   python manage.py collectstatic --noinput
   ```

2. If database errors occur:
   ```bash
   python manage.py migrate
   ```

3. If the chatbot isn't working:
   - Verify your Gemini API key in the `.env` file
   - Check browser console for errors
   - Ensure JavaScript is enabled

## Development

To modify the project:

1. CSS styles are in `main/static/main/css/styles.css`
2. JavaScript files are in `main/static/main/js/`
3. Templates are in `main/templates/main/`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the repository or contact the maintainers. 