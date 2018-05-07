import React, {Component} from 'react';
import {connect} from 'react-redux';

class NotFoundPage extends Component {


    render() {
        return (
            <div>
                Page you are looking for is not available
            </div>
        );
    }

}


export default connect()(NotFoundPage);
