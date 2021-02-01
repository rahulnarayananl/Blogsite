import { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";


const Update = () => {

    const {id} = useParams();
    const history = useHistory();
    const [data,setData] = useState(null);
    const [isPending,setPending] = useState(true);
    const [error,setError] = useState(null);

    const [title,setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');

    const url = 'http://localhost:8000/blogs/' + id;

    useEffect(() => {
        const abortconst = new AbortController();
        fetch(url,{signal :abortconst.signal})
            .then(res => {
                if(!res.ok){
                    throw Error('Could not fetch');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setPending(false);
                setError(null);
                setTitle(data.title);
                setBody(data.body);
                setAuthor(data.author);
            })
            .catch(err => {
                if(err.name === 'AbortError'){
                    console.log('fetch closed');
                }
                else{
                    setError(err.message);
                    setPending(false);
                }
                
            })
        return () => abortconst.abort();

    },[url]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title,body,author};
        fetch('http://localhost:8000/blogs/' + id,{
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body : JSON.stringify(blog)
        }).then(() => {
            //history.go(-1);
            history.go(-1);
            console.log('Update added');
          })
    }

    return (
        <div className="update">
            {error && <div> Error : {error} </div>}
            {isPending && <div> Loading... </div>}
            {data && (
            <div>
                <h1>Update Blog</h1>
                <h2>Blog Title:</h2><h3>{title}</h3>
                <h2>Blog author: {author}</h2>
                <h3>Blog body:</h3>
            <form onSubmit = {handleSubmit}>
                <textarea
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                ></textarea>
                
                <button>Update Blog</button>
            </form>
            </div>
            )}
         </div>
    );
}

export default Update;


