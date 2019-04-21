# Noted

A note-taking app built with Django and React. 

## Secrets

```ini
SECRET_KEY=<Django Secret Key>
DEBUG=<Django Debug Value>
```

## Installation

1. Install frontend dependencies with npm
    
    ```bash
    npm install
    ```

2. Run the dev server for the frontend
    
    ```bash
    npm run dev
    ```

3. Install backend dependencies with pipenv from a terminal at project root
    
    ```bash
    pipenv install
    ```

4. Run the Django server from a terminal at `noteman` directory
    
    ```bash
    cd noteman
    python manage.py runserver
    ```

5. Open `http://localhost:8000/` in a browser to interact with the full stack app.

## License

MIT
