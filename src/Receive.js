import React, { useState, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import SimpleImage from "@editorjs/simple-image"; 
import List from "@editorjs/list";
import Table from "@editorjs/table";
import LinkTool from '@editorjs/link';
function App() {
  const [editorData, setEditorData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchEditorDataFromAPI();
      setEditorData(fetchedData);
    };

    fetchData();
  }, []);

  const VideoTool = ({ data }) => {
    const { url, caption } = data;
  
    return (
      <div>
      
        <video src={url} controls />
        {caption && <p>{caption}</p>}
      </div>
    );
  };

  const fetchEditorDataFromAPI = async () => {
    
    return {
      time: 1709391708428,
      blocks: [
        {
          id: "JJ0UyKB9FL",
          type: "header",
          data: {
            text: "Lecture 1",
            level: 2,
          },
        },
        {
          id: "x0s2ntgbdx",
          type: "header",
          data: {
            text: "This is about lecture 1",
            level: 4,
          },
        },
        {
          id: "GIHUJuWakM",
          type: "paragraph",
          data: {
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
        },
        {
          id: "-gp40E6IYn",
          type: "table",
          data: {
            withHeadings: true,
            content: [
              ["Cell1", "Cell2"],
              ["45", "12"],
            ],
          },
        },
        {
          id: "iuV7BmAeQc",
          type: "list",
          data: {
            style: "ordered",
            items: ["the beginning of the list", "second", "third"],
          },
        },
        // {
        //   id: "rdPNE1yA8V",
        //   type: "link",
        //   data: {
        //     link: "https://editorjs.io/getting-started/",
        //     meta: {},
        //   },
        // },
        {
          id: "rdPNE1yA8V",
          type: "image", // Change the type to "image"
          data: {
            url: "https://i.ibb.co/nDsFxp5/e0A46n7.jpg", // Replace this with the URL of your image
            caption: "this is a picture", // Optional caption
            withBorder: false,
            withBackground: false,
            stretched: false
          },
        }
      ],
      version: "2.29.0",
    };
  };

  useEffect(() => {
    if (editorData) {
      // Initialize Editor.js with saved data
      const editor = new EditorJS({
        holder: "editorjs",
        readOnly: true,
        data: editorData,
        tools: {
          header: Header,
          table: Table,
          list: List,
          image: SimpleImage, 
        },
      });
    }
  }, [editorData]);

  return <div id="editorjs"></div>;
}

export default App;
