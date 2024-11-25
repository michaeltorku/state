import ProgressBar from "@/components/ProgressBar/ProgressBar";
import { Text, View, StyleSheet, TextInput, ScrollView, ImageBackground } from "react-native";
// import { DataAPIClient } from '@datastax/astra-db-ts';


const skills = ['Spirituality', 'Hard Work', 'Focus', 'Mental Strength', 'Time Management', 'Learning', 'Coding', 'Balance']

export default function HomeScreen() {
  console.log("yooo",process.env.EXPO_PUBLIC_API_ENDPOINT, process.env.EXPO_PUBLIC_TOKEN);
//   const client = new DataAPIClient(process.env.EXPO_PUBLIC_TOKEN);

//   const db = client.db(process.env.EXPO_PUBLIC_API_ENDPOINT!, { keyspace: 'blog_data' });
//   const { createClient } = require("@astrajs/rest");

//   async function main() {
//   // create an Astra DB client
//   const astraClient = await createClient({
//     astraDatabaseId: process.env.ASTRA_DB_ID,
//     astraDatabaseRegion: process.env.ASTRA_DB_REGION,
//     applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
//   });
//   console.log("Connection to Astra OK, baseUrl is: " + astraClient.baseUrl);
  
//   const basePath = `/api/rest/v2/namespaces/blog_data/collections/users`;
//   console.log("basePath is: " + basePath + "");

//   // create a new user without a document id
//   const putNewUserRes = await astraClient.post(basePath, {
//     name: "cliff",
//   });rrr
//   console.log("New user without a document ID: ", putNewUserRes.data, putNewUserRes.status);


// }
  // ASTRA_DB_ID
  // ASTRA_DB_REGION
  // ASTRA_DB_APPLICATION_TOKEN
  // main().catch(e => {
  // console.error(e)
  // });

  return (
    //  <ImageBackground 
      // source={require('../assets/images/future.jpg')}
      // style={{
        // flex:1,
        // height: 'auto'
      // }}
    // >
    <ScrollView 
    // style={{backgroundColor:'green', flex:1}}
    >
     
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        overflow: 'scroll',
      }}
    >
      {skills.map((skill, i) => <ProgressBar key={i} skillName={skill} amount={50} />)}
    </View>
    
    </ScrollView>
    // </ImageBackground> 
  );
}


const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});