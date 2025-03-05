export const infoTemplate = (): string => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Goose World Traveler - How it works</title>
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap"
      rel="stylesheet"
    />
    <style>
        :root {
        --primary-color: #ff9e00;
        --secondary-color: #4ecdc4;
        --accent-color: #ff6b6b;
        --dark-color: #292f36;
        --light-color: #f7fff7;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Nunito", "Quicksand", "Poppins", sans-serif;
      }

        body {
        background-color: var(--light-color);
        color: var(--dark-color);
        background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF9E00' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      }

        .feature-card {
            background: #fff;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .feature-title {
            color: var(--primary-color);
            margin-bottom: 10px;
        }

        .cta-button {
            display: inline-block;
            background: var(--primary-color);
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
            header {
        background-color: var(--primary-color);
        color: white;
        padding: 20px;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        position: relative;
        overflow: hidden;
      }

      .header-content {
        position: relative;
        z-index: 2;
      }

      .goose-logo {
        font-size: 2.5rem;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
      }

      .generate-btn {
        background-color: var(--accent-color);
        color: white;
        border: none;
        padding: 12px 24px;
        font-size: 1.2rem;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 15px;
        box-shadow: 0 4px 0 rgba(0, 0, 0, 0.2);
      }

      .generate-btn:hover {
        background-color: #ff5252;
        transform: translateY(-2px);
      }

      .generate-btn:active {
        transform: translateY(2px);
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2);
      }

      ol, ul {
          padding-inline-start: 40px;
}

      main {
        max-width: 1200px;
        margin: 40px auto;
        padding: 0 20px;
      }
            footer {
        background-color: var(--dark-color);
        color: white;
        text-align: center;
        padding: 20px;
        margin-top: 50px;
      }

      .floating-goose {
        position: absolute;
        animation: float 15s infinite ease-in-out;
        z-index: 1;
        opacity: 0.8;
        font-size: 2rem;
      }

      @keyframes float {
        0% {
          transform: translate(0, 0) rotate(0deg);
        }
        25% {
          transform: translate(100px, 50px) rotate(10deg);
        }
        50% {
          transform: translate(200px, 0) rotate(0deg);
        }
        75% {
          transform: translate(100px, -50px) rotate(-10deg);
        }
        100% {
          transform: translate(0, 0) rotate(0deg);
        }
      }
        .footer-links {
        margin-top: 15px;
      }

      .footer-links a {
        color: var(--light-color);
        text-decoration: none;
        margin: 0 15px;
        transition: color 0.3s ease;
      }

      .footer-links a:hover {
        color: var(--primary-color);
      }
    </style>
</head>
<body>
    <header>
      <div class="floating-goose" style="top: 20px; left: 20%">🪽</div>
      <div class="floating-goose" style="top: 40px; right: 20%; animation-delay: -5s">🪽</div>
      <div class="floating-goose" style="top: 30px; right: 10%; animation-delay: -5s">🪽</div>
      <div class="floating-goose" style="top: 50px; left: 20%; animation-delay: -5s">🪽</div>
      <div class="floating-goose" style="top: 10px; right: 30%; animation-delay: -5s">🪽</div>

      <div class="header-content">
        <div class="goose-logo">
          <h1>Goose World Traveler</h1>
        </div>
        <p>
          Explore AI-generated images of our adventurous goose traveling around
          the world!
        </p>
        <button
          class="generate-btn"
          onclick="window.location.href='api/start'"
        >
          Generate New Adventure
        </button>
      </div>
    </header>
    
    <main>
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
    </main>
    <footer style="position: absolute; bottom: 0; width: 100%;">
      <p>🪽 Goose World Traveler © 2025 | AI-Generated Adventures</p>
      <div class="footer-links">
        <a href="/info">Info</a>
        <a href="/privacy">GitHub</a>
        <a href="/terms">Hono</a>
      </div>
    </footer>
</body>
</html>
`;
