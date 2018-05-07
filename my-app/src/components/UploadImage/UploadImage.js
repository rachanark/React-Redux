import React, { Component } from 'react';

import axios from 'axios';

class UploadImage extends Component {
    constructor(props) {
    super(props);
    this.state = {selectedFile: null};

    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
  }

  fileChangedHandler(event) {
      // TODO: Add validation for images
      const file = event.target.files[0];
      this.setState({selectedFile: event.target.files[0]});
  }

  uploadHandler(event) {
      console.log(this.state.selectedFile)
      const formData = new FormData();
      formData.append('myFile', this.state.selectedFile, this.state.selectedFile.name);
      axios.post('my-domain.com/file-upload', formData, {
        onUploadProgress: progressEvent => {
          console.log(progressEvent.loaded / progressEvent.total)
        }
      })
    // event.preventDefault();
  }

  render() {
    return (
      <div>
          <input type="file" onChange={this.fileChangedHandler} />
          <button onClick={this.uploadHandler}>Upload!</button>
      </div>
    );
  }
}

export default UploadImage;
