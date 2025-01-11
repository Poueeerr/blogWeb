import React from "react";
import styles from "./PostInput.module.css";

interface PostInputProps {
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
  sendDataToAPI: () => void;
}

const PostInput: React.FC<PostInputProps> = ({ data, setData, sendDataToAPI }) => {
  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        value={data}
        placeholder="Digite seu texto"
        onChange={(e) => setData(e.target.value)}
      />
      <button className={styles.button} onClick={sendDataToAPI}>
        POST
      </button>
    </div>
  );
};

export default PostInput;
