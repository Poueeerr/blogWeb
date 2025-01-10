import React from "react";

interface Post {
  id: string;
  texto: string;
  data_criacao: string;
}

interface PostListProps {
  posts: Post[];
  deletePost: (id: string) => void; 
}

const PostList: React.FC<PostListProps> = ({ posts, deletePost }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("pt-BR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Posts:</h1>
      <div>
        {posts.map((post) => (
          <div key={post.id} style={{ padding: "10px",whiteSpace: "pre-wrap",border: '1px solid gray', margin: "10px" }}>
            {post.texto} - {formatDate(post.data_criacao)}
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
