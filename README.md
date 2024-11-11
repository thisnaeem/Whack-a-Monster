# Whack-a-Monster Game 🎮

A modern, interactive browser-based game inspired by the classic Whack-a-Mole arcade game. Features multiple difficulty levels, high-score tracking, and engaging visual effects.

![Whack-a-Monster Game](https://raw.githubusercontent.com/yourusername/whack-a-monster/main/preview.png)

## 🌟 Features

- **Three Difficulty Levels**:
  - 🟢 Easy: Slower monsters, 10 points each
  - 🟡 Medium: Moderate speed, 20 points each
  - 🔴 Hard: Fast monsters, 30 points each

- **Modern UI/UX**:
  - Glassmorphism design
  - Animated gradient backgrounds
  - Responsive layout
  - Smooth animations and transitions
  - Custom monster designs per difficulty

- **Game Features**:
  - Local storage high-score tracking
  - 30-second gameplay rounds
  - Real-time score tracking
  - Visual and audio feedback
  - Level progression system

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Basic text editor or IDE

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/whack-a-monster.git
cd whack-a-monster
```

2. Create the following files in your project directory:
- `index.html`
- `styles.css`
- `script.js`

3. Copy the provided code into respective files:
- HTML code into `index.html`
- CSS code into `styles.css`
- JavaScript code into `script.js`

4. Open `index.html` in your web browser to start playing!

## 🎮 How to Play

1. Select a difficulty level (Easy, Medium, or Hard)
2. Monsters will appear randomly from holes
3. Click/tap on monsters to whack them
4. Score points based on difficulty level:
   - Easy: 10 points
   - Medium: 20 points
   - Hard: 30 points
5. Try to achieve the highest score in 30 seconds!

## 🛠️ Technical Details

### Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)
- Local Storage API

### Features Implementation
- **Difficulty System**: Different speeds and point values per level
- **Score Tracking**: Real-time score updates and high score storage
- **Animation System**: CSS transitions and keyframe animations
- **Sound Effects**: Built-in audio feedback system
- **Responsive Design**: Adapts to different screen sizes

## 📱 Browser Compatibility

- Chrome (v60+)
- Firefox (v60+)
- Safari (v11+)
- Edge (v79+)

## 🔧 Customization

### Modifying Difficulty Settings
```javascript
difficultySettings = {
    easy: {
        speed: 1500,
        timeUp: 1500,
        points: 10
    },
    // Add more settings...
}
```

### Changing Game Duration
```javascript
this.gameTime = 30; // Change this value to modify game duration
```

### Styling
- Edit `styles.css` to customize:
  - Color schemes
  - Animations
  - Layout
  - Monster designs

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- Original Whack-a-Mole game concept
- Modern web design principles
- Community feedback and contributions

## 🔄 Future Updates

Planned features:
- Combo system
- Special bonus monsters
- Achievement system
- Multiple game modes
- Particle effects
- Background music
- Global leaderboard

## ❓ Troubleshooting

### Common Issues

1. **Game not starting:**
   - Check if JavaScript is enabled
   - Verify all files are properly linked

2. **No sound:**
   - Check browser sound permissions
   - Verify audio files are properly loaded

3. **High scores not saving:**
   - Check if localStorage is enabled
   - Clear browser cache if needed

## 📧 Contact

Your Name - [@yourusername](https://twitter.com/yourusername)

Project Link: [https://github.com/yourusername/whack-a-monster](https://github.com/yourusername/whack-a-monster)
