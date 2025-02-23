import {customFetch} from '../api/customFetch'
const About = async () => {
  const data = await customFetch('https://jsonplaceholder.typicode.com/posts', {method: 'GET'})
    return(
         <div>{data.map(item => (<h3 key={item.id}>{item.title}</h3>))} </div>
        
    )
}
export default About 