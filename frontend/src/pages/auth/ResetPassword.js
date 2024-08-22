// imports

import { useEffect, useState } from "react"
import { useResetPassword } from "../../hooks/auth/useResetPassword"
import { useAuthContext } from "../../hooks/contexthooks/useAuthContext"




const ResetPassword = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [next, setNext] = useState(false)

    const { user } = useAuthContext()

    const { resetPassword, resetConfirm, isLoading, error  } = useResetPassword()

    useEffect( () => {
        if (user){
            setEmail(user.email)
        }
    }, [])

    const emailEntered = async ( e ) => {
        e.preventDefault()

        const isOk = await resetPassword(email)
        if(isOk) {setNext(true)}
    }
    

    const pswdEntered= async ( e ) => {
        e.preventDefault()

        console.log(email, code, password)
        await resetConfirm(email, code, password)

        
        
    }



    return (

        <div className="page">

            <div className="page-body">

                <form id="auth" >
                { !user && <p>Enter your Email and we'll send you a code to reset your password</p>}
                
                { user && <p>If you really wish to reset your password, <br/>
                please click 'next' and we'll mail you a confirmation code.</p>}


                    <h3>Reset your password:</h3>  


                    <label>Email:</label>
                    { !user &&
                    
                    <input
                        type='email'
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={next}
                        value={ email }
                        />
                    }

                    { user && 
                        <input
                        type='email'
                        disabled={true}
                        value={ user.email }
                        />
                    }

                    {!next &&
                    <button id="button" className="darker-button" 
                    disabled={isLoading} onClick={emailEntered}>
                        Next
                    </button>
                    }

                    {next && (
                        <>
                            <label>Confirmation code: </label>
                            <input
                                type='text'
                                onChange={(e) => setCode(e.target.value)}
                                value={ code }
                            />


                            <label>Your new Password:</label>
                            <input
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                                value={ password }
                            />

                            <button  disabled={ isLoading } onClick={ (e) => {
                                console.log("hey ?")
                                pswdEntered(e)
                            }
                                
                                } id="button" className="darker-button">Confirm</button>
                            { error && <div className='error'> { error } </div> }
                        </>
                    )}
                </form>
            </div>
        </div>
    )
}
export default ResetPassword