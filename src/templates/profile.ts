import { UserProfile } from '../types'

export const profileTemplate = (userProfile: UserProfile): string => `
<!DOCTYPE html>
<html>
  <head>
    <style>
      .profile-container {
        display: flex;
        align-items: start;
        gap: 2rem;
        padding: 2rem;
        font-family: system-ui, -apple-system, sans-serif;
      }
      .profile-image {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        object-fit: cover;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .profile-info {
        flex: 1;
      }
      .hobbies {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin-top: 1rem;
      }
      .hobby {
        background: #f0f0f0;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
      }
    </style>
  </head>
  <body>
    <div class="profile-container">
      <img src="${userProfile.image}" alt="${userProfile.name}'s profile" class="profile-image">
      <div class="profile-info">
        <h1>${userProfile.name}</h1>
        <p>${userProfile.email}</p>
        <div class="hobbies">
          ${userProfile.hobbies.map(hobby => `<span class="hobby">${hobby}</span>`).join('')}
        </div>
      </div>
    </div>
  </body>
</html>
`
