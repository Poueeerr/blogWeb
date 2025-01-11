import { useEffect, useState } from "react";
import axios from "axios";
import PostInput from "./components/postInput/PostInput";
import PostList from "./components/postList/PostList";
import styles from "./App.module.css";

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

  const updatePost = async (id: string, newText: string) => {
    try {
      const response = await axios.put(`http://localhost:3003/api/${id}`, { texto: newText });
      const updatedPost: Post = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === id ? updatedPost : post))
      );
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

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
    <div className={styles.appContainer}>
      <h1 className={styles.header}>Website de Postagens</h1>
      <PostInput data={data} setData={setData} sendDataToAPI={sendDataToAPI} />
      <PostList posts={posts} deletePost={deletePost} updatePost={updatePost} />
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Website de Postagens. Feito com ❤️.
      </footer>
    </div>
  );
};

export default App;
