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
        },
        user: {
            fontSize: '0.8em',
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
            padding: 0
        },
        needDisplayColumn: {
            width: '70vw',
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            paddingRight: 0
        },
        needDisplayRow: {
            verticalAlign: 'top'
        },
        needActionIcon: {
            margin: 0
        },
        actionTip: {
            textAlign: 'center',
            padding: '1em',
            color: '#BDBDBD'
        }
    },
    addNeedForm: {
        descriptionArea: {
            textAlign: 'left'
        },
        dropDownSelector: {
            textAlign: 'left'
        },
        shrunkenDatePicker: {
            textAlign: 'left'
        }
    },
    dropDownSelector: {
        textAlign: 'left',
        maxWidth: '90%'
    },
    chipSelector: {
        chip: {
            margin: '1vh',
            display: 'inline-block'
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
    formCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        maxWidth: '90%',
        margin: '0 auto',
        color: '#b3b3b3'
    },
    formTextField: {
        style: {
            maxWidth: '90%',
            textAlign: 'left'
        },
        floatingLabelStyle: {
            textAlign: 'center',
            width: '100%'
        },
        floatingLabelTextArea: {
            textAlign: 'center'
        },
        floatingLabelFocusStyle: {
            textAlign: 'left'
        },
        inputStyle: {
            textAlign: 'center'
        },
        textareaStyle: {
            textAlign: 'center'
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
    about: {
        padding: '2em'
    },
    error: {
        textAlign: 'center',
        padding: '0 1em',
        color: 'tomato'
    },
    centerText: {
        textAlign: 'center'
    },
    alignLeft: {
        textAlign: 'left'
    },
    hidden: {
        visibility: 'hidden'
    },
    visible: {
        visibility: 'visible'
    }
};
