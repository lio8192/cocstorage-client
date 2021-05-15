import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Fonts
import NanumSquareRoundR from 'src/styles/fonts/NanumSquareRoundR.woff2';
import NanumSquareRoundEB from 'src/styles/fonts/NanumSquareRoundEB.woff2';

const nanumSquareRoundR = {
	fontFamily: 'NanumSquareRoundR',
	fontStyle: 'normal',
	fontWeight: 400,
	src: `url(${NanumSquareRoundR}) format('woff2')`
};

const nanumSquareRoundEB = {
	fontFamily: 'NanumSquareRoundEB',
	fontStyle: 'normal',
	fontWeight: 500,
	src: `url(${NanumSquareRoundEB}) format('woff2')`
};

// Create a theme instance.
export const lightTheme = createMuiTheme({
	palette: {
		type: 'light',
		primary: {
			main: '#8EC5FC'
		},
		secondary: {
			main: '#E0C3FC'
		},
		error: {
			main: red.A400
		},
		grey: {
			50: '#EAEAEA'
		},
		background: {
			default: '#fff'
		}
	},
	typography: {
		fontFamily: 'NanumSquareRoundR',
		h5: {
			fontFamily: 'NanumSquareRoundEB'
		}
	},
	overrides: {
		MuiCssBaseline: {
			'@global': {
				'@font-face': [nanumSquareRoundR, nanumSquareRoundEB],
				html: {
					backgroundColor: '#fff',
					WebkitFontSmoothing: 'antialiased',
					MozOsxFontSmoothing: 'antialiased'
				}
			}
		},
		MuiInput: {
			underline: {
				'&:hover:not($disabled):before': {
					borderBottomColor: '#8EC5FC'
				}
			}
		}
	}
});

export const darkTheme = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			main: lightTheme.palette.primary.dark
		},
		secondary: {
			main: lightTheme.palette.secondary.dark
		},
		error: {
			main: red.A400
		},
		grey: {
			50: 'rgba(255, 255, 255, 0.12)'
		}
	},
	typography: {
		fontFamily: 'NanumSquareRoundR',
		h5: {
			fontFamily: 'NanumSquareRoundEB'
		}
	},
	overrides: {
		MuiCssBaseline: {
			'@global': {
				'@font-face': [nanumSquareRoundR, nanumSquareRoundEB],
				html: {
					WebkitFontSmoothing: 'antialiased',
					MozOsxFontSmoothing: 'antialiased'
				}
			}
		},
		MuiInput: {
			underline: {
				'&:hover:not($disabled):before': {
					borderBottomColor: '#8EC5FC'
				}
			}
		}
	}
});

export default lightTheme;
