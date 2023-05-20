import {useEffect} from 'react'
import {View, Image, StyleSheet, Animated, Easing} from 'react-native'

const Loading = () => {
	const rotate = new Animated.Value(0)

	useEffect(() => {
		Animated.loop(
			Animated.timing(rotate, {
				toValue: 1,
				duration: 3000,
				easing: Easing.linear,
				useNativeDriver: true
			})
		).start()
	}, [])

	return (
		<View style = {styles.container}>
			<Image source = {require('./assets/appIcon.png')} style = {styles.appIcon}/>
			<Animated.Image 
				source = {require('./assets/loading.png')} 
				style = {{...styles.loading, transform: [{
					rotate: rotate.interpolate({
						inputRange: [0, 1],
						outputRange: ['0deg', '360deg']
					})
				}]}}
			/>	
		</View>
	)
}

export default Loading

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EEEEEE',
		justifyContent: 'center',
		alignItems: 'center'
	},

	appIcon: {
		height: 120,
		width: 120,
		resizeMode: 'contain',
	},

	loading: {
		height: 35,
		width: 35,
		resizeMode: 'contain',
		tintColor: '#212427',
		position: 'absolute',
		bottom: '30%'
	}
})