require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

let imageDatas=require('jsonData/imageDatas.json');
/*
 *
 */
/*
imageDatas=(function genImageURL(imageDatasArr){
	for (let i = 0,len=imageDatasArr.length; i <len; i++) {
		imageDatasArr[i].imageURL=require(`images/${imageDatasArr[i].fileName}`)
	}
	return imageDatasArr;
})(imageDatas)
*/


//let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
        <section className="stage">
          <section className="img-sec"></section>
          <nav className="controller-nav"></nav>
        </section>
      );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
