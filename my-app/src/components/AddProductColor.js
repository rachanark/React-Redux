import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addNewCategory,OnLoadMaster} from '../action';
import UploadImage from '../components/UploadImage/UploadImage';
import Select from 'react-select';
import 'react-select/dist/react-select.css';



class AddProductColor extends Component {
    constructor(props) {
    super(props);
      this.state ={ shelf:[],
                    upImg:[1],
                    color:[],
                    shelfValue:null,
                    colorValue:null,
                    qty:'',
                    sizes:'',
                    details:[],
                    images:[]
    };

    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleShelfChange = this.handleShelfChange.bind(this);
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this,'');
    this.setImages = this.setImages.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.removeDetail=this.removeDetail.bind(this);
   
  }
  componentWillMount(){
    this.formOptions();
  }
  formOptions(){
    if(this.props.MasterDataReducer!=null){
      var MasterDataReducer=this.props.MasterDataReducer;
      for(var i=0;i<MasterDataReducer.color.length;i++){
        this.state.color.push({
          label:MasterDataReducer.color[i].color,
          value:MasterDataReducer.color[i].color,
          id:MasterDataReducer.color[i].colorId
        })
      }
      for(var i=0;i<MasterDataReducer.shelf.length;i++){
         this.state.shelf.push({
          label:MasterDataReducer.shelf[i].shelfLocation,
          value:MasterDataReducer.shelf[i].shelfLocation,
          id:MasterDataReducer.shelf[i].shelfId
        })
      }
      this.setState(this.state);
    }
    return 1;
  }
  getUploads(){
      return this.state.upImg.map((val)=>{
       return <UploadImage setImg={this.setImages} img={this.state.val} />
      });
  }
  setInitState(){
     this.state.shelfValue=null,
     this.state.colorValue=null,
     this.state.qty='',
     this.state.sizes='',
     this.state.details=[],
     this.state.images=[],
     this.state.upImg=[this.state.upImg[0]+1];
  }
  handleClick(event){
    console.log("Add color");
    console.log(this.state.colorValue);
    var x={
      color:this.state.colorValue,
      details:this.state.details,
      productImages:this.state.images
    }
     console.log(x);
     this.setInitState();
    this.setState(this.state);
    this.props.fun(x);
   // console.log(x);
  }
  handleColorChange= (selectedOption) => {
    console.log(selectedOption);
     console.log("selectedOption");
    this.state.colorValue= selectedOption;
    this.setState(this.state);
    console.log(this.state.colorValue);
  }
   handleShelfChange = (selectedOption) => {
    console.log(selectedOption);
    this.state.shelfValue=selectedOption;
    this.setState(this.state);
   }
  /* handleShelfChange(event) {
     console.log(event.target);
    this.state.shelfValue= event.target.value;
    this.setState(this.state);
  }*/
    handleQtyChange(event) {
    this.state.qty= event.target.value;
    this.setState(this.state);
  }
    handleSizeChange(event) {
    this.state.sizes= event.target.value;
    this.setState(this.state);
  }

  handleSubmit(event) {
   // console.log(this.props);
    var x={
        size:this.state.sizes,
        shelf:this.state.shelfValue,
        quantity:this.state.qty
    }
      this.state.details.push(x);
      this.state.shelfValue=null;
      this.state.qty='';
      this.state.sizes='';
       this.setState(this.state);
   // event.preventDefault();
  }
  showDetails(){
   return this.state.details.map((detail, index)=>{
          return (<tr key={index}>
          <td>{detail.shelf.label}</td>
          <td>{detail.quantity}</td>
          <td>{detail.size}</td>
          <td>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Azzfiyd3n-VTnU7pOn-85Q-UAeUU4d-fmK9l7_-dl4XIBS_E" 
                      style={{width:20,height:20}}  onClick={() =>this.removeDetail(detail)} />
          </td>
          </tr>);
    });
  }
makeDetails(){
  if(this.state.details.length>=1)
  return (
   <table>
          <tbody>
          <tr bgcolor="blue">
          <td style={{border: '1px solid white',color:'white'}}>Shelf</td>
          <td style={{border: '1px solid white',color:'white'}}>Quantity</td>
          <td style={{border: '1px solid white',color:'white'}}>Size</td>
          </tr> 
          {this.showDetails()}
          </tbody>
    </table>);
    else
      return "";
}

  removeDetail(detail){
      var xdetail=JSON.stringify(detail);
      for(var i=0;i<this.state.details.length;i++){
        var y=JSON.stringify(this.state.details[i]);
        if(y===xdetail){
              this.state.details.splice(i,1); 
              this.setState(this.state);
              break;
            }

       }
  }
  setOptions(val){
    if(val=="shelf")
     return this.state.shelf.map((value)=>{
        return <option key={value} value={value}>{value}</option>
      });
    if(val=="color")
        return this.state.color.map((value)=>{
        return <option key={value} value={value}>{value}</option>
      });
    }
  setImages(x){
      this.state.images.push(x);
      alert(x+"added");
      this.setState(this.state); 
  }
  uploadImg(){
      return( <UploadImage setImg={this.setImages} img={this.state.upImg} />);
  }
  render() {
      return (
      <div>
          <table frame="border"><tbody>
          <tr>
          <td key={this.formOptions}>ColorName</td>
          <td style={{width:100}}>
           <Select value={this.state.colorValue} clearable={false} onChange={this.handleColorChange} 
           options={this.state.color} />
          </td>
          </tr>
          <tr style={{margin:50}}>
          {this.makeDetails()}
          </tr>
          <tr>
          <td style={{float:'left'}}>Shelf</td>
          <td><Select value={this.state.shelfValue} clearable={false} 
          onChange={this.handleShelfChange} options={this.state.shelf} /></td>
          <td>Quantity</td>
          <td><input className="form-control" type="text" value={this.state.qty} onChange={this.handleQtyChange} /></td>
          <td>Size</td>
          <td><input className="form-control" type="text" value={this.state.sizes} onChange={this.handleSizeChange} /></td>
          <td><button className="btn" onClick={this.handleSubmit}>ADD</button></td>
          </tr></tbody>
          </table>
          <div style={{margin:20}}>
          {this.getUploads()}
          </div>
          <input className="btn" style={{margin:10}} type="submit" value="ADD COLOR" onClick={this.handleClick} />
          
      </div>
    );
  }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({addNewCategory: addNewCategory,OnLoadMaster:OnLoadMaster}, dispatch);
}

function mapStateToProps(state) {
    return {
       Category:state.Category,
        selectedCategory:state.selectedCategory,
        Track:state.Track,
        MasterDataReducer:state.MasterDataReducer
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(AddProductColor);
