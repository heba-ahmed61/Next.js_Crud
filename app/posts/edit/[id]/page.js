import { getPostDetails } from "../../../actions/apis"
import PostForm from "../../../components/PostForm/PostForm"
const EditPost = async ({params}) => {
    const postItem = await getPostDetails(params?.id)
    return(
       <div>
        <PostForm itemData={postItem}/>
       </div>
    )
   }
   export default EditPost