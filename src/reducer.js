const initialState = {
    loginuser: '',
    status:false
}

const reducer = (state = initialState , action) => {
    const { type, username, status } = action
    if (type === "SignInSubmit"){
        state.loginuser  = username
        state.status = status
    }
    if (type === "SignOut"){
        state.status = status
    }
    return state
}

export default reducer