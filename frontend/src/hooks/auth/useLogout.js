import { useAuthContext } from '../contexthooks/useAuthContext'

export const useLogout = () => {
    const { dispatch: authDispatch } = useAuthContext()

    const logout = () => {
        // remove user from local storage
        localStorage.removeItem('user')

        // dispatch logout action
        authDispatch({ type: 'LOGOUT' })
    }

    return { logout }
}