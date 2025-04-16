// tailwind.config.js
module.exports = {
  theme: {
    extend: {
       keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
colors: {
        primaryBlue: '#1E3A8A', //blue
        primaryBlack: '#1F2937', // Black 
      },
    },
  },
  plugins: [],
};