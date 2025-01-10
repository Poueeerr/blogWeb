import React from "react";

interface PostInputProps {
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
  sendDataToAPI: () => void;
}

const PostInput: React.FC<PostInputProps> = ({ data, setData, sendDataToAPI }) => {
  return (
    <div>
      <textarea
        value={data}
        placeholder="Digite seu texto"
        onChange={(e) => setData(e.target.value)}
        style={{ resize: "none", height: "100px", width: "400px" }}
      />
      <br />
      <button onClick={sendDataToAPI}>POST</button>
    </div>
  );
};

export default PostInput;
