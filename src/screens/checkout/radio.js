import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp} from 'react-native-responsive-screen'
export default class RadioButtons extends Component {
	state = {
		value: null,
	};

	render() {
		const { options } = this.props;
		const { value } = this.state;

		return (
			<View>
				{options.map(item => {
					return (
						<View key={item.key} style={styles.buttonContainer}>
							<TouchableOpacity
								style={styles.circle}
								onPress={() => {
									this.props.handlechange('payment_option',item.text)
								}}
							>
								{value === item.key && <View style={styles.checkedCircle} />}
							
							
							</TouchableOpacity>
											<Text style={{left:wp('10%')}}>{item.text}</Text>

						</View>
					)
				})
				}
				</View>
		)
	}
}

const styles = StyleSheet.create({
	buttonContainer: {

		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 30,
	},

	circle: {
		height: 20,
		width: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#ACACAC',
		alignItems: 'center',
		justifyContent: 'center',
	},
  
	checkedCircle: {
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor: '#794F9B',
	},
});
