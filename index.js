import React, { Component } from 'react'
import { TextInput } from 'react-native'


/**
 * # - numbers
 * L - latin
 * C - cyrillic
 * A - all
 */
export default class InputMask extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value || '',
			error: props.error || false
		};
		this.value = props.value || '';
		if(typeof props.regex != 'object') {
			this.formats = [props.regex];
		}
		else {
			this.formats = props.regex;
		}
	}
	buildRegex(format, length) {
		let res = '';
		const regexData = {
			'A': '[0-9a-zA-Zа-яА-ЯёЁ]{1}',
			'#': '[0-9]{1}',
			'C': '[а-яА-ЯёЁ]{1}',
			'L': '[a-zA-Z]{1}',
			'*': '.{1}'
		};
		const formatArr = format.split('');
		let expression = (i) => i < length && i < formatArr.length;
		if(length === null) {
			expression = (i) => i < formatArr.length;
		}

		for(let i = 0; expression(i); i++) {
			if(typeof regexData[formatArr[i]] != 'undefined') {
				res += regexData[formatArr[i]];
			}
			else {
				res += regexData['*'];
			}
		}
		return new RegExp('^' + res + '$');
	}
	isMatch(str, isFull = false, byMaxLength = false) {
		let formatResults = [];
		const res = this.formats.filter((format) => {
			let regex = this.buildRegex(format, isFull ? null : str.length);
			const test = regex.test(str);
			formatResults.push(test);
			return test;
		});
		if(byMaxLength) {
			//find largest possible format from this.formats
			const lengths = this.formats.map(format => format.length);
			const maxItem = lengths.indexOf(Math.max.apply(null, lengths));
			return formatResults[maxItem];
		}
		return !!res.length;
	}
	change(text) {
		const isMatch = this.isMatch(text);

		if(isMatch) {
			this.value = text;
		}
		if(this.props.hasOwnProperty('change') && typeof this.props.change == 'function') {
			const isFullMatch = this.isMatch(text, true, true);
			this.props.change(isFullMatch, text);
		}
		this.setState({
			value: this.value,
			error: false
		});
	}
	blur() {
		const isMatch = this.isMatch(this.value, true);
		if(this.props.hasOwnProperty('onBlur') && typeof this.props.onBlur == 'function') {
			this.props.onBlur(isMatch, this.value);
		}
		this.setState({
			error: !isMatch
		});
	}
	render() {
		let errorStyle = {
			backgroundColor: '#FEE8E8',
			color: '#FC2C35'
		};
		if(this.props.errorStyle) {
			errorStyle = this.props.errorStyle
		};
		if(!this.state.error) {
			errorStyle = {}
		};
		let style = this.props.style ? Array.isArray(this.props.style) ? this.props.style : [this.props.style] : [];
		return (
			<TextInput
				{...this.props}
				ref={(ref) => this.props._ref ? this.props._ref(ref) : null}
				style={style.concat(errorStyle)}
				autoCorrect={false}
				onChangeText={(s) => this.change(s)}
				value={this.state.value}
				blur={() => this.blur()}
			/>
		);
	}
}
