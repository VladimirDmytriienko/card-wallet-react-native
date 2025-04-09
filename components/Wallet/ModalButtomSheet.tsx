
import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  PanResponder,
  PanResponderGestureState,
  Modal,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const { height } = Dimensions.get('window');
const MODAL_HEIGHT = height * 0.5;

interface Props {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalBottomSheet: React.FC<Props> = ({ isVisible, onClose, children }) => {
  const translateY = useSharedValue(MODAL_HEIGHT);
  const overlayOpacity = useSharedValue(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState: PanResponderGestureState) => {
        if (gestureState.dy > 0) {
          translateY.value = gestureState.dy;
        }
      },
      onPanResponderRelease: (_, gestureState: PanResponderGestureState) => {
        if (gestureState.dy > MODAL_HEIGHT / 4) {
          translateY.value = withTiming(MODAL_HEIGHT, {}, () => runOnJS(onClose)());
          overlayOpacity.value = withTiming(0);
        } else {
          translateY.value = withSpring(0);
        }
      },
    })
  ).current;

  useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(0);
      overlayOpacity.value = withTiming(1);
    } else {
      translateY.value = withTiming(MODAL_HEIGHT);
      overlayOpacity.value = withTiming(0);
    }
  }, [isVisible]);

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  if (!isVisible) return null;

  return (
    <Modal visible={isVisible} transparent >
      <View style={StyleSheet.absoluteFill}>
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[styles.overlay, overlayStyle]} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[styles.modal, modalStyle]}
          {...panResponder.panHandlers}
        >
          <View style={styles.handle} />
          {children}
        </Animated.View>
      </View>
    </Modal>

  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 3,
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    height: MODAL_HEIGHT,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 30,
    zIndex: 3,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 4,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default ModalBottomSheet;
