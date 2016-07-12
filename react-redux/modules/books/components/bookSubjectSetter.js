'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _bootstrapButton = require('applicationRoot/rootComponents/bootstrapButton');

var _bootstrapButton2 = _interopRequireDefault(_bootstrapButton);

var _ajaxButton = require('applicationRoot/rootComponents/ajaxButton');

var _ajaxButton2 = _interopRequireDefault(_ajaxButton);

var _reducer = require('../reducers/booksSubjectModification/reducer');

var _actionCreators = require('../reducers/booksSubjectModification/actionCreators');

var bookSubjectActionCreators = _interopRequireWildcard(_actionCreators);

var _reactBootstrap = require('react-bootstrap');

var _reactAutosuggest = require('react-autosuggest');

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var languages = [{
    name: 'C',
    year: 1972
}, {
    name: 'Elm',
    year: 2012
}, {
    name: 'C#',
    year: 2003
}, {
    name: 'Java',
    year: 1996
}];

function getSuggestions(value) {
    var inputValue = value.trim().toLowerCase();
    var inputLength = inputValue.length;

    //if (inputLength === 0 && !force) return [];
    if (inputLength === 0) return languages.concat();
    //if (force) return languages;

    return languages.filter(function (lang) {
        return lang.name.toLowerCase().slice(0, inputLength) === inputValue;
    });
}

function getSuggestionValue(suggestion) {
    // when suggestion selected, this function tells what should be the value of the input
    //languages = languages.filter(s => s != suggestion);
    return suggestion.name;
}

function renderSuggestion(suggestion) {
    return _react2.default.createElement(
        'span',
        null,
        suggestion.name
    );
}

var Example = function (_React$Component) {
    _inherits(Example, _React$Component);

    function Example() {
        _classCallCheck(this, Example);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Example).call(this));

        _this.state = {
            value: '',
            suggestions: getSuggestions('')
        };

        _this.onChange = function (event, _ref) {
            var newValue = _ref.newValue;

            _this.setState({
                value: newValue,
                suggestions: getSuggestions(newValue)
            });
        };

        _this.onSuggestionSelected = function (evt, val) {
            debugger;
            _this.onChange(null, { newValue: '' });

            setTimeout(function () {
                return _this.input.blur();
            }, 1);
        };
        return _this;
    }

    _createClass(Example, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state;
            var value = _state.value;
            var suggestions = _state.suggestions;

            var inputProps = {
                placeholder: 'Type a programming language',
                value: value,
                onChange: this.onChange
                //onFocus: (evt) => { this.setState({ suggestions: getSuggestions('') }) }
            };

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_reactAutosuggest2.default, { className: 'auto-suggest-label',
                    suggestions: suggestions,
                    shouldRenderSuggestions: function shouldRenderSuggestions() {
                        return true;
                    },
                    onSuggestionsUpdateRequested: this.onSuggestionsUpdateRequested,
                    getSuggestionValue: getSuggestionValue,
                    onSuggestionSelected: this.onSuggestionSelected,
                    renderSuggestion: renderSuggestion,
                    ref: function ref(el) {
                        if (el && el.input) {
                            _this2.input = el.input;
                        }
                    },
                    inputProps: inputProps }),
                _react2.default.createElement('button', { xstyle: { display: 'none' }, ref: function ref(el) {
                        return _this2.dummy = el;
                    } })
            );
        }
    }]);

    return Example;
}(_react2.default.Component);

