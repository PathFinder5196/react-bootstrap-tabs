'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Tab = exports.Tabs = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * React Bootstrap Tabs component
 * usage:
 * <Tabs selected="Tab 1">
 *     <Tab label="Tab 1">
 *         <div>Tab 1 contents!</div>
 *     </Tab>
 *     <Tab label="Tab 2">
 *         <div>Tab 2 contents!</div>
 *     </Tab>
 * </Tabs>
 */
var TabsComponent = function (_React$Component) {
    _inherits(TabsComponent, _React$Component);

    function TabsComponent(props) {
        _classCallCheck(this, TabsComponent);

        var _this = _possibleConstructorReturn(this, (TabsComponent.__proto__ || Object.getPrototypeOf(TabsComponent)).call(this, props));

        _this._renderHeader = function (tab, index) {
            var isActive = false;
            if (typeof _this.state.selected === 'number') {
                isActive = _this.state.selected == index;
            } else {
                isActive = _this.state.selected === tab.props.label;
            }

            var customActiveHeaderClass = !isActive ? null : (0, _classnames2.default)('active', _this.props.activeHeaderClass, tab.props.activeHeaderClass);
            var linkClasses = (0, _classnames2.default)('nav-link', _this.props.headerClass, tab.props.headerClass, customActiveHeaderClass, {
                'disabled': tab.props.disabled
            });

            var customActiveHeaderStyle = !isActive ? null : Object.assign({}, _this.props.activeHeaderStyle, tab.props.activeHeaderStyle);
            var linkStyle = Object.assign({}, _this.props.headerStyle, tab.props.headerStyle, customActiveHeaderStyle);

            return _react2.default.createElement(
                'li',
                { key: index, className: 'nav-item' },
                _react2.default.createElement(
                    'a',
                    { className: linkClasses, style: linkStyle, onClick: tab.props.disabled ? null : _this._handleClick.bind(_this, index) },
                    tab.props.label
                )
            );
        };

        _this.state = {
            selected: _this.props.selected
        };
        return _this;
    }

    _createClass(TabsComponent, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({ selected: nextProps.selected });
        }
    }, {
        key: 'render',
        value: function render() {
            var classNames = (0, _classnames2.default)('tabs', this.props.className);

            return _react2.default.createElement(
                'div',
                { className: classNames, style: this.props.style },
                this._renderHeaders(),
                this._renderContent()
            );
        }

        /**
         * Render the tab headers
         * @returns {any} null if there are no children or a <ul> of tabs
         */

    }, {
        key: '_renderHeaders',
        value: function _renderHeaders() {
            if (this.props.children === undefined) {
                return null;
            }

            return _react2.default.createElement(
                'ul',
                { role: 'tablist', className: 'nav nav-tabs' },
                Array.isArray(this.props.children) ? this.props.children.map(this._renderHeader.bind(this)) : this._renderHeader(this.props.children, 0)
            );
        }

        /**
         * Render an individual header
         * @param {any} tab - the actual tab (a <Tab>)
         * @param {number} index - the index of the tab in the set of tabs
         * @returns {any} - the header for the tab
         */

    }, {
        key: '_renderContent',


        /**
         * Renders the content of the currently selected tab
         * @returns {any} The contents of the selected tab
         */
        value: function _renderContent() {
            if (this.props.children === undefined) {
                return null;
            }

            var onlyOneChild = !Array.isArray(this.props.children);

            var selected = this.state.selected;

            // Find the tab index - selected could be the index or could be the tab label
            var selectedIndex = void 0;
            if (typeof selected === 'number') {
                selectedIndex = selected;
                if (selectedIndex < 0) {
                    console.warn('tab index \'' + this.state.selected + '\' < 0, defaulting to first tab');
                    selectedIndex = 0;
                    selected = selectedIndex;
                } else {
                    var tabCount = this.props.children.length || 1;
                    if (selectedIndex > tabCount - 1) {
                        console.warn('tab index \'' + this.state.selected + '\' > number of tabs (' + tabCount + ', defaulting to last tab');
                        selectedIndex = tabCount - 1;
                        selected = selectedIndex;
                    }
                }
            } else {
                // selected is a string - should be the tab label so find the index of that tab
                var selectedLabel = this.state.selected;
                selectedIndex = onlyOneChild ? 0 : this.props.children.findIndex(function (child) {
                    return selectedLabel === child.props.label;
                });
                if (selectedIndex < 0) {
                    console.warn('tab \'' + this.state.selected + '\' not found, defaulting to first tab');
                    selectedIndex = 0;
                    selected = onlyOneChild ? this.props.children.props.label : this.props.children[selectedIndex].props.label;
                }
            }

            // If the selected tab has changed then we need to update the state
            if (selected !== this.state.selected) {
                this.setState({ selected: selected });
            }

            var contentTab = onlyOneChild ? this.props.children : this.props.children[selectedIndex];
            var contentClassNames = (0, _classnames2.default)('tab-content', this.props.contentClass, contentTab.props.className);
            var contentStyle = Object.assign({}, this.props.contentStyle, contentTab.props.style);

            return _react2.default.createElement(
                'div',
                { className: contentClassNames, style: contentStyle },
                contentTab
            );
        }

        /**
         * A tab has been clicked on
         * @param {number} index  - the index of the tab
         * @param {Event} event  - the click event
         * @returns {void}
         */

    }, {
        key: '_handleClick',
        value: function _handleClick(index, event) {
            event.preventDefault();
            this.setState({ selected: index });
            if (this.props.onSelect !== undefined) {
                this.props.onSelect(index, this.props.children[index].props.label);
            }
        }
    }]);

    return TabsComponent;
}(_react2.default.Component);

