import React, {Component} from 'react';
import {connect} from 'react-redux';
import AddProductColor from '../components/AddProductColor'
import UploadImage from '../components/UploadImage/UploadImage'
import ImageCarousel from '../components/ImageCarousel/ImageCarousel'

class ProductPage extends Component {
 // let Colordiv={display:'none'};
 constructor(props) {
    super(props);
    this.state = {value: '',colorstyle:{
    	display:'none'
    },val:[],ProductColor:[]};

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleColor = this.handleColor.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleClick(event) {
   this.state.val.push(1);
   this.state.colorstyle={
      display:'block'
    }
    this.setState( this.state);
    event.preventDefault();
  }
  handleColor(x){
    this.state.ProductColor.push(x);
    this.setState( this.state);
    this.state.colorstyle={
      display:'none'
    }
    console.log("Color ");
    console.log(this.state.ProductColor);
  }
  showColorDetails(x){
     return x.map((val)=>{
       return <div>Shelf:{val.shelf} Qty:{val.qty} Size:{val.size}</div>
     });
  }
  showColor(){
      return  this.state.ProductColor.map((color)=>{
        return (<div>
                    <div>
                   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Azzfiyd3n-VTnU7pOn-85Q-UAeUU4d-fmK9l7_-dl4XIBS_E" 
                      style={{width:20,height:20}} onClick={() =>this.removeColor(color)} />
                   </div>
                    <div>
                      Color:{color.color}<br/>
                     {this.showColorDetails(color.details)}
                    </div>
                   </div>);

      });
  }
  removeColor(color){
      var xdetail=JSON.stringify(color);
      for(var i=0;i<this.state.ProductColor.length;i++){
        var y=JSON.stringify(this.state.ProductColor[i]);
        if(y===xdetail){
              this.state.ProductColor.splice(i,1); 
              this.setState(this.state);
              break;
            }

       }
       console.log("removed color");
  }
  saveColor(x){
       this.state.ProductColor.push(x);
       this.setState(this.state);
  }

    render() {
    	var buttonStyle={
      width:25,
      height:25
    };
    var FieldStyle={
     width:80,
     height:20
    };
        return (
            <div>
	            <div>
	               Description:
	                <input type="text" value={this.state.value} onChange={this.handleChange} />
	                <br/>
                Title:
                  <input type="text" value={this.state.value} onChange={this.handleChange} />
                  <br/>
                Keywords:
                  <input type="text" value={this.state.value} onChange={this.handleChange} />
                  <br/>
	             </div>
	             <div>
	                Color:
	                <input type="submit" style={buttonStyle} value="+" onClick={this.handleClick} />
	             </div>
              <br/>
              <div>{this.showColor()}</div>
              <div style={this.state.colorstyle}><AddProductColor fun={this.handleColor}/></div>
              <br/>
              <br/>
              <input type="submit" value="SAVE PRODUCT" onClick={this.handleClick} />
            </div>

        );
    }

}


export default ProductPage;
