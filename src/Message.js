/**
 * Message组件
 * @author wangbin
 * @since 2016/10/13 14:25
 * @version 0.9.0
 */
import React, {Component, PropTypes} from 'react';

//定义组件
class Message extends Component {
    render() {
        return (
            <button onClick={() => this._handleClick()} style={{padding: '10px'}}>
                {this.props.name}
            </button>
        );
    }

    _handleClick() {
        alert('Click!');
    }
}

//参数类型属性
Message.propTypes = {
    name: PropTypes.string.isRequired
};

export default Message;
