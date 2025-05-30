class Welcome {
    constructor(options = {}) {
        this.defaultGreeting = options.defaultGreeting || 'Welcome';
        this.timeBasedGreetings = {
            morning: options.morningGreeting || 'Good morning',
            afternoon: options.afternoonGreeting || 'Good afternoon',
            evening: options.eveningGreeting || 'Good evening'
        };
    }

    getTimeBasedGreeting() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            return this.timeBasedGreetings.morning;
        } else if (hour >= 12 && hour < 17) {
            return this.timeBasedGreetings.afternoon;
        } else {
            return this.timeBasedGreetings.evening;
        }
    }

    getGreeting(name = '') {
        const timeGreeting = this.getTimeBasedGreeting();
        return name ? `${timeGreeting}, ${name}!` : `${timeGreeting}!`;
    }

    setCustomGreeting(type, greeting) {
        if (this.timeBasedGreetings[type]) {
            this.timeBasedGreetings[type] = greeting;
            return true;
        }
        return false;
    }
}

module.exports = Welcome; 