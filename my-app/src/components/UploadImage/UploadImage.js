import React, { Component } from 'react';


class UploadImage extends Component {
    constructor(props) {
    super(props);
    this.state = {selectedFiles:[],image:[],file:null,event:null,flag:this.props.flag};
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
  }

  fileChangedHandler(event) {
      this.state.file=event.target.files[0];
      this.state.event=event;
      this.setState(this.state);
  }
 /* componentWillReceiveProps(nextProps) {
    if(nextProps.img%2==0){
      this.setState({selectedFiles:[],image:[],file:null,event:null});
      console.log("UploadImage");
      console.log(this.state);
    }
  
}*/

  uploadHandler(event) {
      let reader = new FileReader();
      let file = this.state.file;
      if(file){
            reader.onloadend = () => {
              console.log(reader);
              this.state.image.push({name:file.name,value:reader.result});
             this.props.setImg(file.name);
             this.setState(this.state);
            }
            reader.readAsDataURL(file);
            /*const formData = new FormData();
            formData.append('File', file, file.name);
            axios.get('https://acinventory-204612.appspot.com/rest/getProduct/1').then(res =>{
            console.log("Response");
            console.log(res);
             });*/
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
         
          <button className="btn" onClick={this.uploadHandler}>Upload</button>
           <div>
            {this.getCarousel()}
          </div>
      </div>
    );
  }
}

export default UploadImage;
