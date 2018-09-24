import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { login } from "../redux/auth/actions";

import Screen from "../components/Screen";
import Text from "../components/Text";
import LoginForm from "../components/forms/LoginForm";

class Login extends Component {
  onSubmit = async values => {
    const { navigation, callLogin } = this.props;
    const fromCart = navigation.getParam("fromCart");

    await callLogin(values);

    const { currentUserState } = this.props;

    if (currentUserState.success) {
      if (fromCart) {
        navigation.navigate("Cart");
      } else {
        navigation.navigate("CategoryList");
      }
    }
  };

  render() {
    const { navigation, loginState } = this.props;

    return (
      <Screen
        style={{
          paddingHorizontal: 16,
          justifyContent: "center",
        }}
      >
        {!!loginState.error.message && (
          <Text
            error
            style={{
              textAlign: "center",
            }}
          >
            {loginState.error.message}
          </Text>
        )}

        <LoginForm onSubmit={this.onSubmit} navigation={navigation} loading={loginState.loading} />

        <TouchableOpacity
          style={{
            marginTop: 30,
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("RegisterPersonInfo")}
        >
          <Text>New to PhotoBook? Sign up!</Text>
        </TouchableOpacity>
      </Screen>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  callLogin: PropTypes.func.isRequired,
  loginState: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.shape({}).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  loginState: state.auth.login,
  currentUserState: state.auth.currentUser,
});

export default connect(
  mapStateToProps,
  { callLogin: login }
)(Login);
