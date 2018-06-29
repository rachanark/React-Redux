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
              const formData = new FormData();
              formData.append('file',file)
              const config = {
                  headers: {
                      'content-type': 'multipart/form-data'
                  }
              }
              axios.put(UPLOAD_IMAGE, formData,config).then(res =>{
                      alert("Successfully added image");
                      this.state.prevImage=JSON.stringify(this.state.image);
                      this.state.image.push({name:file.name,value:reader.result});
                      this.setState(this.state);
                      debugger;
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
  removeImages(img){
     var xImg=JSON.stringify(img);
      for(var i=0;i<this.state.image.length;i++){
        var y=JSON.stringify(this.state.image[i]);
        if(y===xImg){
              this.state.image.splice(i,1); 
              debugger;
              this.props.rmImg(i);
              this.setState(this.state);
              break;
            }

       }
  }
  getCarousel(){
    return this.state.image.map((file)=>{
                          return (   <div key={file.name} style={{display:'inline'}}>
                                      <img src={file.value} style={{width:50,height:50}} />
                                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Azzfiyd3n-VTnU7pOn-85Q-UAeUU4d-fmK9l7_-dl4XIBS_E" 
                      style={{width:20,height:20}}  onClick={() =>this.removeImages(file)} />
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