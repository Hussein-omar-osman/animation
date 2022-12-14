import {Dimensions, StatusBar, StyleSheet, Switch} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

const SIZE = Dimensions.get('window').width * 0.7;

const Colors = {
  dark: {
    background: '#1e1e1e',
    circle: '#252525',
    text: '#f8f8f8',
  },
  light: {
    background: '#f8f8f8',
    circle: '#fff',
    text: '#1e1e1e',
  },
};

const SWITCH_TRACK_COLOR = {
  true: 'rgba(256,0,256,0.2)',
  false: 'rgba(0,0,0,0.1)',
};

type ThemeType = 'light' | 'dark';

const Theme = () => {
  const [themeState, setThemeState] = useState<ThemeType>('light');
  const progress = useDerivedValue(
    () => (themeState === 'dark' ? withTiming(1) : withTiming(0)),
    [themeState],
  );

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background],
    );
    return {backgroundColor};
  });

  const rCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle],
    );
    return {backgroundColor};
  });

  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text],
    );
    return {color};
  });

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <Animated.Text style={[styles.text, rTextStyle]}>Theme</Animated.Text>
      <Animated.View style={[styles.circle, rCircleStyle]}>
        <Switch
          value={themeState === 'dark'}
          onValueChange={toggled => {
            setThemeState(toggled ? 'dark' : 'light');
          }}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor={'violet'}
        />
      </Animated.View>
      <StatusBar
        barStyle={themeState === 'light' ? 'dark-content' : 'light-content'}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: SIZE,
    height: SIZE,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZE / 2,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 60,
    fontWeight: '700',
    letterSpacing: 14,
    marginBottom: 35,
  },
});

export default Theme;
