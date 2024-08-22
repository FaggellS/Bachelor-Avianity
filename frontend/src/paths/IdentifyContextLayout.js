import { Outlet } from 'react-router-dom'

import { IdentifyContextProvider } from '../contexts/IdentifyContext'

export const IdentifyContextLayout = () => {

    return (
        <IdentifyContextProvider>

            <Outlet />

        </IdentifyContextProvider>
    )
}

