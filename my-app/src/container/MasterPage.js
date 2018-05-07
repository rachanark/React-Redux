import React, {Component} from 'react';
import {connect} from 'react-redux';

class MasterPage extends Component {


    render() {
        return (
            <div>
                Master data Add and Edit
            </div>
        );
    }

}


export default connect()(MasterPage);
