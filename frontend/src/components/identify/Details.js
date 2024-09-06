// imports
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useIdentifyContext } from '../../hooks/contexthooks/useIdentifyContext'
import { useAuthContext } from '../../hooks/contexthooks/useAuthContext'



const Details = () => {

    const [guessList, setGuessList] = useState([])

    const [username, setUsername] = useState("")
    const [alertflag, setAlertflag] = useState("")
    const [alertident, setAlertident] = useState("")

    const { object: photo } = useIdentifyContext()
    const { user } = useAuthContext()

    const navigate = useNavigate()

    useEffect( () => {
        const fetchUser = async () => {
            const response = await fetch('/api/user/' + photo.user_id, {
                headers: {}
            })

            const json = await response.json()

            if (response.ok){
                setUsername(json.username)
            }
        }

        if (user && photo){
            fetchUser()
        }
    }, [photo, user])



    useEffect( () => {
       
        const fetchLikelySpecies = async () => {
            const response = await fetch('/api/guess/likely/' + photo._id, {
                method: "GET",
                headers: { 'Authorization': `Bearer ${ user.token }`
                }
            })

            const json = await response.json()

            if (response.ok){
                let list = []
                for (let i=0 ; i< json.confidence.length ; i++){
                    list.push({ species: json.species[i], conf: json.confidence[i] })
                }
                setGuessList(list)
            }
        }

        if (user && photo){
            fetchLikelySpecies()
        } 
    }, [photo, user])




    const handleFlag = ( e ) => {
        e.preventDefault()
        console.log("delete flags: ", photo.delete_flags)
        console.log("user id: ", user.user_id)
        console.log("includes: ", photo.delete_flags.includes(user.user_id))
        if(photo.delete_flags.includes(user.user_id)){
            setAlertflag("You've already flagged this photo !")
            setTimeout( () => {
                setAlertflag("")
            },1500)
        } else {
            navigate("/selected/flag")
        }
    }

    const handleClick = async ( e ) => {
        e.preventDefault()

        const query = "?photo_id=" + photo._id + "&user_id=" + user.user_id

        const response = await fetch('/api/guess/all' + query, {
            headers: { 'Authorization': `Bearer ${ user.token }` }
        })

        const json = await response.json()
        console.log("here json: ",json)
        if( json && json.length !== 0){
            setAlertident("You've already identified this photo !")
            setTimeout( () => {
                setAlertident("")
            },1500)
        } else {
        
            navigate("/selected/identify")
        }

    }

    return (
        <>{ photo && 

            <div className='image-form-layout'>
                <div className='darker-bg'>
                <div className='image-area'>
                    <img src={ photo.imagepath } className='image-main' alt="" /> 
                    <div className='row-layout'>
                    <button 
                    className="flag" 
                    onClick={handleFlag}><strong>!</strong></button>
                    <p style={{fontSize: 0.6 + 'em', marginTop: 35 + 'px', marginLeft: 5 + 'px'}}>{ alertflag }</p>
                    </div>
                </div>

                <div className='form-area'>
                    <form className='general-info'>
                        <h3>General information:</h3>
                        <ul>
                        <li><label>Location: <strong className="emphasize">{photo.location}</strong></label></li>
                        <li><label>Date taken: <strong className="emphasize">{new Date(photo.date).toLocaleDateString()}</strong></label></li>
                        <li><label>Photo Owner: <strong className="emphasize">{username}</strong></label></li>
                        <p></p>
                        <li><label>Most popular guesses:</label>
                        <ul>
                            <hl />
                            { guessList && guessList.map( (elem) => {
                                    return <li>{elem.species} ({(elem.conf * 100).toFixed(1)}%)</li>
                                }) 
                            }
                        </ul>
                        </li>
                        </ul>
                    </form>
                    
                    <div className='row-layout'>
                    <p style={{fontSize: 0.6 + 'em', marginTop: 15 + 'px', marginRight: 5 + 'px'}}>{ alertident }</p>

                    <button id="button" className='darker-button' type="submit" style={ {fontSize:1.3 + `em`} }
                    onClick={ handleClick } disabled={ !photo }>Identify</button>
                    </div>
                </div>
                </div>


            </div>
        }</>
    )
}

export default Details