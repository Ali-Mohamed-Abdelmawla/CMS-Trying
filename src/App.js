// import './App.css';
// import EditorJS from '@editorjs/editorjs';
// import Header from '@editorjs/header';
// import SimpleImage from '@editorjs/simple-image';
// import List from '@editorjs/list';
// import Table from '@editorjs/table';
// import LinkTool from '@editorjs/link'; 
// import { Button } from 'antd';
// import ImgurUpload from './Imgbb'; // Import your custom tool

// import { useRef, useEffect } from 'react';

// function App() {
//   const editorRef = useRef(null);

//   useEffect(() => {
//     let editorInstance = null;

//     try {
//       editorInstance = new EditorJS({
//         holder: 'editorjs',
//         tools: {
//           header: { 
//             class: Header,
//             inlineToolbar: false, 
//           },
//           image: SimpleImage,
//           list: List,
//           table: Table,
//           link: LinkTool,
//           imgurUpload: ImgurUpload, // Add your custom tool

//           // Add more tools as needed
//         }
//       });
    
//     } catch (error) {
//       console.error('Error initializing Editor.js:', error);
//     }

//     // Save the editor instance to the ref
//     editorRef.current = editorInstance;

//     // Cleanup function
//     return () => {
//       if (editorInstance) {
//         editorInstance.destroy();
//       }
//     };
//   }, []);

//   const handleSave = async () => {
//     try {
//       const savedData = await editorRef.current.save(); // Get the saved data from Editor.js
//       console.log('Data to be sent to API:', savedData);
//       // Make API call with savedData
//     } catch (error) {
//       console.error('Error saving data:', error);
//     }
//   };

//   return (
//     <div className="App">
//     <h1>Create a post</h1>
//       <div id="editorjs"></div>
//       <Button style = {{margin: 'auto', display: 'block',marginTop: '15px'}} type="primary" onClick={handleSave}>Save</Button>
//     </div>
//   );
// }

// export default App;


import './App.css';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import SimpleImage from '@editorjs/simple-image';
import List from '@editorjs/list';
import Table from '@editorjs/table';
import LinkTool from '@editorjs/link'; 
import { Button } from 'antd';
import ImgbbUpload from './Imgbb.js'; // Import your custom tool

import { useRef, useEffect } from 'react';

function App() {
 const editorRef = useRef(null);

 useEffect(() => {
    let editorInstance = null;

    try {
      editorInstance = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: { 
            class: Header,
            inlineToolbar: false, 
          },
          image: SimpleImage,
          list: List,
          table: Table,
          link: LinkTool,
          imgurUpload: {
            class: ImgbbUpload,
            config: {
              // Pass the callback function to the tool
              onUploadSuccess: (url) => {
                console.log('Image URL:', url);
                // Here you can handle the image URL as needed
              },
            },
          },
          // Add more tools as needed
        }
      });
    
    } catch (error) {
      console.error('Error initializing Editor.js:', error);
    }

    // Save the editor instance to the ref
    editorRef.current = editorInstance;

    // Cleanup function
    return () => {
      if (editorInstance) {
        editorInstance.destroy();
      }
    };
 }, []);

 const handleSave = async () => {
    try {
      const savedData = await editorRef.current.save(); // Get the saved data from Editor.js
      console.log('Data to be sent to API:', savedData);
      // Make API call with savedData
    } catch (error) {
      console.error('Error saving data:', error);
    }
 };

 return (
    <div className="App">
      <h1>Create a post</h1>
      <div id="editorjs"></div>
      <Button style = {{margin: 'auto', display: 'block',marginTop: '15px'}} type="primary" onClick={handleSave}>Save</Button>
    </div>
 );
}

export default App;