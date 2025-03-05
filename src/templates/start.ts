export const startTemplate = () => `
<!DOCTYPE html>
<html>
<head>
    <title>Amsterdam Image Generator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 30px auto;
            padding: 20px;
            background-color: #f5f5f5;
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
            background-color: #FF6600;
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
        h1 {
            color: #333;
            margin-bottom: 30px;
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
    </style>
</head>
<body>
    <h1>Amsterdam Scene Generator</h1>
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
                <option value="boat-tour">Canal Boat Tour</option>
                <option value="drinking-heineken">Enjoying a Heineken</option>
                <option value="eating-stroopwafel">Eating Stroopwafels</option>
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
                <option value="dutch-classic">Dutch Classic (Orange, Blue, White)</option>
                <option value="tulip-fields">Tulip Fields (Red, Yellow, Pink, Green)</option>
                <option value="black-and-white">Black and White</option>
            </select>
        </div>
        <button type="submit">Generate Image</button>
    </form>
    <div id="userId"></div>

    <script>
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        
        nameInput.addEventListener('input', function() {
            const isValid = this.value.length > 0 && this.value.length <= 10;
            nameError.style.display = isValid ? 'none' : 'block';
        });

        document.getElementById('generatorForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            if (name.length === 0 || name.length > 10) {
                nameError.style.display = 'block';
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
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                const userIdDiv = document.getElementById('userId');
                userIdDiv.style.display = 'block';
                userIdDiv.innerHTML = \`<h3>Your Unique ID: \${data.userId}</h3>
                                      <p>Keep this ID to reference your generated image later!</p>\`;
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while generating the image');
            }
        });
    </script>
</body>
</html>
`;
