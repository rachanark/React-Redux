 import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addNewCategory,OnLoadMaster} from '../action';
import UploadImage from '../components/UploadImage/UploadImage';
import Select from 'react-select';
import 'react-select/dist/react-select.css';



class ProductButton extends Component {
    constructor(props) {
    super(props);
      this.state ={ shelf:[],
                    upImg:0,
                    color:[],
                    shelfValue:null,
                    colorValue:this.props.colorVal.color,
                    sizeValue:null,
                    qty:'',
                    sizes:[],
                    details:this.props.colorVal.details,
                    images:this.props.colorVal.productImages
    };

    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleShelfChange = this.handleShelfChange.bind(this);
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this,'');
    this.setImages = this.setImages.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.removeDetail=this.removeDetail.bind(this);
   
  }
 componentDidUpdate(prevProps,prevstates){
      if(this.props!=prevProps){
          this.formOptions();
          this.state.colorValue=this.props.colorVal.color;
          this.state.details=this.props.colorVal.details;
          this.state.images=this.props.colorVal.productImages;
          this.setState(this.state);
      }
    
   }
componentWillMount(){
    this.formOptions();
  }
  formOptions(){
    if(this.props.MasterDataReducer!=null){
      this.state.color=[],this.state.shelf=[],this.state.sizes=[];
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
      for(var i=0;i<MasterDataReducer.size.length;i++){
         this.state.sizes.push({
          label:MasterDataReducer.size[i].size,
          value:MasterDataReducer.size[i].size,
          id:MasterDataReducer.size[i].sizeId
        })
      }
      this.setState(this.state);
    }
  }
  setInitState(){
     this.state.shelfValue=null,
     this.state.colorValue=null,
     this.state.qty='',
     this.state.sizeValue=null,
     this.state.details=[],
     this.state.images=[],
     this.state.upImg=this.state.upImg+1;
  }
  cancelEdit(){
    this.props.cancelEdit();
  }
  handleUpdate(event){
    var x={
      color:this.state.colorValue,
      details:this.state.details,
      productImages:this.state.images
    }
     this.props.editProductColor(x,this.props.value);
     this.setInitState();
    this.setState(this.state);
   
  }
  handleColorChange= (selectedOption) => {
    this.state.colorValue= selectedOption;
    this.setState(this.state);
  }
   handleShelfChange = (selectedOption) => {
    this.state.shelfValue=selectedOption;
    this.setState(this.state);
   }
    handleQtyChange(event) {
    this.state.qty= event.target.value;
    this.setState(this.state);
  }
    handleSizeChange=(selectedOption) => {
    this.state.sizeValue=selectedOption;
    this.setState(this.state);
  }

    handleSubmit(event) {
    var x={
        size:this.state.sizeValue,
        shelf:this.state.shelfValue,
        quantity:this.state.qty
    }
      this.state.details.push(x);
      this.state.shelfValue=null;
      this.state.qty='';
      this.state.sizeValue=null;
       this.setState(this.state);
      // event.preventDefault();
  }
  showDetails(){
   return this.state.details.map((detail, index)=>{
          return (<tr key={index}>
          <td>{detail.size.label}</td>
          <td>{detail.shelf.label}</td>
          <td>{detail.quantity}</td>
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
   <table className="table table-bordered">
          <tbody>
          <tr>
          <td>Shelf</td>
          <td>Quantity</td>
          <td>Size</td>
          <td>Action</td>
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
  render() {
      return (
      <div>
      <div style={{marginBottom: '15px', width: '760px', backgroundColor: '#fff',boxShadow: '0 5px 5px 0 rgba(0,0,0,.14), 0 3px 1px -5px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)', padding: '15px'}}>
      <div>
        <div style={{height: '50px', width: '300px'}}>
         <span style={{float:'left',height:'35px',lineHeight:'35px',marginRight:5}}>Color :</span>
         <Select style={{width:'120px',float:'left',height:'35px', marginLeft: '25px'}} value={this.state.colorValue} clearable={false} onChange={this.handleColorChange} 
                      options={this.state.color} />
        </div>
        <div style={{float:'left'}} >
              <UploadImage setImg={this.setImages} img={this.state.upImg} />
               </div>
               <div style={{ height: '25px' }}></div>
               <div>
                <table style={{marginTop: '20px'}} className="table table-bordered">
                      <tbody>
                      <tr >
                      <td >Size</td>
                      <td >Shelf</td>
                      <td >Quantity</td>
                      <td >Action</td>
                      </tr> 
                      {this.showDetails()
                      }
                        <tr>
        <td><Select style={{width:120}} value={this.state.sizeValue} clearable={false} 
                   onChange={this.handleSizeChange} options={this.state.sizes} /></td>
                   <td><Select style={{width:120}} value={this.state.shelfValue} clearable={false} 
                   onChange={this.handleShelfChange} options={this.state.shelf} /></td>
                   <td><input className="form-control" type="number" value={this.state.qty} onChange={this.handleQtyChange} /></td>                          
                       <td><button className="btn" onClick={this.handleSubmit}>ADD</button></td>
                        </tr>
                      </tbody>
                </table>
               </div>
      </div>
        <input className="btn" style={{margin:10}} type="submit" value="Cancel" onClick={this.cancelEdit} />
       <input className="btn" style={{margin:10}} type="submit" value="Update Color" onClick={this.handleUpdate} />
       </div>

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

export default connect(mapStateToProps, matchDispatchToProps)(ProductButton);
