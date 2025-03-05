export const infoTemplate = (): string => `
<!DOCTYPE html>
<html>
<head>
    <title>Amsterdam Image Generator - How It Works</title>
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            max-width: 800px;
            margin: 30px auto;
            padding: 20px;
            line-height: 1.6;
            color: #333;
        }
        h1 {
            color: #FF6600;
            margin-bottom: 1.5rem;
        }
        .feature-card {
            background: #fff;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .feature-title {
            color: #FF6600;
            margin-bottom: 10px;
        }
        .cta-button {
            display: inline-block;
            background: #FF6600;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
            transition: background-color 0.3s;
        }
        .cta-button:hover {
            background: #E65C00;
        }
    </style>
</head>
<body>
    <h1>Welcome to the Amsterdam Image Generator!</h1>
    
    <div class="feature-card">
        <h2 class="feature-title">What is this?</h2>
        <p>
            This is a fun and creative tool that generates unique AI images of Amsterdam scenes using Hono and Cloudflare Workers.
            Create personalized scenes that blend the city's iconic locations with your chosen activities and art styles!
        </p>
    </div>

    <div class="feature-card">
        <h2 class="feature-title">How does it work?</h2>
        <ol>
            <li>Enter your name (up to 10 characters)</li>
            <li>Choose from iconic Amsterdam locations like Vondelpark or the Rijksmuseum</li>
            <li>Select an activity (cycling, boat tours, and more!)</li>
            <li>Pick your preferred art style</li>
            <li>Choose a color scheme that matches Amsterdam's vibrant culture</li>
        </ol>
    </div>

    <div class="feature-card">
        <h2 class="feature-title">What makes it special?</h2>
        <p>
            Each generated image is unique and combines:
            <ul>
                <li>Authentic Amsterdam locations</li>
                <li>Traditional Dutch activities</li>
                <li>Various artistic styles including Van Gogh-inspired looks</li>
                <li>Classic Dutch color schemes</li>
            </ul>
        </p>
    </div>

    <a href="/api/start" class="cta-button">Start Creating Your Amsterdam Scene!</a>
</body>
</html>
`;
