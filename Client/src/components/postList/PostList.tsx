import React, { useState } from "react";
import styles from "./PostLists.module.css"

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
      <h1 className={styles.title}>Posts:</h1>
      <div className={styles.container}>
        {posts.map((post) => (
          <div key={post.id} className={styles.postContainer}>
          {editingPostId === post.id ? (
              <div className={styles.postsEditContainer}>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleSave(post.id)}>Save</button>
                <button onClick={() => setEditingPostId(null)}>Cancel</button>
              </div>
            ) : (
              <div >
                {post.texto} - {formatDate(post.data_criacao)}
                <button onClick={() => handleEdit(post.id, post.texto)} style={{margin: '5px'}}>Edit</button>
                <button onClick={() => deletePost(post.id)} style={{margin: '5px'}}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
