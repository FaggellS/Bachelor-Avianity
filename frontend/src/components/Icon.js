

const Logo = ( { size, photo } ) => {

    const logoDir = "/api/images/utility/logo.jpg"
    const userDir = "/api/images/utility/userIcon.png"

    if(size === "home-size"){
    return (
        <img style={ {width: 100 + 'px', height: 100 + 'px', marginTop: 50 + `px`} }  src={ logoDir } alt="App logo" />
    )}

    else if (photo === "logo") {

        return (
            <img style={ {width: 50 + 'px', height: 50 + 'px'} }  src={ logoDir } alt="App logo" />
        )
    } else {
        return (
            <img style={ {width: 40 + 'px', height: 40 + 'px'} }  src={ userDir } alt="User icon" />
        )
    }
}

export default Logo