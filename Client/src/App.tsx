import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState<string>('');
  const [posts, setPosts] = useState<{ texto: string, data_criacao: string }[]>([]);

  const fetchAPI = async () => {
    try {
      const response = await axios.get('http://localhost:3003/api');
      console.log(response.data);
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
      setData('');

      const newPost = { texto: data, data_criacao: new Date().toISOString() }; 
      setPosts(prevPosts => [...prevPosts, newPost]);
    } catch (error) {
      console.error("Error sending data to API:", error);
    }
  };

  const formatDate = (date: string) => {
    const formattedDate = new Date(date).toLocaleString("pt-BR", {
      year: "numeric", month: "numeric", day: "numeric",
      hour: "numeric", minute: "numeric"
    });
    return formattedDate;
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div>
      
      <textarea value={data}
        placeholder="Digite seu texto"
        onChange={(e) => {
          setData(e.target.value)
        }}
      
        style={{resize: 'none', height:'100px', width:'400px'}}
      />
      <br></br>
      <button onClick={sendDataToAPI}>POST</button>
      <h1>Posts:</h1>
      <div style={{  padding:'30px'}}>
      <ul>
        {posts.map((post, index) => (
          <li key={index} style={{padding:'10px'}}>
            {post.texto} - {formatDate(post.data_criacao)}
          </li>
        ))}
      </ul>
      </div>
      
    </div>
  );
};

export default App;
