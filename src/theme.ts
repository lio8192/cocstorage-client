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

export const defaultLightTheme = createMuiTheme();
export const defaultDarkTheme = createMuiTheme({
	palette: {
		type: 'dark'
	}
});

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
			50: '#f2f2f2'
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
		MuiTextField: {
			root: {
				backgroundColor: defaultLightTheme.palette.background.paper
			}
		},
		MuiInput: {
			underline: {
				'&:hover:not($disabled):before': {
					borderBottomColor: '#8EC5FC'
				}
			}
		},
		MuiButtonBase: {
			root: {
				boxShadow: 'none !important'
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
		MuiTextField: {
			root: {
				backgroundColor: defaultDarkTheme.palette.background.paper
			}
		},
		MuiInput: {
			underline: {
				backgroundColor: defaultDarkTheme.palette.background.default,
				'&:hover:not($disabled):before': {
					borderBottomColor: '#8EC5FC'
				}
			}
		},
		MuiButtonBase: {
			root: {
				boxShadow: 'none !important'
			}
		}
	}
});

export default lightTheme;
