export const startTemplate = (token: string) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Goose World Traveler - Generate Image</title>
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

      main {
        max-width: 1200px;
        margin: 40px auto;
        padding: 0 20px;
      }

      .goose-logo {
        font-size: 2.5rem;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
      }
        .form-group {
            margin-bottom: 20px;
        }

        select, input {
            width: 300px;
            padding: 10px;
            margin-top: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }

        button {
            background-color: var(--primary-color);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
        }

        button:hover {
            background-color: #E65C00;
        }

        #userId {
            margin-top: 20px;
            padding: 15px;
            background-color: #fff;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            display: none;
        }
        label {
            font-weight: bold;
            color: #555;
        }

        .error {
            color: #FF0000;
            font-size: 14px;
            margin-top: 5px;
            display: none;
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
    footer {
        background-color: var(--dark-color);
        color: white;
        text-align: center;
        padding: 20px;
        margin-top: 50px;
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

      .container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        align-items: start;
      }

      @media (max-width: 1024px) {
        .container {
            grid-template-columns: 1fr;
        }
      }

      #generatorForm {
        max-width: 500px;
      }

      #result {
        position: sticky;
        top: 2rem;
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
      </div>
    </header>

    <main>
    <div class="container">
    <form id="generatorForm">
        <div class="form-group">
            <label for="name">Your Name:</label><br>
            <input type="text" id="name" name="name" maxlength="10" required>
            <div id="nameError" class="error">Name must be between 1 and 10 characters</div>
        </div>
        <div class="form-group">
            <label for="location">Choose a Location:</label><br>
            <select id="location" name="location" required>
                <option value="">Select a location...</option>
                <option value="windmills">Windmills at Zaanse Schans</option>
                <option value="keukenhof">Keukenhof Tulip Gardens</option>
                <option value="rijksmuseum">Rijksmuseum</option>
                <option value="vondelpark">Vondelpark</option>
                <option value="tulip-fields">Tulip Fields</option>
            </select>
        </div>
        <div class="form-group">
            <label for="activity">Choose an Activity:</label><br>
            <select id="activity" name="activity" required>
                <option value="">Select an activity...</option>
                <option value="cycling">Riding a Bike</option>
                <option value="doing a boat tour">Canal Boat Tour</option>
                <option value="drinking a heineken">Enjoying a Heineken</option>
                <option value="eating a stroopwafel">Eating Stroopwafels</option>
            </select>
        </div>
        <div class="form-group">
            <label for="artStyle">Choose an Art Style:</label><br>
            <select id="artStyle" name="artStyle" required>
                <option value="">Select an art style...</option>
                <option value="whiteboard">Whiteboard Drawing</option>
                <option value="vangogh">Van Gogh Style</option>
                <option value="lowpoly">Low Poly</option>
            </select>
        </div>
        <div class="form-group">
            <label for="colorScheme">Choose a Color Scheme:</label><br>
            <select id="colorScheme" name="colorScheme" required>
                <option value="">Select a color scheme...</option>
                <option value="orange, blue and white">Dutch Classic (Orange, Blue, White)</option>
                <option value="red, yellow, pink and green">Tulip Fields (Red, Yellow, Pink, Green)</option>
                <option value="black and white">Black and White</option>
            </select>
        </div>
        <button type="submit">Generate Image</button>
    </form>
    <div id="result" style="display: none;">
        <h2>Your Generated Image</h2>
        <p id="userInfo" style="margin-bottom: 1rem;"></p>
        <img id="generatedImage" style="max-width: 512px; width: 100%; height: auto;" />
    </div>
    </div>
    </main>
    <footer>
      <p>🪽 Goose World Traveler 2025 | AI-Generated Adventures</p>
      <div class="footer-links">
        <a href="/info">Info</a>
        <a href="/privacy">GitHub</a>
        <a href="/terms">Hono</a>
      </div>
    </footer>
    <script>
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        
        nameInput.addEventListener('input', function() {
            const isValid = this.value.length > 0 && this.value.length <= 10;
            nameError.style.display = isValid ? 'none' : 'block';
        });

        document.getElementById('generatorForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Generating...';
            
            const name = document.getElementById('name').value;
            if (name.length === 0 || name.length > 10) {
                nameError.style.display = 'block';
                submitButton.disabled = false;
        submitButton.textContent = 'Generate Image';
                return;
            }

            const formData = {
                name: name,
                location: document.getElementById('location').value,
                activity: document.getElementById('activity').value,
                artStyle: document.getElementById('artStyle').value,
                colorScheme: document.getElementById('colorScheme').value
            };

            try {
                const response = await fetch('/api/generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ${token}'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();
                if (result.success) {
                    document.getElementById('result').style.display = 'block';
                    document.getElementById('userInfo').textContent = 'Generated image';
                    document.getElementById('generatedImage').src = result.data.image;
                } else {
                    alert('Failed to generate image: ' + (result.error || 'Unknown error'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while generating the image');
            } finally {
             submitButton.disabled = false;
        submitButton.textContent = 'Generate Image';}
        });
    </script>
</body>
</html>
`;
