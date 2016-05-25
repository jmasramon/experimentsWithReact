import React from 'react';

export default class Note extends React.Component {
  constructor(props) {
    super(props);

    // Track `editing` state.
    this.state = {
      editing: false
    };
  }
  render() {
  	console.log('render');
    // Render the component differently based on state.
    if(this.state.editing) {
      return this.renderEdit();
    }

    return this.renderNote();
  }
  renderEdit = () => {
  	console.log('renderEdit');
    // We deal with blur and input handlers here. These map to DOM events.
    // We also set selection to input end using a callback at a ref.
    // It gets triggered after the component is mounted.
    //
    // We could also use a string reference (i.e., `ref="input") and
    // then refer to the element in question later in the code through
    // `this.refs.input`. We could get the value of the input using
    // `this.refs.input.value` through DOM in this case.
    //
    // Refs allow us to access the underlying DOM structure. They
    // can be using when you need to move beyond pure React. They
    // also tie your implementation to the browser, though.
    return (<input type="text" 
    	ref={
	        element => element ?
	        element.selectionStart = this.props.task.length :
	        null
		}
		autoFocus={true} 
		defaultValue={this.props.task} 
		onBlur={this.finishEdit.bind(this)} 
		onKeyPress={this.checkEnter.bind(this)} />);
  }
  renderNote = () => {
  	console.log('renderNote');

  	const onDelete = this.props.onDelete;

    // If the user clicks a normal note, trigger editing logic.
    return (
      <div onClick={this.edit}>
        <span>{this.props.task}</span>
        {onDelete ? this.renderDelete() : null }
      </div>
    );
  }
  edit = () => {
  	console.log('edit');
    // Enter edit mode.
    this.setState({
      editing: true
    });
  }
  checkEnter = (e) => {
  	console.log('checkEnter');
    // The user hit *enter*, let's finish up.
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  }
  finishEdit = (e) => {
  	console.log('finishEdit');
    // `Note` will trigger an optional `onEdit` callback once it
    // has a new value. We will use this to communicate the change to
    // `App`.
    //
    // A smarter way to deal with the default value would be to set
    // it through `defaultProps`.
    //
    // See the *Typing with React* chapter for more information.
    const value = e.target.value;

    if(this.props.onEdit) {
      this.props.onEdit(value);

      // Exit edit mode.
      this.setState({
        editing: false
      });
    }
  }
  renderDelete = () => {
    return <button onClick={this.props.onDelete}>x</button>;
  }
}
