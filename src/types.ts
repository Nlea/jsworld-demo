export interface UserProfile {
  name: string;
  email: string;
  image: string;
  hobbies: string[];
}

export interface AuthenticatedUserInfo {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  accountDetails: {
    createdAt: string;
    lastLogin: string;
    subscriptionTier: string;
    isEmailVerified: boolean;
    twoFactorEnabled: boolean;
  };
  preferences: {
    language: string;
    timezone: string;
    notifications: boolean;
    newsletter: boolean;
  };
  billing: {
    plan: string;
    nextBillingDate: string;
    paymentMethod: string;
  };
}

export interface CardData {
  username: string;
  location: string;
  activity: string;
  color: string;
  thumbnail_key: string;
  base64: string;
}
