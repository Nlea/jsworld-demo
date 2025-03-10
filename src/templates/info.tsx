import type { FC } from "hono/jsx";
import { css, Style } from "hono/css";

const InfoTemplate: FC = () => {
  const featureCard = css`
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `;
  const featureTitle = css`
    color: var(--primary-color);
    margin-bottom: 10px;
  `;
  const featureList = css`
    padding-inline-start: 40px;
  `;
  return (
    <>
      <Style />
      <div class={featureCard}>
        <h2 class={featureTitle}>What is this?</h2>
        <p>
          This is a fun and creative tool that generates unique AI images of
          Amsterdam scenes using Hono and Cloudflare Workers. Create
          personalized scenes that blend the city's iconic locations with your
          chosen activities and art styles!
        </p>
      </div>

      <div class={featureCard}>
        <h2 class={featureTitle}>How does it work?</h2>
        <ol class={featureList}>
          <li>Enter your name (up to 10 characters)</li>
          <li>
            Choose from iconic Amsterdam locations like Vondelpark or the
            Rijksmuseum
          </li>
          <li>Select an activity (cycling, boat tours, and more!)</li>
          <li>Pick your preferred art style</li>
          <li>
            Choose a color scheme that matches Amsterdam's vibrant culture
          </li>
        </ol>
      </div>

      <div class={featureCard}>
        <h2 class={featureTitle}>What makes it special?</h2>
        <p>
          Each generated image is unique and combines:
          <ul class={featureList}>
            <li>Authentic Amsterdam locations</li>
            <li>Traditional Dutch activities</li>
            <li>Various artistic styles including Van Gogh-inspired looks</li>
            <li>Classic Dutch color schemes</li>
          </ul>
        </p>
      </div>
    </>
  );
};

export default InfoTemplate;
