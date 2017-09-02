require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDom from 'react-dom';

let imageDatas=require('jsonData/imageDatas.json');
/*
 *
 */

imageDatas=(function genImageURL(imageDatasArr){
	for (let i = 0,len=imageDatasArr.length; i <len; i++) {
		imageDatasArr[i].imageURL=require(`images/${imageDatasArr[i].fileName}`)
	}
	return imageDatasArr;
})(imageDatas)

let yeomanImage = require('../images/yeoman.png');
/*single img component*/
class ImgFigure extends React.Component{

  handleClick=(e)=>{
    if(this.props.arrange.isCenter){
      this.props.invert();
    }else{
      this.props.center();
    }
    e.stopPropagation();
    e.preventDefault();
  }
  render(){
    let styleObj={};
    let imgClassName='img-figure';
    styleObj=this.props.arrange.pos;
    if (this.props.arrange.isCenter) {
      styleObj.zIndex = 11;
    }
    let prefixArr =  ['MozTransform','MsTransform','WebkitTransform','transform'];
    prefixArr.forEach((value)=>{
      styleObj[value]=`rotate(${this.props.arrange.rotate}deg)`;
    })
    if(this.props.arrange.isInverse){
      imgClassName+=' is-inverse'
    }else{
      imgClassName='img-figure';
    }
    return (
      <figure className={imgClassName} style={styleObj} onClick={this.handleClick}>
        <img src={this.props.data.imageURL} alt={this.props.data.title} />
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handleClick}>
            <p>{this.props.data.desc}</p>
          </div>
        </figcaption>
      </figure>
    )
  }
}

class AppComponent extends React.Component {
  constructor(props){
    super(props);
    this.state={
      imgsArrangeArr:[]
    }
  }
  Constant={
      centerPos:{
        left:0,
        right:0
      },
      hPosRange:{
        leftSecX:[0,0],
        rightSecX:[0,0],
        y:[0,0]
      },
      vPosRange:{
        topY:[0,0],
        x:[0,0]
      }
  }
  genPos(v){
    return Math.ceil(Math.random()*(v[1]-v[0])+v[0])
  }
  genRandomRotate(){
    return Math.ceil(Math.random()*60-30);
  }

  invert(index){
    var that=this;
    return function (){
      let imgsArrangeArr=that.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse=!imgsArrangeArr[index].isInverse;
      that.setState({
        imgsArrangeArr:imgsArrangeArr
      })
    }
  }

  center(index) {
    return function() {
      this.rearrange(index);
    }.bind(this);
  }
  componentDidMount(){
    /**/
      let stageDom=ReactDom.findDOMNode(this.refs.stage),
          stageW=stageDom.scrollWidth,
          stageH=stageDom.scrollHeight,
          halfStageW=Math.ceil(stageW/2),
          halfStageH=Math.ceil(stageH/2);
      console.log('stageDom',stageDom.scrollHeight)
    /**/
      let imgFigureDom=ReactDom.findDOMNode(this.refs.imgFigure0),
          imgW=imgFigureDom.scrollWidth,
          imgH=imgFigureDom.scrollHeight,
          halfImgW=Math.ceil(imgW/2),
          halfImgH=Math.ceil(imgH/2);
    console.log('imgFigureDom',imgFigureDom.scrollHeight)
    /**/
      this.Constant.centerPos={
          left:halfStageW-halfImgW,
          top:halfStageH-halfImgH
      }
      /**/
      this.Constant.hPosRange.leftSecX[0]=-halfImgW;
      this.Constant.hPosRange.leftSecX[1]=halfStageW-halfImgW*3;
      this.Constant.hPosRange.rightSecX[0]=halfStageW+halfImgW;
      this.Constant.hPosRange.rightSecX[1]=stageW-halfImgW;
      this.Constant.hPosRange.y[0]=-halfImgH;
      this.Constant.hPosRange.y[1]=stageH-halfImgH;
      /**/
      this.Constant.vPosRange.topY[0]=-halfImgH;
      this.Constant.vPosRange.topY[1]=halfStageH-halfImgH*3;
      this.Constant.vPosRange.x[0]=halfImgW-imgW;
      this.Constant.vPosRange.x[1]=halfImgW;

      this.rearrange(0);
  }
  /**/
  rearrange(centerIndex){
    let that=this;
    let imgsArrangeArr=this.state.imgsArrangeArr,
        Constant=this.Constant,
      centerPos=Constant.centerPos,
      hPosRange=Constant.hPosRange,
      vPosRange=Constant.vPosRange,
      hPosRangeLeftSecx=hPosRange.leftSecX,
      hPosRangeRightSecx=hPosRange.rightSecX,
      hPosRangeY=hPosRange.y,
      vPosRangeTopy=vPosRange.topY,
      vPosRangeX=vPosRange.x,

      imgsArrangeTopArr=[],
      topImgNum=Math.floor(Math.random()*2),

      topImgSpliceIndex=0,

      imgsArrangeCenterArr=imgsArrangeArr.splice(centerIndex,1);
      console.log('topImgNum',topImgNum)
      imgsArrangeCenterArr[0].pos=centerPos;
      imgsArrangeCenterArr[0].rotate=that.genRandomRotate();
      imgsArrangeCenterArr[0].isCenter=true;

    topImgSpliceIndex=Math.ceil(Math.random()*(imgsArrangeArr.length-topImgNum))
    imgsArrangeTopArr=imgsArrangeArr.splice(topImgSpliceIndex,topImgNum)

    imgsArrangeTopArr.forEach(function (value,index) {
      imgsArrangeTopArr[index]={
        pos:{
          left:that.genPos(vPosRangeX),
          top:that.genPos(vPosRangeTopy)
        },
        rotate:that.genRandomRotate(),
        isCenter:false
      }
    })

    for(let i=0,len=imgsArrangeArr.length,half=len/2;i<len;i++){
      var rangeL=[];
      if (i<half){
        rangeL=hPosRangeLeftSecx;
      }else{
        rangeL=hPosRangeRightSecx;
      }
      imgsArrangeArr[i].pos={
        left:that.genPos(rangeL),
        top:that.genPos(hPosRangeY)
      }
      imgsArrangeArr[i].rotate=that.genRandomRotate()
      imgsArrangeArr[i].isCenter=false
    }

    if(imgsArrangeTopArr&&imgsArrangeTopArr[0]){
      imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
    }
    imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

    this.setState({
      imgsArrangeArr:imgsArrangeArr
    })
  }



  render() {
    let imagesArr=[],controllerUnits=[];
    let that=this;
    Array.prototype.forEach.call(imageDatas,function (value,index) {
      if (!that.state.imgsArrangeArr[index]){
        that.state.imgsArrangeArr[index]={
          pos:{
            left:0,
            top:0,
          },
          rotate:0,
          isInverse:false,
          isCenter:false
        }
      }
      imagesArr.push(<ImgFigure invert={that.invert(index)} center={that.center(index)} arrange={that.state.imgsArrangeArr[index]} key={index} data={value} ref={'imgFigure'+index}/>)
    })

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imagesArr}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );

  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
