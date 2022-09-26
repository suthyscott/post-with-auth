import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function Profile() {
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        axios.get("http://localhost:4546/user").then(res => {
            console.log(res.data)
            if (res.data.username) {
                setUserInfo(res.data)
            }
        })
    }, [])
    return (
        <div>
            <button>
                <Link to="/">Landing</Link>
            </button>
            {userInfo.username ? (
                <p>your username is {userInfo.username}</p>
            ) : (
                <p>you are not logged in</p>
            )}
        </div>
    )
}

export default Profile
