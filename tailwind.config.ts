const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        header: '7.5rem',
        'low-hero': 'calc(100svh - 7.5rem)',
      },
      minHeight: {
        'low-hero': 'calc(100svh - 7.5rem)',
      },
      spacing: {
        header: '7.5rem',
        section: '10rem',
        sectionMobile: '5rem',
        sectionPad: '5rem',
        sectionPadMobile: '2.5rem',
      },
      inset: {
        header: '7.5rem',
        section: '10rem',
      },
      maxWidth: {
        section: '90rem',
      },
      screens: {
        tablet: '48rem',
        desktop: '64rem',
        lgDesktop: '72rem',
      },
      zIndex: {
        base: '0',
        nav: '90',
        navControl: '91',
        modal: '100',
      },
      fontFamily: {
        SBAggro: ['SBAggro'],
        PyeongChangPeace: ['PyeongChangPeace'],
        NotoSans: ['NotoSans'],
      },
      colors: {
        'ioz-primary': '#FFF',
        'ioz-secondary': '#020202',
        'ioz-background': '#f2f2f2',
        'ioz-tertiary': '#fde047',
      },
      borderRadius: {
        container: '1rem',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        audio:
          '0 0 0 1px color-mix(in oklab, #0000330f, #f0f0f3 25%), 0 12px 60px rgba(0, 0, 0, 0.15), 0 16px 64px #00005506, 0 16px 36px -20px #00062e32',
      },
      animation: {
        spotlight: 'spotlight 2s ease .75s 1 forwards',
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
        'fast-bounce': 'bounce 0.35s linear infinite',
      },
      keyframes: {
        spotlight: {
          '0%': {
            opacity: 0,
            transform: 'translate(-72%, -62%) scale(0.5)',
          },
          '100%': {
            opacity: 1,
            transform: 'translate(-50%,-40%) scale(1)',
          },
        },
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors, require('tailwindcss-animate')],
}

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  )

  addBase({
    ':root': newVars,
  })
}
