import { Outlet } from 'react-router-dom'

import { ExploreContextProvider } from '../contexts/ExploreContext'

export const ExploreContextLayout = () => {

    return (
        <ExploreContextProvider>

            <Outlet />

        </ExploreContextProvider>
    )
}

