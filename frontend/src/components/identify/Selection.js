// imports
import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../hooks/contexthooks/useAuthContext' 
import { useIdentifyContext } from '../../hooks/contexthooks/useIdentifyContext'

// utils
import { useDataset } from '../../hooks/utils/useDataset'
import useSpeciesSelect from '../../hooks/utils/useSpeciesSelect'
import Select from 'react-select'



const Selection = () => {


    const [filterStatus, setFilterStatus] = useState("")
    const [filterSpecies, setFilterSpecies] = useState("")
    
    const [ photos, setPhotos ] = useState([]) 
    const [ selected, setSelected] = useState(null)

    const [alert, setAlert] = useState("")

    const { user } = useAuthContext()
    const { dispatch } = useIdentifyContext()

    const { generateDataset } = useDataset()
    const [format, setFormat] = useState(null)
    const [data, setData] = useState(null)
    const [zip, setZip] = useState(null)

    const species_list = useSpeciesSelect()
    const navigate = useNavigate()


    useEffect( () => {
        const fetchPhotos = async () => {

            let query = ""
            if( filterStatus || filterSpecies ){
                query = query + "?"
            }
            if ( filterStatus ){
                query = query + "status=" + filterStatus
            }
            if( filterStatus && filterSpecies ){
                query = query + "&"
            }
            if( filterSpecies ){
                query = query + "species=" + filterSpecies
            }

            console.log('fetch query: ' + query)

            const response = await fetch('/api/photo/all' + query, {
                mode: 'cors',
                headers: { 'Authorization': `Bearer ${ user.token }` }
            })

            const json = await response.json()

            console.log("json:")
            console.log(json)
        

            if( response.ok ){
                setPhotos(json)
                photos.forEach( elem => console.log("imagepath: ", elem.imagepath))
                if(filterStatus === "classed" && format) { updateDataset(json, format) }
            }
        }

        if ( user ){
            fetchPhotos()
        } else {
            navigate("/")
        }
    }, [ user, filterStatus, filterSpecies ])


   

    const textAreaRef = useRef(null);

    const handleCopyText = async () => {
        try {
          await navigator.clipboard.writeText(textAreaRef.current.value);
          setAlert('Text copied to clipboard!');
          setTimeout( () => {
            setAlert("")
          },1000)
        } catch (err) {
          setAlert('Failed to copy text: ', err);
        }
    };


    const updateDataset = async (selection, format) => {
        if ( filterStatus === "classed" ) {

            const response = await generateDataset(selection, format)
            console.log("data: ", response.data)
            if(!response.data){
                setData("-")
            } else {
                setData(response.data)  
            }
            
            setZip(response.zip)
        }
    }

    useEffect( () => {
        if( format && filterStatus ==="classed"){
            updateDataset(photos, format)

            console.log("data: ", data)
        }
    }, [format])

    const handleGenerateData = async () => {

        if (data == null) {
            updateDataset( photos, "json")
            setFormat("json")

        } else {
            setData(null)
            setFormat(null)
            setZip(null)
        }
    }

    const handleDownload = async () => {
        
        const link = document.createElement("a")
        link.href = window.URL.createObjectURL(zip)
        link.download = "birdDataset-images.zip"
        link.click()
    }


    const handleSubmit = async ( e ) => {
        e.preventDefault()
        
        console.log("SELECTED: ",selected)
  

        await dispatch({
            type: 'SET_OBJECT',
            payload: selected
        }) 

        navigate("/explore/info")
    }



    return (
        <div>
            <form className='filter-area'>
                <label>Filters:</label>
                <Select
                className='filter'
                    id="for-loc-select"
                    options={[ 
                        { value: '', label: 'all photos' },
                        { value: 'classed', label: 'classed' },
                        { value: 'unclassed', label: 'unclassed'}
                        ]}
                    defaultValue={
                        { value: '', label: 'all photos' }
                    }
                    onChange={(elem) => setFilterStatus(elem.value)}
                    
                    placeholder="Filter by photo status"
                    required
                />
                
                <Select
                    className='filter'
                    options={[
                        { value: '', label: 'all species'},
                        ...species_list 
                        ]}
                    defaultValue={
                        { value: '', label: 'all species' }
                    }
                    onChange={(elem) => setFilterSpecies(elem.value)}
                    placeholder="Filter by potential species"
                    required
                />
            </form>


            <div className='selection-area'>
                { photos.length === 0 && <p>Nothing here yet !</p>}

                { photos.length > 0 && <form className='selection'>

                    { photos.map( ( elem ) => (

                        <button
                            type="button" className='image-button'
                            onClick={ () => {
                                setSelected( elem )
                            }}
                            value={selected}
                            >
                            
                            <img classname="gallery-img"  src={ elem.imagepath } alt=""/>
                        </button>

                    ))}

                </form>}
            </div>

            <div className='button-area'>

                <Link to="/" ><button id="button" className='lighter-button'>Home</button></Link> 

                { filterStatus === 'classed' && 
                    <button
                        id="button" className='darker-button'
                        type='submit' 
                        onClick={ handleGenerateData }
                    > Generate Dataset </button>
                }

                <button id="button" className='lighter-button' type="submit" 
                onClick={ handleSubmit } disabled={ !selected }>Details</button>
            </div>

            { filterStatus === "classed"  && data && <div className='dataset-area'>
                <Select
                        className='dataset-filter'
                        options={[ 
                            { value: 'json', label: 'JSON' },
                            { value: 'csv', label: 'csv' },
                            ]}
                        defaultValue={
                            { value: 'json', label: 'JSON' }
                        }
                        onChange={(elem) => setFormat(elem.value)}
                        placeholder="format"
                        required
                    />

                <div className='column-layout'>
                <textarea 
                    ref={textAreaRef} 
                    className="dataset-text"
                    value={ data }
                    rows="1"
                    readOnly
                />
                { zip && photos.length > 0 && <button style={{ backgroundColor: 'lightsteelblue'}} onClick={handleDownload}>download images</button> }
                </div>
                
                <div className='column-layout'>
                <button className='dataset-button' onClick={handleCopyText}>Copy Text</button>
                <p style={{fontSize: 0.6 + 'em', maxWidth:80 + 'px'}}>{ alert }</p>
                </div>
            </div> }

        </div>
    )
}

export default Selection