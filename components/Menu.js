import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Button
} from 'react-native';

const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
});

export default function Menu({ onItemSelected, filterOptions }) {
  function test(category, value){
    filterOptions = {
      name: 'Ani',
      time_start: 0,
      time_end: 0,
      level: 0,
    };
    console.log(filterOptions[category]);
    onItemSelected(filterOptions)
  }
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <Button
        onPress={() => test('name', 'Ani')}
        title="plz"
      />
    </ScrollView>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
