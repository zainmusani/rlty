import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, Image} from '../../components';
import {Colors, Fonts, Images} from '../../theme';
import styles from './AccordionStyles';
export default function AccordionView(props) {
  const {accordion, expanded, data, title, toggleExpand} = props;
  return (
    <View style={expanded ? styles.containerExpanded : styles.container}>
      <TouchableOpacity
        ref={accordion}
        style={expanded ? styles.rowExpanded : styles.row}
        onPress={toggleExpand}>
        <Text
          size={Fonts.size.xvi}
          color={expanded ? Colors.text.primary : Colors.text.secondary}
          type={expanded ? 'semi_bold' : 'regular'}>
          {title}
        </Text>
        <RnImage source={expanded ? Images.arrowUp : Images.arrowDown} />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.child}>
          <Text style={{textAlign: 'justify'}}>{data} </Text>
        </View>
      )}
    </View>
  );
}
