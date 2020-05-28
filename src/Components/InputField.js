import React from 'react';

class InputField extends React.Component {

    render() {
        return (
            <div className="inputField">
                <input
                    className={this.props.className}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={ (e) => this.props.onChange(e.target.value)}
                    onFocus={this.props.onFocus}
                />
            </div>
        )
    }
}

export default InputField;