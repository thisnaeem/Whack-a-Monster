class WhackAMonster {
    constructor() {
        this.score = 0;
        this.highScore = localStorage.getItem('highScore') || 0;
        this.gameTime = 30;
        this.timer = null;
        this.gameInterval = null;
        this.isPlaying = false;
        this.currentDifficulty = null;
        
        this.difficultySettings = {
            easy: {
                speed: 1500,
                timeUp: 1500,
                points: 10,
                description: "Relaxed pace, perfect for beginners! Monsters move slowly."
            },
            medium: {
                speed: 1000,
                timeUp: 1000,
                points: 20,
                description: "Faster monsters and better points! A balanced challenge."
            },
            hard: {
                speed: 750,
                timeUp: 750,
                points: 30,
                description: "Super fast monsters! High risk, high reward!"
            }
        };

        this.initializeElements();
        this.bindEvents();
        this.createSoundEffects();
        this.updateHighScore();
    }

    initializeElements() {
        this.scoreDisplay = document.getElementById('score');
        this.timeDisplay = document.getElementById('time');
        this.highScoreDisplay = document.getElementById('highScore');
        this.currentLevelDisplay = document.getElementById('currentLevel');
        this.restartButton = document.getElementById('restartButton');
        this.gameOverScreen = document.getElementById('gameOver');
        this.finalScoreDisplay = document.getElementById('finalScore');
        this.finalHighScoreDisplay = document.getElementById('finalHighScore');
        this.difficultyDescription = document.getElementById('difficultyDescription');
        this.holes = document.querySelectorAll('.hole');
        this.difficultyButtons = document.querySelectorAll('.difficulty-btn');
    }

    createSoundEffects() {
        this.sounds = {
            whack: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+g7/+/ZxMACnP///9zEwAKgv///3MUAAl5////dhQAbirtAAAqcQAAV8SdaHGErL2ESy0sWJS30KddGAQ6mez8wGcSAAdc////fBQACJ4AAAA7QwAAskhIAPH9AADwEhIAAgAAAAAAAAAA'),
            start: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+g7/+/ZxMACnP///9zEwAKgv///3MUAAl5////dhQAbirtAAAqcQAAV8SdaHGErL2ESy0sWJS30KddGAQ6mez8wGcSAAdc////fBQACJ4AAAA7QwAAskhIAPH9AADwEhIAAgAAAAAAAAAA')
        };
        
        Object.values(this.sounds).forEach(sound => {
            sound.volume = 0.3;
        });
    }

    bindEvents() {
        this.restartButton.addEventListener('click', () => this.restartGame());
        this.holes.forEach(hole => {
            hole.addEventListener('click', () => this.whack(hole));
        });
        this.difficultyButtons.forEach(button => {
            button.addEventListener('click', () => this.setDifficulty(button.dataset.difficulty));
        });
    }

    setDifficulty(difficulty) {
        this.currentDifficulty = difficulty;
        this.difficultyButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.difficulty === difficulty) {
                btn.classList.add('active');
            }
        });
        
        this.difficultyDescription.textContent = this.difficultySettings[difficulty].description;
        this.currentLevelDisplay.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);// Previous code remains the same...

        this.startGame();
    }

    startGame() {
        if (!this.currentDifficulty) {
            this.difficultyDescription.textContent = "Please select a difficulty level first!";
            return;
        }
        
        if (this.isPlaying) return;
        
        this.sounds.start.play();
        this.isPlaying = true;
        this.score = 0;
        this.gameTime = 30;
        this.updateDisplay();
        
        // Reset all holes and remove any existing monsters
        this.holes.forEach(hole => {
            hole.classList.remove('up');
            const monster = hole.querySelector('.monster');
            monster.className = 'monster ' + this.currentDifficulty;
        });
        
        this.gameOverScreen.classList.remove('show');
        
        const settings = this.difficultySettings[this.currentDifficulty];
        this.gameInterval = setInterval(() => this.showMonster(), settings.speed);
        this.timer = setInterval(() => {
            this.gameTime--;
            this.updateDisplay();
            
            if (this.gameTime <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    showMonster() {
        const holes = Array.from(this.holes);
        const activeHoles = holes.filter(hole => hole.classList.contains('up'));
        
        // Remove monster from random active hole
        if (activeHoles.length > 0) {
            const randomActive = activeHoles[Math.floor(Math.random() * activeHoles.length)];
            randomActive.classList.remove('up');
        }
        
        // Add monster to random inactive hole
        const inactiveHoles = holes.filter(hole => !hole.classList.contains('up'));
        if (inactiveHoles.length > 0) {
            const randomHole = inactiveHoles[Math.floor(Math.random() * inactiveHoles.length)];
            randomHole.classList.add('up');
            
            const settings = this.difficultySettings[this.currentDifficulty];
            setTimeout(() => {
                if (randomHole.classList.contains('up')) {
                    randomHole.classList.remove('up');
                }
            }, settings.timeUp);
        }
    }

    whack(hole) {
        if (!this.isPlaying || !hole.classList.contains('up')) return;
        
        this.sounds.whack.currentTime = 0;
        this.sounds.whack.play();
        
        hole.classList.remove('up');
        hole.classList.add('bonk');
        
        const settings = this.difficultySettings[this.currentDifficulty];
        this.score += settings.points;
        
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('highScore', this.highScore);
        }
        
        this.updateDisplay();
        
        setTimeout(() => {
            hole.classList.remove('bonk');
        }, 100);
    }

    updateDisplay() {
        this.scoreDisplay.textContent = this.score;
        this.timeDisplay.textContent = this.gameTime;
        this.highScoreDisplay.textContent = this.highScore;
    }

    updateHighScore() {
        this.highScoreDisplay.textContent = this.highScore;
    }

    endGame() {
        this.isPlaying = false;
        clearInterval(this.timer);
        clearInterval(this.gameInterval);
        
        this.holes.forEach(hole => hole.classList.remove('up'));
        
        this.finalScoreDisplay.textContent = this.score;
        this.finalHighScoreDisplay.textContent = this.highScore;
        this.gameOverScreen.classList.add('show');
        
        // Reset difficulty selection
        this.difficultyButtons.forEach(btn => btn.classList.remove('active'));
        this.currentDifficulty = null;
        this.currentLevelDisplay.textContent = '-';
        this.difficultyDescription.textContent = "Select difficulty to start";
    }

    restartGame() {
        this.gameOverScreen.classList.remove('show');
        this.difficultyDescription.textContent = "Select difficulty to start";
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new WhackAMonster();
});