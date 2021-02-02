
import BlogList from './BlogList';
import UseFetch from './UseFetch';

const Home = () => {

    const {data : blogs,isPending,error} = UseFetch('http://localhost:8000/blogs/');

    return (  
        <div className="home">
            {error && <div> Error : {error} </div>}
            {isPending && <div> Loading </div>}
            {blogs && <BlogList blogs = {blogs}  title = "All Blogs" ></BlogList>}
            {/* <BlogList blogs = {blogs.filter((blog) => blog.author === 'mario')}  title = "Mario's Blogs"></BlogList> */}

        </div>
    );
}
 
export default Home;
