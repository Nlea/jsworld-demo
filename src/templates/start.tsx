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
            <option value="go clubbing">Go Clubbing</option>
            <option value="walking in Tiergarten">Walking in Tiergarten</option>
            <option value="watching a movie in an outdoor theater">Watching a Movie in an Outdoor Theater</option>
            <option value="going to a fleamarket">Going to a Flea Market</option>
            <option value="eating a curry wurst">Eating a Curry Wurst</option>
            <option value="visiting brandenburg gate">
              Visiting Brandenburg Gate
            </option>
            <option value="eating a kebab">Eating a Kebab</option>
            <option value="visiting berlin wall">Visiting Berlin Wall</option>
          </select>
        </div>
        <div class={formGroup}>
          <label for="artStyle">Choose an Art Style:</label>
          <br />
          <select id="artStyle" name="artStyle" required>
            <option value="">Select an art style...</option>
            <option value="streetart">Street Art/ Graffiti</option>
            <option value="bauhaus">Bauhaus Style</option>
            <option value="retro photo booth">Retro Photo Booth</option>
          </select>
        </div>
        <div class={formGroup}>
          <label for="colorScheme">Choose a Color Scheme:</label>
          <br />
          <select id="colorScheme" name="colorScheme" required>
            <option value="">Select a color scheme...</option>
            <option value="deep night blue, neon purple, electric green, metallic silver">
              Techno/ Nightlife
            </option>
            <option value="grass green, soft sky blue, dandelion yellow">
              Sunday Brunch
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
