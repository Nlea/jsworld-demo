import type { FC } from "hono/jsx";
import { css, Style } from "hono/css";

const StartTemplate: FC = () => {
  const generateForm = css`
    max-width: 500px;
  `;
  const result = css`
    position: sticky;
    top: 2rem;
  `;
  const formGroup = css`
    margin-bottom: 20px;
  `;
  const error = css`
    color: #ff0000;
    font-size: 14px;
    margin-top: 5px;
    display: none;
  `;
  const formInput = css`
    width: 300px;
    padding: 10px;
    margin-top: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  `;
  const button = css`
    background-color: var(--primary-color);
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  `;
  const buttonHover = css`
    background-color: #e65c00;
  `;
  return (
    <>
      <Style />
      <form
        id="generatorForm"
        class={generateForm}
        action={"/api/generate"}
        method="post"
      >
        <div class={formGroup}>
          <label for="name">Your Name:</label>
          <br />
          <input type="text" id="name" name="name" maxlength={10} required />
          <div id="nameError" class="error">
            Name must be between 1 and 10 characters
          </div>
        </div>
        <div class={formGroup}>
          <label for="location">Choose a Location:</label>
          <br />
          <select id="location" name="location" required>
            <option value="">Select a location...</option>
            <option value="windmills">Windmills at Zaanse Schans</option>
            <option value="keukenhof">Keukenhof Tulip Gardens</option>
            <option value="rijksmuseum">Rijksmuseum</option>
            <option value="vondelpark">Vondelpark</option>
            <option value="tulip-fields">Tulip Fields</option>
          </select>
        </div>
        <div class={formGroup}>
          <label for="activity">Choose an Activity:</label>
          <br />
          <select id="activity" name="activity" required>
            <option value="">Select an activity...</option>
            <option value="cycling">Riding a Bike</option>
            <option value="doing a boat tour">Canal Boat Tour</option>
            <option value="drinking a beer">Enjoying a Heineken</option>
            <option value="eating a waffel">Eating Stroopwafels</option>
          </select>
        </div>
        <div class={formGroup}>
          <label for="artStyle">Choose an Art Style:</label>
          <br />
          <select id="artStyle" name="artStyle" required>
            <option value="">Select an art style...</option>
            <option value="whiteboard">Whiteboard Drawing</option>
            <option value="vangogh">Van Gogh Style</option>
            <option value="lowpoly">Low Poly</option>
          </select>
        </div>
        <div class={formGroup}>
          <label for="colorScheme">Choose a Color Scheme:</label>
          <br />
          <select id="colorScheme" name="colorScheme" required>
            <option value="">Select a color scheme...</option>
            <option value="orange, blue and white">
              Dutch Classic (Orange, Blue, White)
            </option>
            <option value="red, yellow, pink and green">
              Tulip Fields (Red, Yellow, Pink, Green)
            </option>
            <option value="black and white">Black and White</option>
          </select>
        </div>
        <button type="submit">Generate Image</button>
      </form>
      <div id="result" style="display: none;">
        <h2>Your Generated Image</h2>
        <p id="userInfo" style="margin-bottom: 1rem;"></p>
        <img
          id="generatedImage"
          style="max-width: 512px; width: 100%; height: auto;"
        />
      </div>
    </>
  );
};

export default StartTemplate;
// </head>
// <body>
//     <header>
//       <div class="floating-goose" style="top: 20px; left: 20%">🪽</div>
//       <div class="floating-goose" style="top: 40px; right: 20%; animation-delay: -5s">🪽</div>
//       <div class="floating-goose" style="top: 30px; right: 10%; animation-delay: -5s">🪽</div>
//       <div class="floating-goose" style="top: 50px; left: 20%; animation-delay: -5s">🪽</div>
//       <div class="floating-goose" style="top: 10px; right: 30%; animation-delay: -5s">🪽</div>

//       <div class="header-content">
//         <div class="goose-logo">
//           <h1>Goose World Traveler</h1>
//         </div>
//         <p>
//           Explore AI-generated images of our adventurous goose traveling around
//           the world!
//         </p>
//         <button
//           class="generate-btn"
//           onclick="window.location.href='/'"
//         >
//           Check the Adventures
//         </button>
//       </div>
//     </header>

//     <main>
//     <div class="container">

//     </main>
//     <footer style="position: absolute; bottom: 0; width: 100%;">
//       <p>🪽 Goose World Traveler 2025 | AI-Generated Adventures</p>
//       <div class="footer-links">
//         <a href="/info">Info</a>
//         <a href="https://github.com/Nlea/jsworld-demo" target="_blank">GitHub</a>
//         <a href="https://hono.dev" target="_blank">Hono</a>
//       </div>
//     </footer>
//     <script>
//         const nameInput = document.getElementById('name');
//         const nameError = document.getElementById('nameError');

//         nameInput.addEventListener('input', function() {
//             const isValid = this.value.length > 0 && this.value.length <= 10;
//             nameError.style.display = isValid ? 'none' : 'block';
//         });

//         document.getElementById('generatorForm').addEventListener('submit', async (e) => {
//             e.preventDefault();

//             const submitButton = e.target.querySelector('button[type="submit"]');
//     submitButton.disabled = true;
//     submitButton.textContent = 'Generating...';

//             const name = document.getElementById('name').value;
//             if (name.length === 0 || name.length > 10) {
//                 nameError.style.display = 'block';
//                 submitButton.disabled = false;
//         submitButton.textContent = 'Generate Image';
//                 return;
//             }

//             const formData = {
//                 name: name,
//                 location: document.getElementById('location').value,
//                 activity: document.getElementById('activity').value,
//                 artStyle: document.getElementById('artStyle').value,
//                 colorScheme: document.getElementById('colorScheme').value
//             };

//             try {
//                 const response = await fetch('/api/generate', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': 'Bearer ${token}'
//                     },
//                     body: JSON.stringify(formData)
//                 });

//                 // const result = await response.json();
//                 if (response.ok) {
//                 const blob = await response.blob();
//         const imageUrl = URL.createObjectURL(blob);
//                     document.getElementById('result').style.display = 'block';
//                     document.getElementById('userInfo').textContent = 'Generated image';
//                     document.getElementById('generatedImage').src = imageUrl;
//                 } else {
//                     alert('Failed to generate image: ' + (result.error || 'Unknown error'));
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//                 alert('An error occurred while generating the image');
//             } finally {
//              submitButton.disabled = false;
//         submitButton.textContent = 'Generate Image';}
//         });
//     </script>
// </body>
// </html>
// `;
