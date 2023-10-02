import React from 'react';
import {
  View,
  Image as RnImage,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Text, Image, CustomNavbar, Accordion} from '../../components';
import HtmlRender from '../../components/htmlRender';
import {lorenIpsum} from '../../constants';
import {AppStyles, Colors, Metrics} from '../../theme';
import styles from './InformationStyles';
export default function InformationView(props) {
  const {tabItems, selectedTabId, setSelectedTabId} = props;
  const {term_and_condition, privacy_policy} = useSelector(state => state.settings.settings[0]);
  const {faqs} = useSelector(state => state.settings);

  return (
    <View style={styles.container}>
      <CustomNavbar title="Information" />
      <View style={[AppStyles.flex, {paddingTop: Metrics.baseMargin}]}>
        <View style={styles.header}>
          {tabItems.map(item => {
            const selected = item.id === selectedTabId;
            return (
              <TouchableOpacity
                onPress={() => setSelectedTabId(item.id)}
                style={[
                  styles.selectedTab,
                  !selected && styles.tabTransparent,
                ]}>
                <Text
                  color={selected ? 'white' : Colors.text.primary}
                  type={selected ? 'bold' : 'regular'}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[AppStyles.pTop20]}>
          <>
            {selectedTabId === 3 && faqs?.map(obj => (
              <Accordion
                title={obj?.question}
                data={obj?.answer}
              />
            ))}
            {(selectedTabId === 1) && (
              <View style={[AppStyles.pLeft20, AppStyles.pRight20]}>
                <HtmlRender source={{html: term_and_condition}} />
              </View>
            )}
            {(selectedTabId === 2) && (
              <View style={[AppStyles.pLeft20, AppStyles.pRight20]}>
                <HtmlRender source={{html: privacy_policy}} />
              </View>
            )}
          </>
        </ScrollView>
      </View>
    </View>
  );
}
