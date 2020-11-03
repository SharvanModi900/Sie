import React from 'react'
console.clear();

function debounce(fn, delay) {
  let timer;
  const thisContext = this;
  const args = arguments;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      return fn.apply(thisContext, args);
    }, delay);
  };
}

class DropDownListItem extends React.Component {
  constructor(props) {
    super(props);
    this.debouncedToggleChangeListItem = debounce(
      this.toggleChangeListItem,
      100
    );
  }
  toggleChangeListItem = () => {
    const { listData, uniqueKey } = this.props;
    this.props.toggleChangeListItem(listData[uniqueKey]);
  };
  onKeyUp = e => {
    if (e.keyCode === 13) {
      const { listData, uniqueKey } = this.props;
      this.props.toggleChangeListItem(listData[uniqueKey]);
    }
  };
  render() {
    const { listData, isChecked } = this.props;
    const id = `${listData.label}__${listData.value}`;
    return (
      <div
        tabIndex={0}
        className="drop-down__list-item"
        onClick={this.debouncedToggleChangeListItem}
        onKeyUp={this.onKeyUp}
      >
        <input
          tabIndex={-1}
          id={id}
          type="checkbox"
          checked={isChecked}
          value={listData.value}
        />
        <label htmlFor={id}>{listData.label}</label>
      </div>
    );
  }
}



class NewDropDown extends React.Component {
  state = {
    isOpen: false
  };
  toggleIsOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  // handle click outside ~ to close the dropdown
  componentWillMount() {
    document.addEventListener("mousedown", this.handleDocClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleDocClick, false);
  }
  handleDocClick = e => {
    if (!this.wrapper.contains(e.target)) {
      this.setState({
        isOpen: false
      });
    }
  };
  renderDropDownIcon = () => {
    if (this.props.customRenderDropDownIcon) {
      return this.props.customRenderDropDownIcon();
    } else {
      return <span className="drop-down-icon">▼</span>;
    }
  };
  renderSelected = () => {
    const { isOpen } = this.state;
    const { selected, data, uniqueKey } = this.props;
    let labelContent = "";
    if (!selected.length) {
      labelContent = "None Selected";
    } else if (selected.length === data.length) {
      labelContent = "All Selected";
    } else if (selected.length === 1) {
      const selectedOne = data.find(item => item[uniqueKey] === selected[0]);
      labelContent = selectedOne.label;
    } else {
      labelContent = `${selected.length} Selected`;
    }
    const activeClass = isOpen ? "new-drop-down--is-open" : "";
    return (
      <button
        className={`new-drop-down__button ${activeClass}`}
        onClick={this.toggleIsOpen}
      >
        <span>{labelContent}</span>
        {this.renderDropDownIcon()}
      </button>
    );
  };
  renderDropDownList = () => {
    const {
      data,
      toggleChangeListItem,
      uniqueKey,
      selected,
      shouldHaveSelectAll
    } = this.props;

    let data_ = [...data];

    if (shouldHaveSelectAll) {
      data_ = [{ label: "Select All", value: "ALL" }, ...data];
    }

    const getIsChecked = ({ listData, uniqueKey, selected }) => {
      let isChecked = false;
      if (listData[uniqueKey] === "ALL") {
        if (selected.length === data.length) {
          isChecked = true;
        } else {
          isChecked = false;
        }
      } else {
        isChecked = selected.indexOf(listData[uniqueKey]) > -1;
      }
      return isChecked;
    };

    return data_.map((listData, index) => {
      const isChecked = getIsChecked({ listData, uniqueKey, selected });
      return (
        <DropDownListItem
          key={index}
          toggleChangeListItem={toggleChangeListItem}
          listData={listData}
          uniqueKey={uniqueKey}
          isChecked={isChecked}
        />
      );
    });
  };
  render() {
    return (
      <div className="new-drop-down" ref={wrapper => (this.wrapper = wrapper)}>
        {this.renderSelected()}
        {this.state.isOpen && (
          <div className="new-drop-down__list-wrapper">
            {this.renderDropDownList()}
          </div>
        )}
      </div>
    );
  }
}



export default class App extends React.Component {
  state = {
    uniqueKey: "value",
    selected: [],
    data: [
      {
        label: "India",
        value: 1,
        description:'India, officially the Republic of India, is a country in South Asia. It is the second-most populous country, the seventh-largest country by land area, and the most populous democracy in the world'
      },
      {
        label: "Nepal",
        value: 2,
        description:'Nepal, officially the Federal Democratic Republic of Nepal, is a sovereign country in South Asia. It is mainly in the Himalayas, but also includes parts of the Indo-Gangetic Plain. It is the 49th largest country by population and 93rd largest country by area.',
        
      },
      {
        label: "SriLanka",
        value: 3,
        description:'Sri Lanka, officially the Democratic Socialist Republic of Sri Lanka, is an island country in South Asia, located in the Indian Ocean southwest of the Bay of Bengal and southeast of the Arabian Sea. Sri Lanka has been called “The pearl of the Indian ocean” because of its shape and location.'
      }
    ]
  };
  toggleChangeListItem = uniqueKey => {
    if (uniqueKey === "ALL") {
      if (this.state.selected.length === this.state.data.length) {
        this.setState({
          selected: []
        });
      } else {
        const allUniqueKeys = this.state.data.map(
          item => item[this.state.uniqueKey]
        );
        this.setState({
          selected: allUniqueKeys
        });
      }
    } else {
      let updatedSelected = [...this.state.selected];
      if (updatedSelected.indexOf(uniqueKey) > -1) {
        updatedSelected.splice(updatedSelected.indexOf(uniqueKey), 1);
      } else {
        updatedSelected.push(uniqueKey);
      }
      this.setState({
        selected: updatedSelected
      });
    }
  };
  renderSelected = () => {
    const { selected, data, uniqueKey } = this.state;
    const data_ = data.slice();
    let res = [];
    for (let i = 0; i < selected.length; i++) {
      for (let j = 0; j < data_.length; j++) {
        if (data_[j][uniqueKey] === selected[i]) {
          res.push(data_[j]);
          data_.splice(j, 1);
        }
      }
    }
    return JSON.stringify(res);
  };
  render() {
    return (
      <div className="app">
       
        <br />
        <NewDropDown
          shouldHaveSelectAll={true}
          uniqueKey={this.state.uniqueKey}
          data={this.state.data}
          selected={this.state.selected}
          toggleChangeListItem={this.toggleChangeListItem}
        />
        <div className="grey">
          <h5>Selected:</h5>
          {this.renderSelected()}
        </div>
      </div>
    );
  }
}

