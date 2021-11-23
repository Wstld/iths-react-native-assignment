


export interface screenLang { home: homeScreenLang, login: loginScreenLang }

interface loginScreenLang {
    email: string,
    password: string,
    loginBtn: string,
    registerUser: string,
    registerForm: {
        email: string,
        password: string,
        addNewUser: string,
        close: string,
        errorMsg: {
            required: string,
            tooShort: string,
            notValidEmail: string,
        },
    },
}

interface homeScreenLang {
    productEdit:{
        header:string,
        saveBtn:string,
        close:string,
    }
    header: {
        screenName: string,
        name: string,
        price: string,
        type: string,
    },
    editBtn: string,
    deleteBtn: string,
    addForm: {
        name: string,
        price: string,
        type: string,
        addProduct: string,
        close: string,
        errorMsg: {
            required: string,
            tooShort: string,
            needsMoreThanOneThousand: string,
            nameAlreadyExists: string,
        },
    },
    updateForm: {
        header: string,
        name: string,
        price: string,
        type: string,
        saveBtn: string,
        close: string,
        errorMsg: {
            required: string,
            tooShort: string,
            needsMoreThanOneThousand: string,
            nameAlreadyExists: string,

        },
    }
}


export const stringPaths: screenLang = {
    home: {
        productEdit:{
            header:'screens.home.productEdit.header',
            saveBtn:'screens.home.productEdit.saveBtn',
            close:'screens.home.productEdit.close',
        },
        header: {
            screenName: 'screens.home.header.screenName',
            name: 'screens.home.header.name',
            price: 'screens.home.header.price',
            type: 'screens.home.header.type',
        },
        editBtn: 'screens.home.editBtn',
        deleteBtn: 'screens.home.deleteBtn',
        addForm: {
            name: 'screens.home.addForm.name',
            price: 'screens.home.addForm.price',
            type: 'screens.home.addForm.type',
            addProduct: 'screens.home.addForm.addProduct',
            close: 'screens.home.addForm.close',
            errorMsg: {
                required: 'screens.home.addForm.errorMsg.required',
                tooShort: 'screens.home.addForm.errorMsg.tooShort',
                needsMoreThanOneThousand: 'screens.home.addForm.errorMsg.needsMoreThanOneThousand',
                nameAlreadyExists: 'screens.home.addForm.errorMsg.nameAlreadyExists',
            },
        },
        updateForm: {
            header: 'screens.home.updateForm.header',
            name: 'screens.home.updateForm.name',
            price: 'screens.home.updateForm.price',
            type: 'screens.home.updateForm.type',
            saveBtn: 'screens.home.updateForm.saveBtn',
            close: 'screens.home.updateForm.close',
            errorMsg: {
                required: 'screens.home.updateForm.errorMsg.required',
                tooShort: 'screens.home.updateForm.errorMsg.tooShort',
                needsMoreThanOneThousand: 'screens.home.updateForm.errorMsg.needsMoreThanOneThousand',
                nameAlreadyExists: 'screens.home.updateForm.errorMsg.nameAlreadyExists',
            },


        },
    },
    login: {
        email: 'screens.login.email',
        password: 'screens.login.password',
        loginBtn: 'screens.login.loginBtn',
        registerUser: 'screens.login.registerUser',
        registerForm: {
            email: 'screens.login.registerForm.email',
            password: 'screens.login.registerForm.password',
            addNewUser: 'screens.login.registerForm.addNewUser',
            close: 'screens.login.registerForm.close',
            errorMsg: {
                required: 'screens.login.registerForm.errorMsg.required',
                tooShort: 'screens.login.registerForm.errorMsg.tooShort',
                notValidEmail: 'screens.login.registerForm.errorMsg.notValidEmail',
            },
        },
    },

}







export const translations = {


    en: {
        screens: {
            login: {
                email: 'email',
                password: 'password',
                loginBtn: 'login',
                registerUser: 'no account?',
                registerForm: {
                    email: 'email',
                    password: 'password',
                    addNewUser: 'register',
                    close: 'close',
                    errorMsg: {
                        required: 'required',
                        tooShort: 'too short',
                        notValidEmail: 'not valid email',
                    },
                },
            },
            home: {
                productEdit:{
                    header:'Edit product',
                    saveBtn:'save',
                    close:'close',
                },
                header: {
                    screenName: 'Home',
                    name: 'name',
                    price: 'price',
                    type: 'type',
                },
                editBtn: 'Edit',
                deleteBtn: 'Delete',
                addForm: {
                    name: 'name',
                    price: 'price',
                    type: 'type',
                    addProduct: 'add Product',
                    close: 'close',
                    errorMsg: {
                        required: 'required',
                        tooShort: 'too short',
                        needsMoreThanOneThousand: 'must be over 1000',
                        nameAlreadyExists: 'name already used!',
                    },
                },
                updateForm: {
                    header: 'Edit product',
                    name: 'name',
                    price: 'price',
                    type: 'type',
                    saveBtn: 'save',
                    close: 'close',
                    errorMsg: {
                        required: 'required',
                        tooShort: 'too short',
                        needsMoreThanOneThousand: 'must be over 1000',
                        nameAlreadyExists: 'name already used!',
                    },



                }
            },




        },
    },


    sv: {
        screens: {
            login: {
                email: 'e-post',
                password: 'lösenord',
                loginBtn: 'logga in',
                registerUser: 'inget konto?',
                registerForm: {
                    email: 'e-post',
                    password: 'lösenord',
                    addNewUser: 'registrera',
                    close: 'stäng',
                    errorMsg: {
                        required: 'krav',
                        tooShort: 'för kort',
                        notValidEmail: 'ingen e-post',
                    },
                },
            },
            home: {
                productEdit:{
                    header:'Redigera produkt',
                    saveBtn:'spara',
                    close:'stäng',
                },
                header: {
                    screenName: 'Hemma',
                    name: 'namn',
                    price: 'pris',
                    type: 'typ',
                },
                editBtn: 'Redigera',
                deleteBtn: 'Ta bort',
                addForm: {
                    name: 'namn',
                    price: 'pris',
                    type: 'type',
                    addProduct: 'Lägg till',
                    close: 'stäng',
                    errorMsg: {
                        required: 'krav',
                        tooShort: 'för kort',
                        needsMoreThanOneThousand: 'måste vara över 1000',
                        nameAlreadyExists: 'namnet finns redan!',
                    },
                },
                    updateForm: {
                        header: 'Redigera produkt',
                        name: 'namn',
                        price: 'prics',
                        type: 'typ',
                        saveBtn: 'spara',
                        close: 'stäng',
                        errorMsg: {
                            required: 'krav',
                            tooShort: 'för kort',
                            needsMoreThanOneThousand: 'måste vara över 1000',
                            nameAlreadyExists: 'namnet finns redan!',
                        },
                    },


                
            }
        },

    },
}




