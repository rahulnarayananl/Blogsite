import {useState, useEffect} from 'react'

const UseFetch = (url) => {

    const [data,setData] = useState(null);
    const [isPending,setPending] = useState(true);
    const [error,setError] = useState(null);

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


    return {data, isPending, error};
}
 
export default UseFetch;
