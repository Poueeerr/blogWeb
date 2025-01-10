import { useEffect, useState } from "react";
import axios from "axios";
import PostInput from "./components/PostInput";
import PostList from "./components/PostList";

interface Post {
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
    const myData = { data };
    try {
      const response = await axios.post("http://localhost:3003/api", myData);
      console.log(response);
      setData("");

      const newPost = { texto: data, data_criacao: new Date().toISOString() };
      setPosts((prevPosts) => [...prevPosts, newPost]);
    } catch (error) {
      console.error("Error sending data to API:", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div>
      <PostInput data={data} setData={setData} sendDataToAPI={sendDataToAPI} />
      <PostList posts={posts} />
    </div>
  );
};

export default App;
