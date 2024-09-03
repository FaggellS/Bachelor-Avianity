// imports
import ImportPhotoForm from '../../components/import/ImportPhotoForm'
import TitleAndReturn from '../../components/TitleAndReturn'


const ImportPhoto = () => {

    return (
        <div className="page">

            <div className="page-header">
                <TitleAndReturn title="Import a Photo !" />
                <p>Please make sure your photo follows our criteria:</p>
            </div>


            <div className="page-body">
                <ImportPhotoForm />
            </div>

        </div>
    )
}

export default ImportPhoto