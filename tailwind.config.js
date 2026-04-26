/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'on-primary-fixed-variant': '#004f54',
        'on-secondary': '#412d00',
        'on-secondary-fixed-variant': '#5e4200',
        tertiary: '#f8f5f5',
        'tertiary-fixed-dim': '#c8c6c6',
        'primary-fixed-dim': '#00dbe9',
        'outline-variant': '#3b494b',
        'inverse-surface': '#e5e2e1',
        'inverse-primary': '#006970',
        'primary-fixed': '#7df4ff',
        'surface-dim': '#131313',
        outline: '#849495',
        'secondary-container': '#feb700',
        'surface-variant': '#353534',
        'on-secondary-container': '#6b4b00',
        'tertiary-fixed': '#e4e2e1',
        secondary: '#ffdb9d',
        'secondary-fixed': '#ffdea8',
        'on-tertiary-fixed': '#1b1c1c',
        'on-secondary-fixed': '#271900',
        'inverse-on-surface': '#313030',
        'on-background': '#e5e2e1',
        'surface-container-high': '#2a2a2a',
        'on-primary': '#00363a',
        'on-primary-container': '#006970',
        'on-primary-fixed': '#002022',
        background: '#131313',
        'secondary-fixed-dim': '#ffba20',
        primary: '#dbfcff',
        'surface-bright': '#393939',
        'on-surface-variant': '#b9cacb',
        surface: '#131313',
        'surface-container-highest': '#353534',
        'surface-container-low': '#1c1b1b',
        'on-tertiary-fixed-variant': '#474747',
        'surface-tint': '#00dbe9',
        'surface-container-lowest': '#0e0e0e',
        'on-tertiary': '#303030',
        'on-error-container': '#ffdad6',
        'primary-container': '#00f0ff',
        'on-error': '#690005',
        'tertiary-container': '#dbd9d8',
        'error-container': '#93000a',
        'on-tertiary-container': '#5f5e5e',
        'on-surface': '#e5e2e1',
        error: '#ffb4ab',
        'surface-container': '#201f1f'
      },
      borderRadius: {
        DEFAULT: '0rem',
        lg: '0rem',
        xl: '0rem',
        full: '9999px'
      },
      spacing: {
        margin: '32px',
        unit: '4px',
        'stack-md': '24px',
        'stack-sm': '8px',
        gutter: '24px',
        'stack-lg': '48px'
      },
      fontFamily: {
        'display-lg': ['Space Grotesk'],
        'mono-data': ['monospace'],
        'body-base': ['Inter'],
        'label-caps': ['Space Grotesk'],
        'headline-md': ['Space Grotesk']
      },
      fontSize: {
        'display-lg': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'mono-data': ['14px', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '400' }],
        'body-base': ['16px', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
        'label-caps': ['12px', { lineHeight: '1', letterSpacing: '0.1em', fontWeight: '700' }],
        'headline-md': ['24px', { lineHeight: '1.2', letterSpacing: '0.02em', fontWeight: '600' }]
      }
    }
  },
  plugins: []
}
