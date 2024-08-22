import { useState } from "react"
import { useAuthContext } from "../contexthooks/useAuthContext"
import { useLogout } from "./useLogout"
import { useNavigate } from "react-router-dom"


export const useResetPassword = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const {dispatch:authDispatch} = useAuthContext()
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const navigate = useNavigate()


    const resetPassword = async ( email ) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch("/api/user/reset", {
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({email:email})
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)

            return false
        } else {
            setIsLoading(false)
            return true
        }
    }

    const resetConfirm = async ( email, code, password ) => {
        setIsLoading(true)
        setError(null)

        const object = {email, code , password}

        const response = await fetch("/api/user/reset/confirm", {
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(object)
        })

        const json = await response.json()
        console.log("helloo")

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)

            return false
        } else {
            console.log("done")

            if (!user ){

            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update auth context
            authDispatch({
                type: 'LOGIN',
                payload: json
            })
            
            alert("Password has been successfully modified !")
            navigate("/")

            } else {
                logout()
                authDispatch({
                    type:"LOGOUT"
                })
                alert("Password has been successfully modified, please log in again.")
                navigate("/login")
            }

            setIsLoading(false)
            return true
        }
    }

    return { resetPassword, resetConfirm, isLoading, error }
}   