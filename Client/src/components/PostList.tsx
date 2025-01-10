import React, { useState } from "react";

interface Post {
  id: string;
  texto: string;
  data_criacao: string;
}

interface PostListProps {
  posts: Post[];
  deletePost: (id: string) => void;
  updatePost: (id: string, newText: string) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, deletePost, updatePost }) => {
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("pt-BR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const handleEdit = (id: string, texto: string) => {
    setEditingPostId(id);
    setEditText(texto);
  };

  const handleSave = (id: string) => {
    updatePost(id, editText);
    setEditingPostId(null);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Posts:</h1>
      <div>
        {posts.map((post) => (
          <div key={post.id} style={{ padding: "10px", whiteSpace: "pre-wrap", border: '1px solid gray', margin: "10px" }}>
            {editingPostId === post.id ? (
              <div>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleSave(post.id)}>Save</button>
                <button onClick={() => setEditingPostId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                {post.texto} - {formatDate(post.data_criacao)}
                <button onClick={() => handleEdit(post.id, post.texto)}>Edit</button>
                <button onClick={() => deletePost(post.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
