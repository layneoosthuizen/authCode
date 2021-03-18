import firebase from "firebase";
import 'firebase/firestore';

const firebaseConfig={
    apiKey: "AIzaSyDjmUMeUg_3eoIbeVCCpFrtiwBSt8D987g",
    authDomain: "codebase-fc7dd.firebaseapp.com",
    projectId: "codebase-fc7dd",
    storageBucket: "codebase-fc7dd.appspot.com",
    messagingSenderId: "911113701549",
    appId: "1:911113701549:web:0926851644b66b1aa65e24"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}else {
    firebase.app();
}

firebase.firestore().settings({ experimentalForceLongPolling: true });
export const db = firebase.firestore()

// db.settings({
//     timestampsInSnapshots: true
// })

export default firebase;