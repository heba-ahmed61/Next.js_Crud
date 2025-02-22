// 'use client'
// import { deletePost } from '@/app/actions/serverActions'
// import  './DeleteButton.css'
// import { usePathname, useRouter } from "next/navigation";
// const DeleteButton = ({itemID}) => {
//   const router = useRouter();
//   const pathName = usePathname()
//   console.log(pathName.includes('/posts/details'))
//   // Delete Post Function Starts
//   const deleteFunction = async (id) => {
//     try {
//       const response = await deletePost(id)
//       if(pathName.includes('/posts/details')){
//         router.back()
//       }        

//     } catch (error) {
//       console.log(error)
//     }
//   }
//   // Delete Post Function Ends
//     return(
//         <div>
//           <button onClick={(e) => deleteFunction(itemID)} className="delete_button">Delete</button>
//         </div>
//     )
// }
// export default DeleteButton