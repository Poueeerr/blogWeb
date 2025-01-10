import React from "react";

interface Post {
  texto: string;
  data_criacao: string;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
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
      <ul>
        {posts.map((post, index) => (
          <li key={index} style={{ padding: "10px" }}>
            {post.texto} - {formatDate(post.data_criacao)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
