// imports
import { useState, useEffect } from "react"
import { useAuthContext } from "../hooks/contexthooks/useAuthContext"
import { useNavigate } from "react-router-dom"


const UserPage = () => {

    const { user: user } = useAuthContext()
    const [ userInfo, setUserInfo ] = useState("")

    const [next, setNext] = useState(false)
    const [fullname, setFullname] = useState("")


    const navigate = useNavigate()


    useEffect( () => {
        const fetchUser = async () => {
            const response = await fetch('/api/user/' + user.user_id, {
                headers: {  }
            })

            const json = await response.json()

            if (response.ok){
                setUserInfo(json)
            } 
        }

        if (user){
            fetchUser()
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()


        const response = await fetch("/api/user/request-status/"+ user.user_id, {
            method:"POST",
            headers: {'Authorization': `Bearer ${ user.token }`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {fullname: fullname} )
        })

        if (response.ok) {
            alert('Your request has been sent ! It will be treated as soon as possible.')
            e.target.reset()
            setNext(false)
            navigate("/user")
        }
    }




    return (
        <div className="page">

            <div className="page-header" id="p-page">
                <div className='row-layout'>
                    <div className='weight'>
                        <span className="return-button" onClick={() => navigate("/")}><strong>🏠︎</strong></span>
                    </div>
                    <div className="page-title" id="big-title">
                        <h1>Your account</h1>
                    </div>

                    <div className="weight" />
                </div>
                <p></p>
            </div>

            

            <div className="page-body" style={{marginTop:60 + 'px'}}>
                <div className="darker-bg">
                    <div className="general-info">
                            <ul>
                                <label>Username: <strong className="emphasize">{userInfo.username}</strong></label>
                                <label>E-mail:  <strong className="emphasize">{userInfo.email}</strong></label>
                                <label>Status:  <strong className="emphasize">{ userInfo.member_status === "ordinary" ? "ordinary member" : userInfo.member_status }</strong></label>
                                <label>Date created:  <strong className="emphasize">{ new Date(userInfo.createdAt).toLocaleDateString() }</strong></label>
                            </ul>
                            <hl/>
                            <button onClick={ () => {navigate("/login/reset")}}>Reset my password</button>
                            <button onClick={ () => {!next ? setNext(true) : setNext(false)}}>Ask to change status</button>
                            
                            {next && <div className="paragraph" style={{fontSize: 0.8 + 'em'}}>
                                <label><br/>Are you an expert in ornithology ? <br/>
                                If that is the case please let us know by entering your full name below,<br/>
                                We will forward a demand to change your status to an administrator.
                                <br/><br/> You will then be informed by mail once that request has been treated.
                                </label>

                                <form onSubmit={handleSubmit} style={{all:'revert'}}>
                                <input
                                    type='text'
                                    onChange={(e) => setFullname(e.target.value)}
                                    value={ fullname }
                                    placeholder="your full name"
                                />

                                <button id="button" className="darker-button">Send request</button>
                                </form>
                            </div>}



                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default UserPage