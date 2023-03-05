import AsyncStorage from '@react-native-async-storage/async-storage'

const url = 'https://ikdsbxpo4dc2dz2pvmtfng2sly0cxhfk.lambda-url.us-west-1.on.aws'

export const getId = async () => {
    const endpoint = url + '/get-id'
    const key = 'id'

    const storedId = await AsyncStorage.getItem(key)

    if(!storedId) {
        const response = await fetch(endpoint)
        const {id} = await response.json()
        
        if(id === undefined) {
            throw 'id not in response'
        }

        await AsyncStorage.setItem(key, id)
        return id

    } 
        
    return storedId
}

export const getPrefix = async () => {
    const endpoint = url + '/get-prefix'

    const response = await fetch(endpoint)
    const {prefix} = await response.json()

    if(prefix === undefined) {
        throw 'prefix not in response'
    }

    return prefix
}

export const postEvent = async (hostId, title, hostName, fields) => {
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

    const {status, message} = await response.json()

    if(!status) {
        throw 'status not in response'
    }

    if(status === 'error') {
        throw message
    }
}

export const postForm = async (id, hostId, eventTitle, fields) => {
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

    const {status, message} = await response.json()

    if(status === undefined) {
        throw 'no status in response'
    }

    if(status === 'error') {
        throw message
    }
}

export const getEvents = async (hostId) => {
    const endpoint = url + '/get-events?host_id=' + hostId
    
    const response = await fetch(endpoint)
    const {events} = await response.json()
    
    if(events === undefined) {
        throw 'no events in response'
    } 

    return events
}

export const getForms = async (hostId, eventTitle) => {
    const endpoint = url + '/get-forms?host_id=' + hostId + '&event_title=' + eventTitle

    const response = await fetch(endpoint)
    const {forms} = await response.json()

    if(forms === undefined) {
        throw 'no forms in response'
    }

    return forms
}

export const deleteEvent = async (hostId, eventTitle) => {
    const endpoint = url + '/delete-event?host_id=' + hostId + '&event_title=' + encodeURI(eventTitle)

    const response = await fetch(endpoint, {method: 'DELETE'})
    const {status, message} = await response.json()

    if(status === undefined) {
        throw 'status not in response'
    }

    if(status === 'error') {
        throw message
    }
}