import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native-animatable";
import Constants from "../../common/Constants";
//import CustomButton from "../../components/CustomButton";
import metrics from "../../config/metrics";
var { FBLogin, FBLoginManager } = require("react-native-facebook-login");
import FBLoginView from "../../common/FBloginView";
import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin";

export default class Opening extends Component {
  constructor(props) {
    super(props);

    this._signIn = this._signIn.bind(this);
  }
  componentDidMount() {
    FBLoginManager.logout(data => { });
    this._setupGoogleSignin();
    this._signOut();
  }
  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        iosClientId:
          "176436943209-2jfvhafpqe055i6pj8087joqmg9bglnb.apps.googleusercontent.com",

        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();

      this.setState({ user });
    } catch (err) { }
  }
  _signIn() {
    GoogleSignin.signIn()
      .then(user => {
        this.setState({ user: user });
        this.props.onGoogleLogin(user);
      })
      .catch(err => {
        //  console.log("WRONG SIGNIN", err);
      })
      .done();
  }
  _signOut() {
    GoogleSignin.revokeAccess()
      .then(() => GoogleSignin.signOut())
      .then(() => {
        this.setState({ user: null });
      })
      .done();
  }

  render() {
    var _this = this;

    return (
      <View style={styles.container}>
        <View animation={"zoomIn"} delay={600} duration={400}>
          <TouchableOpacity
            onPress={this.props.onCreateAccountPress}
            style={styles.buttons}
          ><Text style={{ color: '#fff' }}>Create Account</Text>
          </TouchableOpacity>
        </View>
        <View
          style={styles.separatorContainer}
          animation={"zoomIn"}
          delay={700}
          duration={400}
        >
          <View style={styles.separatorLine} />
          <Text style={styles.separatorOr}>{"Or"}</Text>
          <View style={styles.separatorLine} />
        </View>
        <View animation={"zoomIn"} delay={800} duration={400}>
          <TouchableOpacity
            style={styles.buttons}

            onPress={this.props.onSignInPress}

          >
            <Text style={{ color: '#fff' }}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View
          style={styles.separatorContainer}
          animation={"zoomIn"}
          delay={700}
          duration={400}
        >
          <View style={styles.separatorLine} />
          <Text style={styles.separatorOr}>{"Or"}</Text>
          <View style={styles.separatorLine} />
        </View>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "#4267b2",
              width: metrics.DEVICE_WIDTH - 75,
              borderRadius: 3,
              height: 37,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <FBLogin
              ref={fbLogin => {
                this.fbLogin = fbLogin;
              }}
              permissions={["email", "user_friends"]}
              loginBehavior={FBLoginManager.LoginBehaviors.Native}
              onLogin={this.props.onFbLogin}
              onLogout={function () {
                _this.setState({ user: null });
              }}
              buttonView={<FBLoginView />}
              onLoginFound={function (data) {
                _this.setState({ user: data.credentials });
              }}
              onLoginNotFound={function () {
                _this.setState({ user: null });
              }}
              onError={function (data) { }}
              onCancel={function () { }}
              onPermissionsMissing={function (data) { }}
            />
          </View>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorOr}>{"Or"}</Text>
          <View style={styles.separatorLine} />
          <View>
            <GoogleSigninButton
              style={{ width: metrics.DEVICE_WIDTH - 70, height: 48 }}
              onPress={this._signIn}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    height: 37,
    borderWidth: 1,
    borderRadius: 3,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: Constants.appColor
  },
  container: {
    flex: 1,
    marginHorizontal: metrics.DEVICE_WIDTH * 0.1,
    justifyContent: "center"
  },
  createAccountButton: {
    backgroundColor: "#9B9FA4"
  },
  createAccountButtonText: {
    color: "white"
  },
  separatorContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10
  },
  separatorLine: {
    flex: 0.5,
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    borderColor: "#9B9FA4"
  },
  separatorOr: {
    color: "#9B9FA4",
    marginHorizontal: 8
  },
  signInButton: {
    backgroundColor: Constants.appColor
  },
  signInButtonText: {
    color: "white"
  }
});
