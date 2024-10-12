'use client';
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import './pagination.css'
import { useEffect } from "react";
const PaginationComponent = ({totalPages , currentPage , lastPage,pageParam}) => {
    // Save last page at local storage tO use It when add post navigate to last Page Because it added at last
    if (typeof window !== "undefined") {
     window?.localStorage.setItem('lastPage', lastPage);;
    }
    const pathName = usePathname();
    const router = useRouter();
    return(
        <div className="pagination_wrapper">
            <button disabled={currentPage == 1 && true} onClick={() => router.push(`${pathName}?page=${currentPage - 1}`)}>prev</button>
            {Array.from(new Array(totalPages))?.map((page,index) => (
                <button className={`${currentPage == (index + 1)? "active" : ""}`} key={index} onClick={()=>{
                    router.push(`${pathName}?page=${index + 1}`)
                }}>{index + 1}</button>
            ))}
            <button disabled={currentPage == totalPages && true} onClick={() => router.push(`${pathName}?page=${currentPage + 1}`)}>next</button>
        </div>
    )
}
export default PaginationComponent