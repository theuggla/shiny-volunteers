/**
 * Inline styles for the React components.
 */

// Export Styles ------------------------------------------------------------------------------------------------------
module.exports = {
    topbar: {
        logo: {
            maxHeight: '20vh',
            marginTop: '3vh'
        },
        internalLogo: {
            maxHeight: '10vh'
        },
        logout: {
            position: 'fixed',
            right: '0',
            top: '0',
            padding: '1em',
            fontVariant: 'small-caps',
            color: 'white'
        }
    },
    navigation: {
        navIcon: {
            maxHeight: '70%'
        },
        navigationStyle: {
            height: '12vh',
            maxHeight: '12vh',
            width: '100%',
            position: 'fixed',
            left: 0,
            bottom: 0,
            paddingBottom: '3vh',
            zIndex: '10'
        }
    },
    needsDisplay: {
        noNeeds: {
            textAlign: 'center',
            padding: '1em',
            color: '#BDBDBD'
        },
        needsList: {
            width: '100%',
            maxHeight: '100vh'
        },
        needActionDisplayColumn: {
            width: '10vw',
            paddingTop: 0
        },
        needDisplayColumn: {
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            paddingRight: 0
        },
        needDisplayRow: {
            verticalAlign: 'top'
        },
        needActionIcon: {
            padding: '1em'
        }
    },
    addNeedForm: {
        descriptionArea: {
            textAlign: 'left'
        }
    },
    loginForm: {
        floatingLabelStyle: {
            color: '#F5F5F5',
            textAlign: 'center'
        },
        inputStyle: {
            textAlign: 'center',
            color: '#F5F5F5'
        },
        snackbarBodyStyle: {
            height: 'auto',
            lineHeight: '1.8em'
        },
        snackbarContentStyle: {
            padding: '1em'
        }
    },
    internalPopup: {
        snackbarBody: {
            height: 'auto',
            lineHeight: '1.8em'
        }
    },
    loadcontainer: {
        textAlign: 'center'
    },
    error: {
        textAlign: 'center',
        padding: '0 1em',
        color: 'tomato'
    },
    centerText: {
        textAlign: 'center'
    }
};
