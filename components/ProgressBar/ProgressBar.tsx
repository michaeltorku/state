import React, {useRef, useState} from 'react';
import { View, Text, StyleSheet, Button, PanResponder, Dimensions, TouchableOpacity, GestureResponderEvent, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';


interface ProgressBarProps {
    amount : number,
    skillName: string
}


const ProgressBar:React.FC<ProgressBarProps> = ({skillName, amount}) => {
    const [progress, setProgress] = useState(amount);
    const barWidth = Dimensions.get('window').width; // 90% of screen width
    const intervalId = useRef<number | null>(null);
        

    const handlePressIn = (increment: boolean) => {
    // Trigger haptic feedback immediately
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    // Start interval for continuous progress updates
    if (intervalId.current === null) {
      intervalId.current = window.setInterval(() => {
        setProgress((prev) => {
          const newProgress = increment
            ? Math.min(100, prev + 1)
            : Math.max(0, prev - 1);
          if (newProgress !== prev) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // Trigger haptic feedback for each step
          }

          return newProgress;
        });
      }, 100); // Adjust interval time as needed
    }
  };

    const handlePressOut = () => {
    // Clear the interval when the press ends
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  // PanResponder to handle drag gestures
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      // Calculate new progress based on gesture location
      
      const touchX = Math.min(Math.max(gestureState.moveX, 0), barWidth);
      const newProgress = Math.round((touchX / barWidth) * 100);
      setProgress(newProgress);
    },
  });

  const computeColor = (lvl:number) =>{
    if (lvl <= 25){
      return 'red';
    }else if (lvl >= 90){
      return 'purple';
    }else if (lvl >= 75){
      return 'blue';
    }
    return 'white';
  };
    return (
        <View style={[styles.container, styles.shadowBox]} >
          <View style={styles.skillBox}>
            <Text style={styles.skillName}>{skillName}</Text>
          </View>
        <View style={[styles.bar, styles.shadow]} {...panResponder.panHandlers}>
            <Text style={[styles.progressText, {color: `${computeColor(progress)}`}]}>{progress}%</Text>
            <View style={styles.textContainer}>
        </View>
            <View style={[styles.fill, {width: `${progress}%`}]} />
            
        </View>
        <View style={styles.buttonBox}>
            <Pressable style={styles.button} onPressIn={()=> handlePressIn(false)} onPressOut={handlePressOut}>
                <Text>-</Text>
            </Pressable>  
            <Pressable style={styles.button} onPressIn={()=> handlePressIn(true)} onPressOut={handlePressOut}>
                    <Text>+</Text>
            </Pressable>  
        </View>
        </View>
    )
}


const styles = StyleSheet.create({
    skillName:{
      color:'black',
      fontWeight: 300
    },
    skillBox:{
      width: 'auto', 
      height: 'auto',
      position: 'relative',
      marginBottom: 5,
      alignSelf: 'flex-start',
      left: 1,
      padding: 3,
      paddingHorizontal: 7,
      backgroundColor: "rgba(30, 144, 255, 0.4)", // DodgerBlue with 60% opacity
      borderRadius: 15,
    },
    shadowBox: {
    width: 'auto',
    padding: 10,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,

    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Shadow for Android
    elevation: 5,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
    button:{
        backgroundColor: '#b4eeb4',
        paddingHorizontal: 8,
        marginTop: 2,
        // borderWidth: 1,
        borderRadius: 4
    },
    container: {
        margin: 5,
        marginBottom: 20,
    },
    red: {
        color: 'red'
    },
    blue: {
        color: 'blue'
    },
    bar: {
        width: 300,
        height: 25,
        display: 'flex',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 15,
        overflow: 'hidden',

    },
    fill:{
        backgroundColor: '#9370DB',
        height: '100%',
        
    },
    buttonBox:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',         // Center buttons vertically if needed
      width: '85%',                // Make sure the container spans the full width
      // paddingHorizontal: 16,
    },
    textContainer: {
        // margin: 'auto',
        position: 'absolute', 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressText: {
        position: 'absolute',
        width: '100%',
        height: 'auto',
        textAlign: 'center',
        fontWeight: 'bold',
        top: 2.5,
        zIndex: 1,
    },
    
});

export default ProgressBar;