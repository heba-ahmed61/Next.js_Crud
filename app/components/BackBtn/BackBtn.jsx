'use client'
import './BackBtn.css'
import { useRouter } from "next/navigation"
const  BackBtn = () => {
    const router = useRouter()
    return(
        <div className="back_home">
        <button onClick={(e) => router.back()}>Back</button>
    </div>
    )
}
export default BackBtn