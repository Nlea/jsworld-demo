import type { FC } from "hono/jsx";
import { css, Style } from "hono/css";

const StartTemplate: FC = () => {
  const generateForm = css`
    max-width: 500px;
  `;
  const formGroup = css`
    margin-bottom: 20px;
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
        <input type="hidden" name="authToken" />
        <div class={formGroup}>
          <label for="name">Your Name:</label>
          <br />
          <input type="text" id="name" name="name" maxlength={10} required />
          <div id="nameError" class="error">
            Name must be between 1 and 10 characters
          </div>
        </div>
        <div class={formGroup}>
          <label for="activity">Choose an Activity:</label>
          <br />
          <select id="activity" name="activity" required>
            <option value="">Select an activity...</option>
            <option value="cycling in Amsterdam">Riding a Bike</option>
            <option value="walking in Vondelpark">Walking in Vondelpark</option>
            <option value="doing a boat tour">Canal Boat Tour</option>
            <option value="drinking a Heineken">Enjoying a Heineken</option>
            <option value="eating a waffle">Eating Stroopwafels</option>
            <option value="visiting windmills">
              Visiting Windmills at Zaanse Schans
            </option>
            <option value="visiting Rijksmuseum">Visiting Rijksmuseum</option>
            <option value="visiting tulip fields">Visiting Tulip Fields</option>
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
    </>
  );
};

export default StartTemplate;
