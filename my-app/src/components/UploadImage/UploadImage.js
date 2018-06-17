import React, { Component } from 'react';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import axios,{ post } from 'axios';
import {UPLOAD_IMAGE} from '../../ApiConstants';

class UploadImage extends Component {
    constructor(props) {
    super(props);
    this.state = {image:[],prevImage:[],file:null,event:null};
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
  }

 shouldComponentUpdate(newProps, newState) {
       let shouldUpdate = (this.props.img !== newProps.img) || (JSON.stringify(this.state.image) !== JSON.stringify(this.state.prevImage));
       return shouldUpdate;
   }
   componentWillUpdate(nextProps, nextState) {
      console.log('Component WILL UPDATE! Upload Image');
      if((this.props.img !== nextProps.img))
      this.setState({image:[],prevImage:[],file:null,event:null});
   }

  fileChangedHandler(event) {
      this.state.file=event.target.files[0];
      this.state.event=event;
      event.persist();
      this.setState(this.state);
  }

  uploadHandler(event) {
      let reader = new FileReader();
      let file = this.state.file;
      if(file){
            reader.onloadend = () => {
              console.log(reader);
          /*    
             const formData = new FormData();
            formData.append('File', file);
            axios.get(UPLOAD_IMAGE).then(res =>{
            alert("Successfully added image");
            console.log(res);
            this.state.prevImage=JSON.stringify(this.state.image);
              this.state.image.push({name:file.name,value:reader.result});
              this.setState(this.state);
             this.props.setImg(res);
             this.state.event.target.value=null;
             }).catch(function (error) {
                  console.log(error);
                  alert("Error adding image");
                });
             */
              const formData = new FormData();
              formData.append('file',file)
              const config = {
                  headers: {
                      'content-type': 'multipart/form-data'
                  }
              }
              axios.put(UPLOAD_IMAGE, formData,config).then(res =>{
                      alert("Successfully added image");
                      console.log(res);
                      this.state.prevImage=JSON.stringify(this.state.image);
                        this.state.image.push({name:file.name,value:reader.result});
                        this.setState(this.state);
                       this.props.setImg(res.data.success);
                       this.state.event.target.value=null;
                       }).catch(function (error) {
                            console.log(error);
                            alert("Error adding image");
                          });
            }
            reader.readAsDataURL(file);
            
      }
   
  }
  getCarousel(){
    return this.state.image.map((file)=>{
                          return (   <div key={file.value} style={{display:'inline'}}>
                                      <img src={file.value} style={{width:50,height:50}} />
                                       </div>
                     );
               
        });
}

  render() {
    return (
      <div>
          <input type="file" onChange={this.fileChangedHandler} />
          <button onClick={this.uploadHandler}>Upload!</button>
           <div>
            {this.getCarousel()}
          </div>
      </div>
    );
  }
}

export default UploadImage;