var BookSubjectSetterDesktopUnConnected = function (_React$Component2) {
    _inherits(BookSubjectSetterDesktopUnConnected, _React$Component2);

    function BookSubjectSetterDesktopUnConnected() {
        _classCallCheck(this, BookSubjectSetterDesktopUnConnected);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(BookSubjectSetterDesktopUnConnected).apply(this, arguments));
    }

    _createClass(BookSubjectSetterDesktopUnConnected, [{
        key: 'setBooksSubjects',
        value: function setBooksSubjects() {
            this.props.setBooksSubjects(this.props.modifyingBooks.map(function (b) {
                return b._id;
            }), this.props.addingSubjects.map(function (s) {
                return s._id;
            }), this.props.removingSubjects.map(function (s) {
                return s._id;
            }));
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            return _react2.default.createElement(
                _reactBootstrap.Modal,
                { show: !!this.props.modifyingBooks.length, onHide: this.props.cancelBookSubjectModification },
                _react2.default.createElement(
                    _reactBootstrap.Modal.Header,
                    { closeButton: true },
                    _react2.default.createElement(
                        _reactBootstrap.Modal.Title,
                        null,
                        'Edit subjects for:',
                        _react2.default.createElement(
                            'div',
                            null,
                            this.props.modifyingBooks.map(function (book) {
                                return _react2.default.createElement(
                                    'h5',
                                    { key: book._id },
                                    book.title
                                );
                            })
                        )
                    )
                ),
                _react2.default.createElement(
                    _reactBootstrap.Modal.Body,
                    null,
                    _react2.default.createElement(Example, null),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            _bootstrapButton2.default,
                            { preset: 'primary-xs', className: 'pull-right', onClick: this.props.subjectModificationClearSubjects },
                            'Reset subjects'
                        )
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'b',
                            null,
                            'Add'
                        ),
                        ' ',
                        this.props.addingSubjects.map(function (subject) {
                            return _react2.default.createElement(
                                'span',
                                { className: 'label label-primary', style: { marginRight: 5, display: 'inline-block' }, key: subject._id },
                                subject.name
                            );
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'panel panel-default', style: { maxHeight: 150, overflow: 'scroll' } },
                        _react2.default.createElement(
                            'div',
                            { className: 'panel-body', style: { paddingTop: 0 } },
                            this.props.allSubjectsSorted.map(function (s) {
                                return _react2.default.createElement(
                                    'div',
                                    { className: 'checkbox', key: s._id },
                                    _react2.default.createElement(
                                        'label',
                                        null,
                                        _react2.default.createElement('input', { type: 'checkbox', checked: !!_this4.props.addingSubjectIds[s._id], onChange: function onChange() {
                                                return _this4.props.toggleSubjectModificationAdd(s._id);
                                            } }),
                                        ' ',
                                        s.name
                                    )
                                );
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'b',
                            null,
                            'Remove'
                        ),
                        ' ',
                        this.props.removingSubjects.map(function (subject) {
                            return _react2.default.createElement(
                                'span',
                                { className: 'label label-primary', style: { marginRight: 5, display: 'inline-block' }, key: subject._id },
                                subject.name
                            );
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'panel panel-default', style: { maxHeight: 150, overflow: 'scroll' } },
                        _react2.default.createElement(
                            'div',
                            { className: 'panel-body', style: { paddingTop: 0 } },
                            this.props.allSubjectsSorted.map(function (s) {
                                return _react2.default.createElement(
                                    'div',
                                    { className: 'checkbox', key: s._id },
                                    _react2.default.createElement(
                                        'label',
                                        null,
                                        _react2.default.createElement('input', { type: 'checkbox', checked: !!_this4.props.removingSubjectIds[s._id], onChange: function onChange() {
                                                return _this4.props.toggleSubjectModificationRemove(s._id);
                                            } }),
                                        ' ',
                                        s.name
                                    )
                                );
                            })
                        )
                    )
                ),
                _react2.default.createElement(
                    _reactBootstrap.Modal.Footer,
                    null,
                    _react2.default.createElement(
                        _ajaxButton2.default,
                        { preset: 'primary', running: this.props.settingBooksSubjects, runningText: 'Setting', onClick: function onClick() {
                                return _this4.setBooksSubjects();
                            } },
                        'Set'
                    ),
                    _react2.default.createElement(
                        _bootstrapButton2.default,
                        { preset: '', onClick: this.props.cancelBookSubjectModification },
                        'Cancel'
                    )
                )
            );
        }
    }]);

    return BookSubjectSetterDesktopUnConnected;
}(_react2.default.Component);

var BookSubjectSetterDesktop = (0, _reactRedux.connect)(_reducer.booksSubjectsModifierSelector, _extends({}, bookSubjectActionCreators))(BookSubjectSetterDesktopUnConnected);

exports.default = BookSubjectSetterDesktop;