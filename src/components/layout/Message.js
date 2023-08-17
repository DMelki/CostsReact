import { useState, useEffect } from "react"
import styles from "./Message.module.css"

function Message({type, msg}){

    const [visable, setVisable] = useState(false)

    useEffect(() => {

        if(!msg) {
            setVisable(false)
            return
        }

            setVisable(true)

            const timer = setTimeout(()=> {
                setVisable(false)
            }, 3000)

            return () => clearTimeout(timer)
    }, [msg])

    return(
        <>
        {visable && (
        <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
      )}
    </>
    )

}

export default Message