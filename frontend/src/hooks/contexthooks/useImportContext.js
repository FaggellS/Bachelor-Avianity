import { useContext } from 'react'
import { ImportContext } from '../../contexts/ImportContext'

export const useImportContext = () => {
    const context = useContext( ImportContext )

    if (!context){
        throw Error('useImportContext must be used inside the scope of the provider')
    }

    return context
}