import { CardData } from "../types";

export const galleryTemplate = (images: CardData[]): string =>
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Goose World Traveler - AI Image Gallery</title>
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

      main {
        max-width: 1200px;
        margin: 40px auto;
        padding: 0 20px;
      }

      .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 30px;
      }

      .image-card {
        background-color: white;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
      }

      .image-card:hover {
        transform: translateY(-10px);
      }

      .image-container {
        height: 250px;
        overflow: hidden;
        position: relative;
      }

      .image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }

      .image-card:hover .image-container img {
        transform: scale(1.05);
      }

      .card-content {
        padding: 20px;
      }

      .location {
        font-size: 1.4rem;
        font-weight: bold;
        margin-bottom: 10px;
        color: var(--primary-color);
      }

      .parameters {
        background-color: #f5f5f5;
        padding: 15px;
        border-radius: 10px;
        margin-top: 15px;
      }

      .parameter {
        margin-bottom: 8px;
        display: flex;
        justify-content: space-between;
      }

      .parameter:last-child {
        margin-bottom: 0;
      }

      .parameter-name {
        font-weight: bold;
        color: var(--secondary-color);
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
          onclick="window.location.href='start'"
        >
          Generate New Adventure
        </button>
      </div>
    </header>

    <main>
      <div class="gallery">
      ${images
        .map(
          (image) => `
        <div class="image-card">
          <div class="image-container">
            <img src="${image.imageUrl}"
            )}" alt="Goose in ${image.location}" />
          </div>
          <div class="card-content">
            <div class="parameters">
              <div class="parameter">
                <span class="parameter-name">Location:</span>
                <span>${image.location}</span>
              </div>
              <div class="parameter">
                <span class="parameter-name">Activity:</span>
                <span>${image.activity}</span>
              </div>
              <div class="parameter">
                <span class="parameter-name">Color Scheme:</span>
                <span style="text-align:right;">${image.color}</span>
              </div>
              <div class="parameter">
                <span class="parameter-name">Art Style:</span>
                <span>${image.artStyle}</span>
              </div>
              <div class="parameter">
                <span class="parameter-name">Creator:</span>
                <span>${image.username}</span>
              </div>
            </div>
          </div>
        </div>
      `
        )
        .join("")}
      </div>
    </main>

    <footer>
      <p>🪽 Goose World Traveler © 2025 | AI-Generated Adventures</p>
      <div class="footer-links">
        <a href="/info">Info</a>
        <a href="https://github.com/Nlea/jsworld-demo" target="_blank">GitHub</a>
        <a href="https://hono.dev" target="_blank">Hono</a>
      </div>
    </footer>
  </body>
</html>
`;
