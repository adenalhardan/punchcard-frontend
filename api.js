import AsyncStorage from '@react-native-async-storage/async-storage'

const url = 'https://ikdsbxpo4dc2dz2pvmtfng2sly0cxhfk.lambda-url.us-west-1.on.aws'

export const getId = async (onError) => {
    const endpoint = url + '/get-id'
    const key = 'id'

    try {
        const storedId = await AsyncStorage.getItem(key)

		if(storedId === null) {
			const response = await fetch(endpoint)
			const {id} = await response.json()
            
            if(id === null) {
                onError("id not in response")
            } else {
                await AsyncStorage.setItem(key, id)
                return id
            }

		} else {
            return storedId
        }

    } catch(error) {
        onError(error.message)
    }
}

export const getPrefix = async (onError) => {
    const endpoint = url + '/get-prefix'

    try {
		const response = await fetch(endpoint)
		const {prefix} = await response.json()

        if(prefix === null) {
            onError("prefix not in response")
        } else {
            return prefix
        }

    } catch(error) {
        onError(error.message)
    }
}

export const postEvent = (hostId, title, hostName, fields, onError, onSuccess) => {
    (async () => {
        try {
            const endpoint = url + '/post-event'

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    host_id: hostId,
                    title: title,
                    host_name: hostName,
                    fields: fields
                })
            })

            const json = await response.json()

            if(json.status === 'error') {
                onError(json.message)
            } else if(json.status === 'success') {
                onSuccess()
            }

        } catch(error) {
            onError(error.message)
        }
    })()
}

export const postForm = (id, hostId, eventTitle, fields, onError, onSuccess) => {
    (async () => {
        try {
            const endpoint = url + '/post-form'

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: id,
                    host_id: hostId,
                    event_title: eventTitle,
                    fields: fields
                })
            })

            const json = await response.json()

            if(json.status === 'error') {
                onError(json.message)
            } else if(json.status === 'success') {
                onSuccess()
            }

        } catch(error) {
            onError(error.message)
        }
    })()
}