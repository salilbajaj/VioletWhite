var React = require("react");
var ReactNative = require("react-native");
var { Component } = React;
var {
  StyleSheet,
    Animated,
    Text,
    View,
    Image,
    TextInput,
    TabBarIOS,
    TouchableHighlight,
    CameraRoll,
    NativeModules,
    ActivityIndicator,
    DeviceEventEmitter,
    ScrollView
} = ReactNative;
import Dimensions from "Dimensions";
import Constants from "../common/Constants";
import { Navigation } from "react-native-navigation";
const devWidth = Dimensions.get("window").width;
const devHeight = Dimensions.get("window").height;
var Feed = require("./Feed");
var Daily = require("./Daily");
var Button = require("react-native-button");
var RNUploader = NativeModules.RNUploader;

class About extends Component {
    static navigatorStyle = {
        navBarTextColor: "#fff",
        navBarBackgroundColor: Constants.appColor,
        navBarTranslucent: true,
        navBarButtonColor: '#FFFFFF',
    };
    constructor(props) {
        super(props);


    }
    componentWillMount() { }
    componentDidMount() {

    }
    render() {
        return (
            <ScrollView style={styles.whiteContainer}>
                <Animated.View style={styles.tile}>
                    <View style={{ paddingTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.title}>The Thought</Text>
                    </View>
                    <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.textBlock}>“Happiness is a state of mind in which you feel satisfied and content. It is a spiritual experience not linked with your material possession, your power, your position or even your success.” This realization dawned on Google’s CFO Patrick Pichette on a fine morning while he was watching the Sun’s rays bathe the upper ranges of Mt Kilimanjaro in Tanzania and wondered, if he along with his wife could enjoy this bliss for the rest of their lives. The thought stayed with him until he quit the job to pursue happiness.</Text>
                    </View>
                </Animated.View>
                <Animated.View style={styles.tile}>
                    <View style={{ paddingTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.title}> The Idea
</Text>
                    </View>
                    <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.textBlock}>What does it really mean to be happy? Happiness is a feeling that can change the course of your day, and many a times, your life too. It is the single best emotion that can be shared and communicated across geographies, race, religion, and ethnicities. It does not need a language to be understood. Yet, since ages, it’s been undervalued when stacked up against virtues like money, fame, power and the like.  We wanted happiness to become a way of being, for it to come naturally to everyone. Thus, GoVioletWhite was born.
</Text>
                    </View>
                </Animated.View>
                <Animated.View style={styles.tile}>
                    <View style={{ paddingTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.title}>Who We Are
</Text>
                    </View>
                    <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.textBlock}>We are an ever-growing community of like-minded people who want to spread more positivity, love and happiness in the world. Each member of our community believes in the power of happiness and its ability to bring about a promising change in our society. Passion, love and unfathomable dedication to making our lives happy, has brought each one of us to this platform.
</Text>
                    </View>
                </Animated.View>
                <Animated.View style={styles.tile}>
                    <View style={{ paddingTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.title}>What We Do

</Text>
                    </View>
                    <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.textBlock}>We at GoVioletWhite firmly believe that you don’t need an excuse to greet an unknown person with a cheery smile. To enjoy the early morning sun. Or an equally good rainy day. To hug someone when they are low. To laugh at our mistakes. An at our fortunes. To celebrate life. We believe in starting out with making small positive contributions to the lives of everyone around us and in turn, in our own lives too. It may be something as simple as pulling a chair, or opening a door, or even singing out loud, not be trapped by societal inhibitions, and truly be happy. A random act of kindness is what we intend to accomplish to enrich and enlighten our everyday lives. Let’s come together and make this world a truly happy place.

</Text>
                    </View>
                </Animated.View>
            </ScrollView>
        );
    }
}

var styles = StyleSheet.create({
    whiteContainer: {
        backgroundColor: "#fff",
        padding: 5,
        flex: 1
    },
    tile: {
        width: devWidth - 30,
        flex: 1,
        borderWidth: 2,
        borderColor: "#f5f5f5",
        marginBottom: 10,
        alignSelf: "center",
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowColor: "rgba(0,0,0,.4)",
        shadowOpacity: 0.3
    },
    textBlock: {
        fontSize: 15,
        color: '#333',
        lineHeight: 25,
    },
    title: {
        color: '#000',
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 30,
    },
    uploadContainer: {
        height: devHeight / 6,
        borderBottomWidth: 0.8,
        borderBottomColor: "#f5f5f5"
    },
    inputStyle: {
        height: 50
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        height: devHeight / 7 - 55,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        paddingBottom: 5
    },
    uploadButtons: {
        flexGrow: 1,
        alignItems: "center",
        padding: 2
    },
    buttons: {
        alignSelf: "stretch",
        borderWidth: 1,
        padding: 7,
        alignItems: "center"
    },
    loader: {
        flex: 1,
        margin: 10,
        justifyContent: "center"
    },
    textCont: {
        width: devWidth - 30,
        alignSelf: "center",
        marginTop: 20,
        padding: 10
    },
    headline: {
        fontSize: 20,
        backgroundColor: "rgba(0,0,0,0)",
        color: "#fff",
        fontWeight: "bold"
    }
});

Navigation.registerComponent("GoVioletWhite.About", () => About);
module.exports = About;
