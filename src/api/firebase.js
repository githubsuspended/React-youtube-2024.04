import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider,
  signInWithPopup, signOut, updateProfile, signInWithEmailAndPassword,
  onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";
import { v4 as uuid } from 'uuid';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

export function register({ email, password, name, photo }) {
  console.log('firebase:register():', email, password);
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
      })
    })
    .then(() => {logout()})
    .catch(console.error);
}

export function login({ email, password }) {
  console.log('firebase.js:login(): ', email, password);
  signInWithEmailAndPassword(auth, email, password)
    .catch(console.error);
}

export function loginWithGithub() {
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .catch(console.error);
}

export function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider)
  // signInWithPopup(auth, provider)
    .catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChanged(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user) {
  return get(ref(database, 'admins'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        // console.log(admins);
        const isAdmin = admins.includes(user.uid);
        return {...user, isAdmin};
      }
      return user;
    });
}

export async function addWatchVideoRecord({ user, video }) {
  const id = uuid();
  return set(ref(database, `videoRecords/${id}`), {
    id, userId:user.uid, userName:user.displayName,
    videoId:video.id, title:video.snippet.title, channel:video.snippet.channelTitle,
    thumbnailUrl: video.snippet.thumbnails.medium.url, 
    watchAt: new Date().toISOString()
  });
}

export async function getWatchVideoRecord() {
  return get(ref(database, 'videoRecords'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        let records = Object.values(objects);   // object를 array로 변환
        records = records.sort((a, b) => b.watchAt.localeCompare(a.watchAt));   // 내림차순 정렬
        const newRecords = records.filter((record, idx) => {    // 중복 제거
          return (
            records.findIndex(eachRecord => {
              return (record.videoId === eachRecord.videoId && record.userId === eachRecord.userId)
            }) === idx
          ) 
        });
        const result = Object.groupBy(newRecords, ({ userName }) => userName);    // Grouping
        return result;
      }
      return null;
    });  
}

/*
export async function getWatchVideoRecord(userId) {
  return get(ref(database, 'videoRecords'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        let records = Object.values(objects);   // object를 array로 변환
        records = records.filter(record => record.userId === userId);   // userId 필터링
        records = records.sort((a, b) => b.watchAt.localeCompare(a.watchAt));   // 내림차순 정렬
        const newRecords = records.filter((record, idx) => {    // 중복 제거
          return (
            records.findIndex(eachRecord => {
              return record.videoId === eachRecord.videoId
            }) === idx
          ) 
        });
        return newRecords;
      }
      return null;
    });
}

export async function getTotalWatchVideoRecordByUser() {
  return get(ref(database, 'videoRecords'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        let records = Object.values(objects);   // object를 array로 변환
        records = records.sort((a, b) => b.watchAt.localeCompare(a.watchAt));   // 내림차순 정렬
        const newRecords = records.filter((record, idx) => {    // 중복 제거
          return (
            records.findIndex(eachRecord => {
              return (record.videoId === eachRecord.videoId && record.userId === eachRecord.userId)
            }) === idx
          ) 
        });
        const result = Object.groupBy(newRecords, ({ userName }) => userName);    // Grouping
        return result;
      }
      return null;
    });
}
*/

export async function getWatchVideoCount(userId) {
  return get(ref(database, 'videoRecords'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        const records = Object.values(objects)
          .filter(record => record.userId === userId);   // userId 필터링
        const newRecords = records.filter((record, idx) => {    // 중복 제거
          return (
            records.findIndex(eachRecord => {
              return record.videoId === eachRecord.videoId
            }) === idx
          ) 
        });
        // console.log(newRecords.length);
        return newRecords.length;
      }
      return 0;
    });  
}
