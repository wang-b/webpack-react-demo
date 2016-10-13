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

render(
    <div>
        <Hello />
        <br/>
        <Message name="This is Test!"/>
    </div>,
    document.getElementById('root')
);