TabsComponent.propTypes = {
    /**
     * The selected tab - either the index of it or the label string.  Defaults to tab 0 if not supplied
     */
    selected: _propTypes2.default.PropTypes.oneOfType([_propTypes2.default.PropTypes.number, _propTypes2.default.PropTypes.string]),

    /**
     * Optional CSS class to apply to the Tabs component overall
     */
    className: _propTypes2.default.PropTypes.string,

    /**
     * Optional CSS style to apply to the Tabs component overall
     */
    style: _propTypes2.default.PropTypes.object,

    /**
     * Optional CSS class to apply to each tab header
     */
    headerClass: _propTypes2.default.PropTypes.string,

    /**
     * Optional CSS style to apply to each tab header
     */
    headerStyle: _propTypes2.default.PropTypes.object,

    /**
     * Optional CSS class to apply to the active tab header
     */
    activeHeaderClass: _propTypes2.default.PropTypes.string,

    /**
     * Optional CSS style to apply to the active tab header
     */
    activeHeaderStyle: _propTypes2.default.PropTypes.object,

    /**
     * Optional CSS class to apply to the content container for the currently selected tab
     */
    contentClass: _propTypes2.default.PropTypes.string,

    /**
     * Optional CSS style to apply to the content container for the currently selected tab
     */
    contentStyle: _propTypes2.default.PropTypes.object,

    /**
     * Optional method to call when a tab is selected.  Receive the tab index and tab label of the selected tab
     */
    onSelect: _propTypes2.default.PropTypes.func,

    /**
     * The child tabs to display - either an array or an element
     */
    children: _propTypes2.default.PropTypes.oneOfType([_propTypes2.default.PropTypes.array, _propTypes2.default.PropTypes.element])

};
TabsComponent.defaultProps = {
    selected: 0
};
;

/**
 * React Bootstrap Tab component (to be contained by a <Tabs> component
 * usage:
 * <Tab label="Tab 1">
 *     <div>Tab 1 contents!</div>
 * </Tab>
 */

var TabComponent = function (_React$Component2) {
    _inherits(TabComponent, _React$Component2);

    function TabComponent(props) {
        _classCallCheck(this, TabComponent);

        return _possibleConstructorReturn(this, (TabComponent.__proto__ || Object.getPrototypeOf(TabComponent)).call(this, props));
    }

    _createClass(TabComponent, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.props.children
            );
        }
    }]);

    return TabComponent;
}(_react2.default.Component);

TabComponent.propTypes = {
    /**
     * Label to display as the tab header
     */
    label: _propTypes2.default.PropTypes.string.isRequired,

    /**
     * Is this tab disabled?  Default: false
     */
    disabled: _propTypes2.default.PropTypes.bool,

    /**
     * Optional CSS class to apply to the tab overall
     */
    className: _propTypes2.default.PropTypes.string,

    /**
     * Optional CSS style to apply to the tab overall
     */
    style: _propTypes2.default.PropTypes.object,

    /**
     * Optional CSS class to apply to the tab header
     */
    headerClass: _propTypes2.default.PropTypes.string,

    /**
      * Optional CSS style to apply to the tab header
      */
    headerStyle: _propTypes2.default.PropTypes.object,

    /**
     * Optional CSS style to apply to the active tab header
     */
    activeHeaderStyle: _propTypes2.default.PropTypes.object,

    /**
     * Optional CSS class to apply to the tab header when active
     */
    activeHeaderClass: _propTypes2.default.PropTypes.string
};
;

exports.Tabs = TabsComponent;
exports.Tab = TabComponent;