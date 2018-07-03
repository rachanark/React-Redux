import React, {Component} from 'react';
import { Redirect } from 'react-router'
import {connect} from 'react-redux';
import AddProductColor from '../components/AddProductColor';
import ImageCarousel from '../components/ImageCarousel/ImageCarousel';
import {bindActionCreators} from 'redux';
import {OnLoad,OnLoadMaster} from '../action';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {GET_MASTER_DATA,SAVE_PRODUCT,GET_CATEGORY_TREE, GET_PRODUCT_DETAILS,UPDATE_PRODUCT} from '../ApiConstants';
import axios from 'axios';
import ProductButton from '../components/ProductButton'
import {Master} from '../data/Master';
import {CategoryTree} from '../data/CategoryTree'
import {getColor,getShelf,getSize} from '../Utils/MasterValue'

class ProductPage extends Component {
 listCategory(category){
  if(category.subcategory!=null){
  for(var i=0;i<category.subcategory.length;i++){
      if(category.subcategory[i].subcategory!=null && category.subcategory[i].subcategory.length>=1){
        this.listCategory(category.subcategory[i])
        }
        else{
               if(category.levelId!='1'){
                  this.state.categoryList.push({
                  label:category.subcategory[i].categoryName,
                  value:category.subcategory[i].categoryId,
                  id:category.subcategory[i].categoryId,
                });
              }
        }
    }
  }
  else{
    if(category.levelId!='1'){
      this.state.categoryList.push({
      label:category.categoryName,
      value:category.categoryId,
      id:category.categoryId,
    });
    }
  }
  this.setState(this.state);
 }
   componentDidMount() {
      if(this.props.MasterDataReducer==null){
      //  this.props.OnLoadMaster(this.props.Category,this.props.Track,Master);
     axios.get(GET_MASTER_DATA).then(res =>{
           this.props.OnLoadMaster(this.props.Category,this.props.Track,res.data);

                 if(this.props.location.pathname.includes("/admin/editProduct") && this.props.MasterDataReducer!=null)
        axios.get(GET_PRODUCT_DETAILS + this.props.match.params.id).then(res =>{
           res = res.data;
            let colors = [];let filters=[];
            for (let i = 0; i < res.colors.length; i++) {
                var colorObj=res.colors[i];
                var colorName=getColor(colorObj.colorId,this.props.MasterDataReducer);
                let color = {
                    color: {label:colorName ,id:colorObj.colorId,value:colorName},
                    productColorId: res.colors[i].productColorId,
                    colorId: res.colors[i].colorId,
                    details: []
                }
                 filters.push(color.color);
                let imags = [];
                for (let j = 0; j < res.colors[i].productImages.length; j++) {
                    imags.push({
                        productImageId: res.colors[i].productImages[j].productImageId,
                        productImagePath: res.colors[i].productImages[j].productImagePath
                    });
                }
                for (let j = 0; j < res.colors[i].details.length; j++) {
                    color.details.push({
                        productDetailsId: res.colors[i].details[j].productDetailsId,
                        size: {
                            label: res.colors[i].details[j].size.size,
                            value: res.colors[i].details[j].size.size,
                            id:res.colors[i].details[j].size.sizeId
                        },
                        shelf: {
                            label: res.colors[i].details[j].shelfLocation.shelfLocation,
                            value: res.colors[i].details[j].shelfLocation.shelfLocation,
                            id:res.colors[i].details[j].shelfLocation.shelfId
                        },
                        quantity: res.colors[i].details[j].quantity
                    });
                }
                color.productImages = imags;

                colors.push(color);
            }
            let catVal=[];
            for(let i=0;i<res.categoryIds.length;i++){
              catVal.push({
                label:res.categoryIds[i].nm,
                value:res.categoryIds[i].id,
                id:res.categoryIds[i].id
              });
             }
             // this.state.ProductColor=colors;
                this.state = {
                id: res.productId,
                caraouselImg:[],
                titleValue: res.title,
                descriptionValue: res.description,
                keywordValue: res.keywords,
                categoryValue:catVal,
                selectedCat:[],
                colorstyle: {
                    display:'none'
                },
                editStyle: {
                    display:'none'
                },
                addStyle: {
                    display:'block'
                },
                filters:[],
                 editFlag:true,
                filtercolor:null,
                colorFilters:filters,
                editIndex:0,
                editColorVal:{color:{value:'',label:'',id:''},details:[],productImages:[]},
                //finalColor:[],
                ProductColor:colors,
                categoryList:this.state.categoryList
            };
            this.setState(this.state);
         }).catch(function (error) {
        console.log(error);
         });



         }).catch(function (error) {
    console.log(error);
  });

    }
     if(this.props.Category==null){
          /*var x= {   name:'main',
                        levelId:'1',
                        subcategory:CategoryTree 
                    };
           this.props.OnLoad(x,['1'],this.props.MasterDataReducer);
         console.log(x);*/
     axios.get(GET_CATEGORY_TREE).then(res =>{
            var x= {   name:'main',
                        levelId:'1',
                        subcategory:res.data 
                    };
           this.props.OnLoad(x,['1'],this.props.MasterDataReducer);
         }).catch(function (error) {
        console.log(error);
         
         });
    }



       
    }

componentDidUpdate(prevProps,prevstates){
  if(this.props!=prevProps)
    this.getCategoryList();
  }
  componentWillMount(){
       this.getCategoryList();
  }
 getCategoryList(){
      if(this.props.Category!=null){
        this.state.categoryList=[];
        this.setState(this.state);
        this.listCategory(this.props.Category);
        this.setState(this.state);
         }
  }
 constructor(props,context) {
    super(props,context);

    this.state = {
        id: '',
        caraouselImg:[],
        titleValue: '',
        descriptionValue: '',
        keywordValue: '',
        categoryValue:null,
        selectedCat:[],
        colorstyle: {
            display:'none'
        },
        editStyle: {
            display:'none'
        },
        addStyle: {
            display:'block'
        },
        editFlag:false,
        filters:[],
        filtercolor:null,
        colorFilters:[],
        editIndex:0,
        editColorVal:{color:{value:'',label:'',id:''},details:[],productImages:[]},
      //  finalColor:[],
        ProductColor:[],
        categoryList:[]
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.handleSaveProduct=this.handleSaveProduct.bind(this);
    this.cncl=this.cncl.bind(this);
    this.handlefilterChange=this.handlefilterChange.bind(this);    
    this.editProductColor=this.editProductColor.bind(this);
  }

  showEditStyle(){
        this.state.editStyle={display:'block'};
        this.state.addStyle={display:'none'};
      this.setState(this.state);
  }
   showAddStyle(){
    this.state.editStyle={display:'none'};
    this.state.addStyle={display:'block'};
    this.setState(this.state);
  }
  getInitState(){
    return { id: '',
        caraouselImg:[],
        titleValue: '',
        descriptionValue: '',
        keywordValue: '',
        categoryValue:null,
        selectedCat:[],
        colorstyle: {
            display:'none'
        },
        editStyle: {
            display:'none'
        },
        addStyle: {
            display:'block'
        },
        editFlag:false,
        filters:[],
        filtercolor:null,
        colorFilters:[],
        editIndex:0,
        editColorVal:{color:{value:'',label:'',id:''},details:[],productImages:[]},
       // finalColor:[],
        ProductColor:[],
        categoryList:[]
      };
  }
handleCategoryChange= (selectedOption) => {
    debugger;
    this.state.categoryValue= selectedOption;
    this.setState(this.state);
  }

  handleSaveProduct(){
    var temp=this.state.categoryValue;
    for(var i=0;i<temp.length;i++){
      this.state.selectedCat.push(temp[i].id);
    }
    let finalColor=[]
    if(this.state.editFlag){
      var productColor=this.state.ProductColor;
      for(var i=0;i<productColor.length;i++){
            let dtt=[]
            for(var j=0;j<productColor[i].details.length;j++){
                dtt.push({
                  productDetailsId:productColor[i].details[j].productDetailsId,
                  size:{
                    sizeId:productColor[i].details[j].size.id
                  },
                  shelfLocation:{
                    shelfId:productColor[i].details[j].shelf.id
                  },
                  quantity:productColor[i].details[j].quantity
                })
            }
            finalColor.push({
              colorId:productColor[i].colorId,
              productColorId:productColor[i].productColorId,
              productImages:productColor[i].productImages,
              details:dtt
            });
      }
    }
    else{
      var productColor=this.state.ProductColor;
      for(var i=0;i<productColor.length;i++){
            let dtt=[]
            for(var j=0;j<productColor[i].details.length;j++){
                dtt.push({
                    size:{
                    sizeId:productColor[i].details[j].size.id
                  },
                  shelfLocation:{
                    shelfId:productColor[i].details[j].shelf.id
                  },
                  quantity:productColor[i].details[j].quantity
                })
            }
            finalColor.push({
              colorId:productColor[i].colorId,
              productImages:productColor[i].productImages,
              details:dtt
            });
    }
  }

    var x={
        title:this.state.titleValue,
        description:this.state.descriptionValue,
        categoryIds:this.state.selectedCat,
        colors:this.state.finalColor
         }
    if(this.state.editFlag){
          x.productId=this.state.id;
         axios.post(UPDATE_PRODUCT,x).then(res =>{
         // this.context.router.transitionTo("/admin/products");
          // <Redirect to="/admin/products" />;
          window.location.href="/admin/products";
         
         }).catch(function (error) {
                  console.log("Unable to update Product");
                    window.location.href="/admin/products";
                // <Redirect to="/admin/products" />
                 // this.context.router.transitionTo("/admin/products");
                   console.log(error);
                  });
    }
     
    else
        axios.post(SAVE_PRODUCT,x).then().catch(function (error) {
                      alert("Unable to add Product")
        console.log(error);
         });

    this.setState(this.getInitState());
  }
  handleTitleChange(event) {
    this.state.titleValue=event.target.value
    this.setState(this.state);
  }
   handleDescriptionChange(event) {
      this.state.descriptionValue=event.target.value
    this.setState(this.state);
  }
   handleKeywordChange(event) {
    this.state.keywordValue=event.target.value
    this.setState(this.state);
  }
  handleClick(event) {
   this.state.colorstyle={
      display:'block'
    }
    this.setState( this.state);
    event.preventDefault();
  }
  handleColor(x){
    this.state.ProductColor.push({color:x.color,
                                  details:x.details,
                                  productImages:{
                                    productImagePath:x.productImages,
                                    productImageId:null
                                  }
                                });
    this.state.colorFilters.push(x.color);
    var dtt=[],img=[];
    /*for(var i=0;i<x.details.length;i++){
      dtt.push({
        size:{"sizeId":x.details[i].size.id},
        shelfLocation:{"shelfId":x.details[i].shelf.id},
        quantity:x.details[i].quantity
      });
    }*/
    for(var j=0;j<x.productImages.length;j++){
       // img.push(x.productImages[j].name);
        this.state.caraouselImg.push(x.productImages[j].file);
      }
    /*this.state.finalColor.push({colorId:x.color.id,
                                  details:dtt,
                                  productImages:img});*/
    
    this.setState(this.state);
    this.state.colorstyle={
      display:'none'
    }
  }
  showColorDetails(x){
     return x.map((val)=>{
       return <tr>
               <td>Shelf:{val.shelf.label}</td>
               <td>Quantity:{val.quantity}</td>
               <td>Size:{val.size.label}</td>
              </tr>
     });
  }
  showColor(){
     // var filter=JSON.stringify(this);
      if(this.state.ProductColor.length>=1){
        return  this.state.ProductColor.map((color)=>{
           if(this.state.filters.includes(color.color.label) || this.state.filtercolor==null)
        return (<tr>
                    <td>
                      {color.color.label}
                    </td>
                    <td>
                    <table className="table"><tbody>
                     {this.showColorDetails(color.details)}
                    </tbody></table>
                    </td>
                    <td>
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Azzfiyd3n-VTnU7pOn-85Q-UAeUU4d-fmK9l7_-dl4XIBS_E" 
                      style={{width:20,height:20}} onClick={() =>this.removeColor(color)} />
                       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRglrs6ulIyp_Qlt6Ecnf2dk-gm36hqZP_f7L1ygABEGUE1zjLqhQ" style={{width:20,height:20}}
                        onClick={()=>this.editColor(color)}
                      />
                   </td>
                </tr>);

      });
      }
      else
        return "";
  }
  removeColor(color){
      var xdetail=JSON.stringify(color);
      for(var i=0;i<this.state.ProductColor.length;i++){
        var y=JSON.stringify(this.state.ProductColor[i]);
        if(y===xdetail){
              this.state.ProductColor.splice(i,1); 
           //   this.state.finalColor.splice(i,1); 
              this.setState(this.state);
              break;
            }

       }
  }
     cncl(){
    this.showAddStyle();
  }
  editProductColor(color,index){
     this.state.ProductColor[index]=color; 
     /* var dtt=[];
    for(var i=0;i<color.details.length;i++){
      dtt.push({
        size:{"sizeId":color.details[i].size.id},
        shelfLocation:{"shelfId":color.details[i].shelf.id},
        quantity:color.details[i].quantity
      });
    }
     this.state.finalColor[index]={colorId:color.color.id,
                                  details:dtt,
                                  productImages:color.productImages}; 
      */
            this.setState(this.state);
      this.showAddStyle();
  }
   editColor(color){
     var xdetail=JSON.stringify(color);
      for(var i=0;i<this.state.ProductColor.length;i++){
        var y=JSON.stringify(this.state.ProductColor[i]);
        if(y===xdetail){
              this.state.editColorVal=color;
              this.state.editIndex=i; 
              this.showEditStyle();
              break;
            }
       }
  }



  handlefilterChange= (selectedOption) => {
      this.state.filters = [];
      if (selectedOption.length === 0) {
          this.state.filtercolor = undefined;
      } else {
        this.state.filtercolor= selectedOption;
      }
    for(var z=0;z<selectedOption.length;z++) {
        this.state.filters.push(selectedOption[z].label)
    }
    this.setState(this.state);
  }

  render() {
      var buttonStyle={
      width:25,
      height:25
    };
         
        return (
            <center>
              <div style={{margin:10}}>
                <table><tbody>
                    <tr>
                    <td style={{width:'500px'}}>

                    </td>
                    <td>
                    <table>
                        <tr>Product Name </tr>
                        <tr><input className="form-control" type="text" value={this.state.titleValue} onChange={this.handleTitleChange} /></tr>
                        <td>Category</td>
                        <tr>
                         <Select value={this.state.categoryValue} multi={true} clearable={false} onChange={this.handleCategoryChange} 
                         options={this.state.categoryList} />
                        </tr>
                        <tr>Description </tr>
                        <tr><input className="form-control" type="text" value={this.state.descriptionValue} onChange={this.handleDescriptionChange} /></tr>
                        <tr>Keywords</tr>
                        <tr><input className="form-control" type="text" value={this.state.keywordValue} onChange={this.handleKeywordChange} /></tr>
                    </table>
                    </td>
                    </tr></tbody>
                </table><br/><br/>
                <div style={this.state.editStyle}>
                <ProductButton value={this.state.editIndex} editProductColor={this.editProductColor} cancelEdit={this.cncl} colorVal={this.state.editColorVal} />
                </div>
                <div style={this.state.addStyle}>
                Color <input className="btn" type="submit" value="+" onClick={this.handleClick}/>
            <div style={{width:'250px', marginTop: '15px'}}>
                <Select multi={true} style={{width:'120px',height:'35px', marginLeft: '25px'}} value={this.state.filtercolor} clearable={false} onChange={this.handlefilterChange} 
                      options={this.state.colorFilters} />
            </div>
                <br/><br/>
                 <div style={this.state.colorstyle}><AddProductColor fun={this.handleColor}/></div>
                <table className="table table-bordered" style={{width:'50%'}}><tbody><tr>
                              <td>Color</td>
                              <td >Details</td>
                               <td >Action</td>
                              </tr>{this.showColor()}</tbody></table>
                </div>
               </div>
             
              <input className="btn" type="submit" value="SAVE PRODUCT" onClick={this.handleSaveProduct} />
            
           </center>

        );
    }

}

function mapStateToProps(state) {
    return {
        Category: state.Category,
        selectedCategory:state.selectedCategory,
        Track:state.Track,
        MasterDataReducer:state.MasterDataReducer
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({OnLoad:OnLoad,OnLoadMaster:OnLoadMaster}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(ProductPage);
 