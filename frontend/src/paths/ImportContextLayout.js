import { Outlet } from 'react-router-dom'

import { ImportContextProvider } from '../contexts/ImportContext'

export const ImportContextLayout = () => {

    return (
        <ImportContextProvider>

            <Outlet />

        </ImportContextProvider>
    )
}

