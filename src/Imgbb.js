import axios from "axios";
import { LinkTool } from '@editorjs/link';
class ImgbbUpload {
  constructor({ data, config, api, onUploadSuccess }) {
    this.api = api;
    this.data = data;
    this.config = config;
    this.nodes = {
      wrapper: null,
      input: null,
      button: null,
    };
    this.onUploadSuccess = onUploadSuccess; // Store the callback
 }

  static get toolbox() {
    return {
      icon: "<svg>...</svg>", // Your SVG icon here
      title: "Upload Image to Imgur",
    };
  }

  render() {
    this.nodes.wrapper = document.createElement("div");
    this.nodes.input = document.createElement("input");
    this.nodes.button = document.createElement("button");

    this.nodes.input.type = "file";
    this.nodes.input.accept = "image/*";
    this.nodes.button.innerHTML = "Upload";

    this.nodes.button.addEventListener("click", () => this.uploadImage());

    this.nodes.wrapper.appendChild(this.nodes.input);
    this.nodes.wrapper.appendChild(this.nodes.button);

    return this.nodes.wrapper;
  }


  uploadImage() {
    const file = this.nodes.input.files[0];
    if (!file) return;

    // ImgBB API endpoint and your API key
    const apiEndpoint = "https://api.imgbb.com/1/upload";
    const apiKey = "b12524ab4b955c0548dbc0dc9c669d48"; // Use your API key here

    // Create a new FormData object
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", apiKey);

    // Axios POST request
    axios
      .post(apiEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data)
        console.log(data.data.url)

        if (data.status === 200) {
          console.log("in")
          this.data = { url: data.url };
          this.api.blocks.insert("LinkTool", { url: data.url }, true);
          // Call the callback with the image URL
          console.log(data.url)

          if (this.onUploadSuccess) {
            console.log(data.data.url)
            this.onUploadSuccess(data.data.display_url);
          }
        } else {
          console.log("Error uploading image:", data);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
      
 }
}

export default ImgbbUpload;
