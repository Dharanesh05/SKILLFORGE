/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#15803D',
          forest: '#14532D',
          emerald: '#10B981',
          mint: '#D1FAE5',
          bg: '#F0FDF4',
          surface: '#FFFFFF',
          offwhite: '#F8FAF9',
          text: '#17251D',
          muted: '#647067',
          border: '#DCE9DF',
        },
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(ellipse at 50% 0%, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
        'green-gradient':
          'linear-gradient(135deg, #15803D 0%, #10B981 100%)',
        'forest-gradient':
          'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        'mint-gradient':
          'linear-gradient(135deg, #F0FDF4 0%, #D1FAE5 100%)',
      },
      boxShadow: {
        'green-sm': '0 2px 8px -2px rgba(21, 128, 61, 0.08)',
        'green-md': '0 4px 20px -4px rgba(21, 128, 61, 0.12)',
        'green-lg': '0 12px 32px -8px rgba(21, 128, 61, 0.18)',
        'green-glow': '0 0 25px rgba(16, 185, 129, 0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out both',
        'slide-up': 'slideUp 0.5s ease-out both',
        'float': 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(16, 185, 129, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(16, 185, 129, 0.45)' },
        },
      },
    },
  },
  plugins: [],
};
