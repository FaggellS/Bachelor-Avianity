import { useNavigate } from "react-router-dom"


const ReturnButton = ( props ) => {
    const navigate = useNavigate()

    return (
        <div className='row-layout'>
            <div className='weight'>
                <span className="return-button" onClick={() => navigate(-1)}><strong>&lt;</strong></span>
            </div>

            <div className='page-title'>
                <h2>{props.title}</h2>
            </div>

            <div className='weight' />
        </div>
    )
}

export default ReturnButton