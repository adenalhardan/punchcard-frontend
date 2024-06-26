import React from 'react'
import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import Share from 'react-native-share'
import {Buffer} from 'buffer'
import RNFetchBlob from 'rn-fetch-blob'

const Download = ({title, keys, values}) => {
    const onPress = () => {
        (async () => {
            try {
                const data =  keys.map(key => `"${key}"`).join(',') 
                    + '\n' 
                    + values.map(row => row.map(value => `"${value}"`).join(',')).join('\n')

                const filename = `${title}.csv`
                const path = RNFetchBlob.fs.dirs.DocumentDir + '/' + filename

                await RNFetchBlob.fs.writeFile(path, data)
                await Share.open({url: `file://${path}`, failOnCancel: false})

                await RNFetchBlob.fs.unlink(path)

            } catch(error) {
                console.error(error)
            }
            
        })()
    }

    return (
        <TouchableOpacity style = {styles.container} onPress = {onPress} activeOpacity = {0.5}>
            <LinearGradient colors = {['#5C9DF2', '#1E6FD9', '#0D65D9']} style = {styles.background}>
                <Text style = {styles.text}>Download</Text>
                <Image style = {styles.image} source = {require('./assets/download.png')}/>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default Download

const styles = StyleSheet.create({
    container: {
        width: '48%',
        aspectRatio: 3.7
    },

    background: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    text: {
        fontWeight: '600',
        fontSize: 16,
        color: '#FFFFFF'
    },
    
    image: {
        height: 23,
        width: 23,
        resizeMode: 'contain',
        marginLeft: 8,
        tintColor: '#FFFFFF'
    }
})