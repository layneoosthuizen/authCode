import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('screen').width,
        backgroundColor: '#03fcdf',
        paddingVertical: 60
    },
    h1: {
        flex: 1,
        fontFamily: 'normal',
        fontWeight: 'normal',
        fontSize: 40,
        alignSelf: 'center',
        textAlign: 'center',
    },
    h2: {
        flex: 1,
        fontFamily: 'normal',
        fontWeight: 'normal',
        fontSize: 35,
        alignSelf: 'center',
        textAlign: 'center',
    },
    h3: {
        flex: 1,
        fontFamily: 'normal',
        fontWeight: 'normal',
        fontSize: 30,
        alignSelf: 'center',
        textAlign: 'center',
    },
    narrative: {
        fontFamily: 'normal',
        fontWeight: 'normal',
        fontSize: 20,
        alignSelf: 'center',
        textAlign: 'center',
    },
    headerImg: {
        resizeMode: 'contain',
        width: '100%',
    },
    btn1: {
        elevation: 8,
        backgroundColor: '#037bfc',
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    btn1Txt: {
        fontFamily: 'normal',
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
    btn2: {
        elevation: 8,
        backgroundColor: '#f7690a',
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    btn2Txt: {
        fontFamily: 'normal',
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    loginInp: {
        height: 40,
        width: 300,
        borderColor: '#037bfc',
        borderWidth: 2,
        alignSelf: 'center',
        padding: 10,
    },
    spacer: {
        height: 10,
        width: '100%',
    },
    logout: {
        fontFamily: 'normal',
        fontSize: 20,
        color: "#fa0c0c",
        fontWeight: "normal",
        alignSelf: "center",
    },
    settings: {
        flex: 1,
        textAlign: 'right'
    },
    washerChk: {
        marginLeft:20,
        flexDirection: 'row'
    },
    ownerChk: {
        flexDirection: 'row'    
    }
});

export default styles;
