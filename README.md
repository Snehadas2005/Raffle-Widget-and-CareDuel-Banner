# Raffle Widget & CareDuel Banner Module

Interactive raffle system and promotional banner for AmsterdamLore.com platform.

## 🚀 Features

- **Raffle Widget**: Sidebar widget on `/stories` route with ticket display and join functionality
- **CareDuel Banner**: Promotional banner below hero section on home page
- **Mock API**: Simulated backend for raffle operations
- **Responsive Design**: Mobile-friendly layout with smooth animations

## 📁 Project Structure

```
├── index.html          # Main HTML with tab navigation
├── script.js           # Raffle logic & mock API
├── style.css           # Responsive styling
└── README.md           # This file
```

## 🛠️ API Endpoints

### GET `/api/raffle-status?userId=123`
Returns user's current ticket count.

**Response:**
```json
{
  "tickets": 5
}
```

### POST `/api/raffle-entry`
Handles raffle entry submission.

**Response:**
```json
{
  "success": true,
  "tickets": 8
}
```

## 🎯 Components

### Raffle Widget (Sidebar on /stories)
- Displays current ticket count
- "Join the Raffle" button
- Success/error message handling
- Loading states with disabled button

### CareDuel Banner (Below hero on /)
- Links to `https://careduel.com/topic-of-the-week`
- Light gray background with coral border `#E91E63`
- Lora font family at 18px
- Underline on hover effect

## 💻 Usage

1. **View Tickets**: Automatic load on page init
2. **Join Raffle**: Click button to enter (30% failure rate for demo)
3. **Success Feedback**: Confetti animation + success message
4. **Error Handling**: "Error, try again." message on failure

## 🎨 Design Features

- **Gradient Backgrounds**: Modern purple-blue gradients
- **Interactive Effects**: 3D hover transforms and confetti
- **Typography**: Inter + Lora font combination
- **Status Messages**: Auto-hide after 5 seconds

## 📧 Contact

**careers@alatreeventures.com**
