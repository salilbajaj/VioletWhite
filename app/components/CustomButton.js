// import React from "react";
// import { ActivityIndicator, StyleSheet, Text, AppRegistry } from "react-native";
// import { View } from "react-native-animatable";

// import TouchableView from "./TouchableView";
// import { Navigation } from "react-native-navigation";
// const CustomButton = ({
//   onPress,
//   isEnabled,
//   isLoading,
//   text,
//   buttonStyle,
//   textStyle,
//   ...otherProps
// }) => {
//   const onButtonPress = isEnabled && !isLoading ? onPress : () => null;

//   return (
//     <View {...otherProps}>
//       <TouchableView
//         onPress={onButtonPress}
//         style={[styles.button, buttonStyle]}
//       >
//         {isLoading && (
//           <ActivityIndicator style={styles.spinner} color={"grey"} />
//         )}
//         {!isLoading && <Text style={[styles.text, textStyle]}>{text}</Text>}
//       </TouchableView>
//     </View>
//   );
// };

// CustomButton.defaultProps = {
//   onPress: () => null,
//   isEnabled: true,
//   isLoading: false
// };

// const styles = StyleSheet.create({
//   button: {
//     height: 37,
//     borderWidth: 1,
//     borderRadius: 3,
//     alignSelf: "stretch",
//     justifyContent: "center",
//     borderColor: "rgba(0, 0, 0, 0.1)"
//   },
//   spinner: {
//     height: 26
//   },
//   text: {
//     textAlign: "center",
//     fontWeight: "400",
//     color: "white"
//   }
// });
// Navigation.registerComponent("GoVioletWhite.CustomButton", () => CustomButton);
// export default CustomButton;
