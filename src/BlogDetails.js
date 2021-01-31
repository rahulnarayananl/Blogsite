import { useParams } from "react-router-dom";
import UseFetch from "./UseFetch";
import { useHistory } from "react-router-dom";


const BlogDetails = () => {

    const history = useHistory();


    const {id} = useParams();
    const {data : blog ,isPending,error} = UseFetch('http://localhost:8000/blogs/' + id);
    const handleClick = () =>{
        fetch('http://localhost:8000/blogs/' + id,{
            method: 'DELETE'
        }).then(() => {
            //history.go(-1);
            history.push('/');
            console.log('blog deleted');
          })
    }

    return(
        <div className="blog-details">
            {error && <div> Error : {error} </div>}
            {isPending && <div> Loading... </div>}
            {blog && (
                <article>
                    <h2>Blog Title: {blog.title}</h2>
                    <p>Written by: {blog.author}</p>
                    <div>{blog.body}</div>
                    <button onClick = {handleClick}>Delete </button>
                    <button onClick = {()=>{
                        history.go(-1);
                    }}> Back</button>
                </article>
            )}

        </div>
     );
}
 
export default BlogDetails;  