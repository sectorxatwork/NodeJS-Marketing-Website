const fs = require('fs').promises;
const path = require('path');
const Welcome = require('../packages/welcome');

// Initialize welcome greeting
let greeting;
try {
    greeting = new Welcome({
        morningGreeting: 'Welcome to a beautiful morning',
        afternoonGreeting: 'Welcome to a wonderful afternoon',
        eveningGreeting: 'Welcome to a peaceful evening'
    });
} catch (error) {
    console.error('Error initializing Welcome:', error);
    // Fallback greeting
    greeting = {
        getGreeting: (name = '') => `Welcome${name ? ', ' + name : ''}!`
    };
}

// Sample content data
const content = {
    home: {
        title: "Welcome to Our Marketing Website",
        description: "A modern marketing website built with Node.js and Express",
        features: [
            {
                title: "Fast & Responsive",
                description: "Built with modern web technologies for optimal performance"
            },
            {
                title: "Easy to Customize",
                description: "Simple and clean code structure for easy customization"
            },
            {
                title: "SEO Friendly",
                description: "Optimized for search engines and social sharing"
            }
        ]
    },
    about: {
        title: "About Us",
        description: "We are a team of passionate developers and designers",
        story: "Our journey began with a simple idea: to create beautiful, functional websites that help businesses grow.",
        mission: "To empower businesses with modern web solutions that drive success.",
        values: [
            "Innovation in everything we do",
            "Customer satisfaction above all",
            "Continuous learning and improvement",
            "Collaboration and teamwork"
        ]
    },
    contact: {
        title: "Contact Us",
        description: "Get in touch with our team",
        email: "contact@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Marketing Street, Digital City, 12345"
    }
};

// Content service functions
const contentService = {
    getHomeContent: () => {
        return {
            ...content.home,
            greeting: greeting.getGreeting()
        };
    },
    
    getAboutContent: () => {
        return {
            ...content.about,
            greeting: greeting.getGreeting('Team')
        };
    },
    
    getContactContent: () => {
        return {
            ...content.contact,
            greeting: greeting.getGreeting('Visitor')
        };
    },
    
    getAllContent: () => {
        return content;
    }
};

module.exports = contentService; 
