import { FlatList, Text, View } from 'react-native'
import React from 'react'
const data = [
    {id: 1, name: 'John', email: 'john@gmail.com'},
    {id: 2, name: 'Bob', email: 'bob@gmail.com'},
    {id: 3, name: 'Mei', email: 'mei@gmail.com'},
    {id: 4, name: 'Steve', email: 'steve@gmail.com'}
]
const TableTwo = () => {
    const item = ({ item }) => (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 50, backgroundColor: 'lightyellow'}}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>{item.id}</Text>
            </View>
            <View style={{ width: 400, backgroundColor: 'lightpink'}}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>{item.name}</Text>
            </View>
            <View style={{ width: 400, backgroundColor: 'lavender'}}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>{item.email}</Text>
            </View>
        </View>
    )
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '10%'}}>
            <FlatList data={data} renderItem={item} keyExtractor={item => item.id.toString()} />
        </View>
    )
}

export default TableTwo