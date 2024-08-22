// imports
import Selection from '../../components/identify/Selection'
import TitleAndReturn from '../../components/TitleAndReturn'

const Explore = () => {

    return (

        <div id="explore-page" className='page'>
            <div className='page-header'>

                <TitleAndReturn title="Gallery" />

                <p>Here are all the photos that have been submitted so far</p>
            </div>
            

            <div className='page-body'>
                <Selection />
            </div>
        </div>
    )
}

export default Explore