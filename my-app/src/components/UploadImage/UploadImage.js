import React, { Component } from 'react';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import axios,{ post } from 'axios';
import {UPLOAD_IMAGE} from '../../ApiConstants';

class UploadImage extends Component {
    constructor(props) {
    super(props);
    this.state = {image:this.props.preImg,prevImage:[],file:null,event:null};
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
  }

 shouldComponentUpdate(newProps, newState) {
       let shouldUpdate = (this.props.preImg !== newProps.preImg)||(this.props.img !== newProps.img) || (JSON.stringify(this.state.image) !== JSON.stringify(this.state.prevImage));
       return shouldUpdate;
   }
   componentWillUpdate(nextProps, nextState) {
      if((this.props.img !== nextProps.img) || (JSON.stringify(this.props.preImg) !== JSON.stringify(nextProps.preImg)))
          this.setState({image:nextProps.preImg,prevImage:[],file:null,event:this.state.event});
      
   }
   /* componentDidUpdate(prevProps,prevState){
        if(JSON.stringify(prevProps.image)!==JSON.stringify(this.props.preImg)){
            this.state.image=this.props.preImg;
            this.setState(this.state); 
        }
    }*/

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

              this.state.prevImage=JSON.stringify(this.state.image);
                      this.state.image.push({name:file.name,file:reader.result});
                      this.props.setImg({name:file.name,file:reader.result});
                      this.state.event.target.value=null;
                      this.setState(this.state);
              
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
              this.props.rmImg(i);
              this.setState(this.state);
              break;
            }

       }
  }
  getCarousel(){
    return this.state.image.map((file)=>{
                          return (   <div key={file.name} style={{display:'inline'}}>
                                      <img src={file.file} style={{width:50,height:50}} />
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


       /*       axios.put(UPLOAD_IMAGE, formData,config).then(res =>{
                      alert("Successfully added image");
                      this.state.prevImage=JSON.stringify(this.state.image);
                      this.state.image.push({name:file.name,file:reader.result});
                      this.setState(this.state);
                      this.props.setImg({name:res.data.success,file:reader.result});
                      this.state.event.target.value=null;
                       }).catch(function (error) {
                            console.log(error);
                            alert("Error adding image");
                          });*/