import React, { Component } from 'react';
import {Button, Modal, Glyphicon, Tooltip, OverlayTrigger} from 'react-bootstrap';
import PropsNewPanel from './PropsNewPanel';

const defaultSlide = {
  slide: false,
  x: 0,
  y: 0,
  z: 0,
  scale:   1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  rotateZ: '',
  content: '<p>Create Your Own Content!</p>'
};

export default class AddModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: false,
      ...defaultSlide
    };
  }
  componentDidMount(){
    let {addSteps} = this.props;
    
    setTimeout(() => {
      addSteps([
        {
          text: 'First, you need to Add a new <b style="color: #e5b560">STEP</b> !',
          selector: '.oi-btn-add',
          position: 'top',
          type: 'hover',
          style: {
            backgroundColor: '#3e4852',
            borderRadius: 0,
            color: 'rgba(255,255,255,.8)',
            mainColor: '#a94442',
            beacon: {
              inner: '#a94442',
              outer: '#a94442'
            },
            skip: {
              color: 'rgba(255,255,255,.3)',
              fontSize: '13px'
            },
            width: '25rem'
          }
        }
      ]);
    }, 6100);
  }
  
  initState(){
    this.setState(defaultSlide);
  }
  handleClick(e){
    let target = e.target;
    while( target.nodeName !== 'BUTTON' && target !== document.documentElement)
      target = target.parentElement;
      
    if (target.name === 'open')
      this.setState({show: true});
    else if (target.name === 'add')
    {
      let {actions} = this.props;
      actions.addStep(this.state);
      
      this.initState();
      this.setState({show: false});
    }
    
  }
  handleChange(e){
    if (typeof(e) === 'string')
      this.setState({ content: e });
    else
      this.setState({ 
        [e.target.name]: e.target.name === 'slide' ? e.target.checked : e.target.value 
      });
  }
  contentChange(content){
    this.setState({content});
  }
  
  render() {
    const close = () => this.setState({show: false});
    const toolTip = ( <Tooltip id={'addTooltip'}>Add a new Step</Tooltip> );
    
    return (
      <span>
        <OverlayTrigger placement="left" delayShow={800} overlay={toolTip}>
          <Button className="oi-btn oi-btn-o oi-btn-add oi-btn-add-pos" name="open" active={false} onClick={this.handleClick.bind(this)}><Glyphicon glyph="plus" /></Button>
        </OverlayTrigger>
        
        <Modal show={this.state.show}
               onHide={close}
               container={this}
               enforceFocus={false}
               aria-labelledby="contained-modal-title">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">New Step</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PropsNewPanel data={this.state}
                           content={this.state.content}
                           onChange={this.handleChange.bind(this)}/>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle='link' 
                    onClick={close} 
                    style={{color: 'gray'}}>
              cancel
            </Button>
            <Button name="add" 
                    className="oi-btn oi-btn-add"
                    onClick={this.handleClick.bind(this)}>
              Create!
            </Button>
          </Modal.Footer>
        </Modal>
      </span>
    );
  }
}
