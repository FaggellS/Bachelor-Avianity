import { useState } from 'react'
import { useConfirmSignup } from '../../hooks/auth/useConfirmSignup'
import { useSignupProcessContext } from '../../hooks/contexthooks/useSignupProcessContext'

const ConfirmSignup = () => {
    const [ code, setCode ] = useState('')

    const { email } = useSignupProcessContext()

    const { confirmSignup, isLoading, error } = useConfirmSignup()

    const handleSubmit = async ( e ) => {
        e.preventDefault()

        if ( !email ){ 
            console.error( "ConfirmSignup: problem with useProcessSignup context")
        }

        const confirmSignupSuccess = await confirmSignup( email, code)

        // if false, errors will show up
        if (!confirmSignupSuccess) { 
            console.log("ConfirmSignup: useConfirmSignup:confirmSignup did not succeed")
         }
        // if true, user is set in local storage and auth context, 
        // we will be redirected to the home page 

    }

    return (

        <div className="page">
            <div className='page-body'>

                <form id='auth' onSubmit={handleSubmit}>
                        <h3>Validate your account</h3>

                        <label>Confirmation code: </label>
                        <input
                            type='text'
                            onChange={(e) => setCode(e.target.value)}
                            value={ code }
                        />

                        <button  disabled={ isLoading } id="button" className="darker-button">Verify code</button>
                        { error && <div className='error'> { error } </div> }
                </form>

            </div>
        </div>
    )
}

export default ConfirmSignup