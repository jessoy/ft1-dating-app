export const types = {
  DELETE_MESSAGE: "DELETE_MESSAGE",
  BLOCK_USER: "BLOCK_USER",
  SET_USER_INPUT: "SET_USER_INPUT",
  ADD_MESSAGE: "ADD_MESSAGE",
  ADD_USER: "ADD_USER",
  ADD_TO_SEEN: "ADD_TO_SEEN", // adds foreign id to users seen array
  SET_SCREEN: "SET_SCREEN", // changes screen 0= onboarding, 1= matches screen, 2= messages
  SET_ONBOARDING_SCREEN: "SET_ONBOARDING_SCREEN",
  SET_REGISTER_SCREEN: "SET_REGISTER_SCREEN",
  ON_INPUT_REG: "ON_INPUT_REG",
  ADD_TO_LIKES: "ADD_TO_LIKES", // adds foreign id to users seen array when liked
  UPDATE_MATCHES: "UPDATE_MATCHES", // if two users like eachother, adds each id to other's matches array
  SET_REG_ERRORS: "SET_REG_ERRORS",
  SET_FILTER_OPTIONS: "SET_FILTER_OPTIONS",
  SET_CURRENT_USER_ID: "SET_CURRENT_USER_ID",
  SET_LOGGED_IN_STATUS: "SET_LOGGED_IN_STATUS",
  LOG_OUT: "LOG_OUT",
  BYPASS_ONBOARDING: "BYPASS_ONBOARDING", // changes screen value to matches screen, sets current user id to 38, sets logged in as true
  GET_USER_MESSAGES: "GET_USER_MESSAGES",
  GET_ALL_USERS: "GET_ALL_USERS", // this is for the API to go and get the users
  SET_ALL_USERS: "SET_ALL_USERS", // redux - set all users and send to store
  SET_ALL_MESSAGES: "SET_ALL_MESSAGES", // redux - set all messages and send to store
  GET_TOKEN: "GET_TOKEN",
  SET_TOKEN: "SET_TOKEN"
};
