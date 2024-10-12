import Link from 'next/link'
import DeleteButton from '../DeleteButton/DeleteButton'
import  '../PostCard/card.css'
const PostCard = ({postItem , classes}) => {
    return(
    <div className={`postcard_item ${classes && classes}`}>
           <h1 className="postcard_item_title" ><Link href={`/posts/details/${postItem?.id}`} >{postItem?.title}</Link></h1>
           <p className="postcard_item_desc">{postItem?.body}</p>
           <div className="postcard_item_actions">
           <Link href={`/posts/edit/${postItem?.id}`}>Edit</Link>
           <DeleteButton itemID = {postItem?.id}/>
           </div>
        </div>
    )
}
export default PostCard