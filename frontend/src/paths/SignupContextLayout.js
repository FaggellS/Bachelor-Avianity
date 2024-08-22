import { Outlet } from 'react-router-dom'

import { SignupProcessContextProvider } from '../contexts/SignupProcessContext'

export const SignupContextLayout = () => {

    return (
        <SignupProcessContextProvider>

            <Outlet />

        </SignupProcessContextProvider>
    )
}

