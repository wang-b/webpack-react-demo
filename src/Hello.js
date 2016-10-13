/**
 * Hello World模块
 * @author wangbin
 * @since 2016/10/13 10:36
 * @version 0.9.0
 */
/*
//ES5
var config = require('../conf/config');

module.exports = function() {
    var ele = document.createElement('div');
    ele.textContent = config.text;
    return ele;
};
*/

//ES6
import React, {Component} from 'react';
import config from '../conf/config';
import css from '../css/hello.css';  //模块化加载css

//定义一个组件
class Hello extends Component {
    render() {
        return (
            <button onClick={(e) => this._handleClick(e)} style={{margin: '10px'}} className={css.btn}>
                <strong>React</strong>
                ,{config.text}
            </button>
        );
    }

    _handleClick(e) {
        alert('Click Me!');
    }
}

export default Hello;
