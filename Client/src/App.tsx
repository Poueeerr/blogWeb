import { useEffect, useState } from "react";
import axios from "axios";
import PostInput from "./components/PostInput";
import PostList from "./components/PostList";

interface Post {
  id: string; 
  texto: string;
  data_criacao: string;
}

const App = () => {
  const [data, setData] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3003/api");
      setPosts(response.data); 
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  const sendDataToAPI = async () => {
    try {
      const response = await axios.post("http://localhost:3003/api", { texto: data });
      const newPost: Post = response.data; 
      setPosts((prevPosts) => [...prevPosts, newPost]);
      setData(""); 
    } catch (error) {
      console.error("Error sending data to API:", error);
    }
  };

  // Função para deletar um post
  const deletePost = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3003/api/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div>
      <PostInput data={data} setData={setData} sendDataToAPI={sendDataToAPI} />
      <PostList posts={posts} deletePost={deletePost} />
    </div>
  );
};

export default App;
