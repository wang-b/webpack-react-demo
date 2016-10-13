/**
 * 程序入口JS
 * @author wangbin
 * @since 2016/10/13 10:35
 * @version 0.9.0
 */
/*
//ES5
var hello = require('./src/Hello');
var rootElement = document.getElementById('root');
rootElement.innerHTML = '';
rootElement.appendChild(hello());
*/

//ES6
import React from 'react';
import {render} from 'react-dom';
import Hello from './src/Hello';
import Message from './src/Message';

//使用require导入css文件
//css代码会包含到index.html文件中
import './public/css/index.css';

//加载图片, Base64字符串
var img = require('./public/images/loading.gif');

render(
    <div>
        <Hello />
        <br/>
        <Message name="This is Test!"/>
        <img src={img}/>
    </div>,
    document.getElementById('root')
);
