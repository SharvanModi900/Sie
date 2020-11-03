

import React from 'react'
import TableSencond from './Sencod'
import MultiSelector from './multiselector'
import Tabledata from './table'
import Tabs from './Tabs'
export default class App extends React.Component {
    constructor() {
      super();
      
      this._handleTabChange = this._handleTabChange.bind(this)
    }
    
    _handleTabChange(index) {
      console.log('Selected tab index', index);
    }
  
    render() {
      return (
          <div className="sticky-inner">
        <TabPanel onTabChange={this._handleTabChange}>
          <div className="btn" title="Button 1">
          
          <Tabledata />
          
          </div>
         
          <button  className="btn" title="Button 2">
            
            {/* <TableSencond /> */}
            <Tabs />
           
          </button>
         
        </TabPanel>
        </div>
      );
    }
  }
  
  class TabPanel extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        selectedTabIndex: props.children.length == 0 ? null : 0
      };
  
      this._handleClick = this._handleClick.bind(this);
    }
  
    _handleClick(index) {
      this.setState({
        selectedTabIndex: index
      });
      
      this.props.onTabChange(index);
    }
  
    _renderTabs() {
      let tabs = [];
      
      for (let i = 0; i < this.props.children.length; i++) {
        tabs.push(
          <Tab
            key={`tab-${i}`}
            label={this.props.children[i].props.title}
            index={i}
            isSelected={i === this.state.selectedTabIndex}
            onClick={this._handleClick} />
        );
      }
  
      return tabs;
    }
    
    _renderTabContent() {
      return this.props.children[this.state.selectedTabIndex].props.children;
    }
  
    render() {
      if (this.state.selectedTabIndex == null) {
        return 'nope';
      }
      
      return (
        <div className="tab-panel">
          <div className="tab-panel__header">
            {this._renderTabs()}
          </div>
          <div className="tab-panel__content">
            {this._renderTabContent()}
          </div>
        </div>
     );
    }
  }
  
  class Tab extends React.Component {
    constructor(props) {
      super(props);
  
      this._handleClick = this._handleClick.bind(this);
    }
  
    _handleClick() {
      this.props.onClick(this.props.index);
    }
  
    render() {
      const tabClassName = this.props.isSelected ? 'tab tab--selected' : 'tab';
  
      return (
        <span className={tabClassName} onClick={this._handleClick}>
          <span className="tab__label">{this.props.label}</span>
        </span>
      );
    }
  }
  
  