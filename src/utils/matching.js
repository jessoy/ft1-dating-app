import { findDistanceFromLongsAndLats } from "./general";

export const getAge = (user) => {
  const dateString = `${user.personalDetails.dob.year}-${user.personalDetails.dob.months}-${user.personalDetails.dob.day}`;
  let birthDate = new Date(dateString);
  let now = new Date();
  let currentYear = now.getFullYear();
  let userYear = birthDate.getFullYear();
  let age = currentYear - userYear;
  if (now < new Date(birthDate.setFullYear(currentYear))) {
    age--;
  }
  return age;
};

export const getUserById = (id, users) => {
  return users.find(({ userId }) => userId === id);
};

export const getIndexByEmailAndPassword = (emailTest, passwordTest, users) => {
  console.log(emailTest, passwordTest);
  return users.findIndex(
    (user) =>
      user.login.email === emailTest && user.login.password === passwordTest
  );
};

export const getIndexById = (id, users) => {
  // console.log(users, id);
  return users.findIndex(({ userId }) => userId === id);
};

export const getMessageIndexById = (id, messages) => {
  return messages.findIndex(({ messageId }) => messageId === id);
};

export const distanceFilter = (currentUser, user) => {
  // checks if users location is more less than accepted distance
  return distanceCheck(currentUser, user) && distanceCheck(user, currentUser);
};

export const distanceCheck = (user1, user2) => {
  const user1Location = user1.personalDetails.location;
  const user1AcceptedDistance = user1.preferences.acceptedDistance;
  const user2Location = user2.personalDetails.location;
  return (
    findDistanceFromLongsAndLats(user1Location, user2Location) <
    user1AcceptedDistance
  );
};

export const ageFilter = (currentUser, user) => {
  // checks if user1's age is more/less than user2's prefered min/max age

  return ageCheck(currentUser, user) && ageCheck(user, currentUser);
};

export const ageCheck = (user1, user2) => {
  return getAge(user1) >= user2.preferences.age.min &&
    getAge(user1) <= user2.preferences.age.max
    ? true
    : false;
};

export const genderFilter = (currentUser, user) => {
  return (
    currentUser.preferences.gender.includes(user.personalDetails.gender) &&
    user.preferences.gender.includes(currentUser.personalDetails.gender)
  );
};

export const heightFilter = (currentUser, user) => {
  // checks if user1's height is more/less than user2's prefered min/max height
  return heightCheck(currentUser, user) && heightCheck(user, currentUser);
};

export const heightCheck = (user1, user2) => {
  return user1.personalDetails.height >= user2.preferences.height.min &&
    user1.personalDetails.height <= user2.preferences.height.max
    ? true
    : false;
};

// filters out users that are parents from users that don't want parents
export const existingKidsFilter = (currentUser, user) => {
  // have kids?  0: not saying, 1: don't have kids, 2: have kids
  // kids accepted? 0: not sure, 1: no, 2: yes
  return (
    (currentUser.personalDetails.kids === 2 && // user1 has kids, user2 don't mind..
      user.preferences.kidsAccepted !== 1 &&
      (user.personalDetails.kids !== 2 || // & user2 don't have kids.
        (user.personalDetails.kids === 2 && // or: & user2 also has kids and user1 don't mind.
          currentUser.preferences.kidsAccepted !== 1))) ||
    (user.personalDetails.kids === 2 && // same as above, but swap user1 and user2
      currentUser.preferences.kidsAccepted !== 1 &&
      (currentUser.personalDetails.kids !== 2 ||
        (currentUser.personalDetails.kids === 2 &&
          user.preferences.kidsAccepted !== 1))) ||
    (currentUser.personalDetails.kids !== 2 && user.personalDetails.kids !== 2) // neither users have kids
  );
};

export const openToKidsFilter = (currentUser, user) => {
  return (currentUser.preferences.lifeStyle.openToKids === 4 &&
    user.preferences.lifeStyle.openToKids === 1) || // cUser wants kids & user doesn't
    (user.preferences.lifeStyle.openToKids === 4 &&
      currentUser.preferences.lifeStyle.openToKids === 1) // cUser doesn't want kids & user does
    ? false
    : true;
};

// POINTER functions determine which users are displayed first (i.e. match the most) for the current user to review.
export const kidsPointer = (cUserPref, userPref) => {
  // const cUserPref = currentUser.preferences.lifeStyle.openToKids;
  // const userPref = user.preferences.lifeStyle.openToKids;

  // NB: "want/don't want" combo is filtered out in openToKidsFilter
  return cUserPref > 0 && cUserPref === userPref // neither "dont say" and both are same
    ? 10
    : (cUserPref === 3 && userPref === 4) ||
      (cUserPref === 4 && userPref === 3) || // want + open
      (cUserPref === 3 && userPref === 2) ||
      (cUserPref === 2 && userPref === 3) // not sure + open
    ? 5
    : (cUserPref === 1 && userPref === 3) || (cUserPref === 3 && userPref === 1) // dont want + open
    ? -5
    : 0; // either doesn't say, not sure + dont want, not sure + want
};

export const marriageCasualPointer = (cUserPref, userPref) => {
  // const cUserPref = {
  //   marriage: currentUser.preferences.lifeStyle.marriage,
  //   casual: currentUser.preferences.lifeStyle.casual,
  // };
  // const userPref = {
  //   marriage: user.preferences.lifeStyle.marriage,
  //   casual: user.preferences.lifeStyle.casual,
  // };

  return cUserPref.marriage === userPref.marriage &&
    cUserPref.casual === userPref.casual // MC MC, Mc Mc, mC mC
    ? 10
    : (!cUserPref.marriage &&
        cUserPref.casual &&
        userPref.marriage &&
        !userPref.casual) || // mC Mc
      (cUserPref.marriage &&
        !cUserPref.casual &&
        !userPref.marriage &&
        userPref.casual) // Mc mC
    ? -10
    : 5; // MC mC, MC Mc
};

export const religionPointer = (cUserRelig, userRelig) => {
  // const cUserRelig = currentUser.personalDetails.religion;
  // const userRelig = user.personalDetails.religion;

  return cUserRelig === 0 || userRelig === 0 // cUser or user doesn't say
    ? 0
    : cUserRelig === userRelig // both share same religion
    ? 10
    : cUserRelig !== 3 && userRelig !== 3 // both are non-atheist
    ? 5
    : -5; // athiest and religion
};

export const smokersPointer = (cUserPref, userPref) => {
  return cUserPref !== 0 && cUserPref === userPref // users have same pref
    ? 5
    : (cUserPref === 1 && userPref === 3) || (userPref === 1 && cUserPref === 3) // smoke & don't smoke
    ? -5
    : 0; // don't say, sometimes & smoke, sometimes & don't smoke
};

// ensures last seen user is always first displayed
export const lastSeenPointer = (currentUserSeen, userId) => {
  return currentUserSeen[currentUserSeen.length - 1] === userId ? 999 : 0;
};
