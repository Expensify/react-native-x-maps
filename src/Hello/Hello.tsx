import {View, Text} from 'react-native';
import {HelloProps} from './HelloProps';

function HelloComponent({name}: HelloProps) {
    return (
        <View>
            <Text>{`Hello, ${name} on mobile`}</Text>
        </View>
    );
}

export default HelloComponent;
