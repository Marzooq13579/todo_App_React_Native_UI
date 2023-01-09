import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Task from "../components/Task";
import Icon from "react-native-vector-icons/Entypo";
import { Dialog, Button, TextInput, Title } from "react-native-paper";
import { useDispatch } from "react-redux";
import { addTask, loadUser } from "../redux/action";
import { useSelector } from "react-redux";

const Home = ({ navigation }) => {
  // const tasks = [
  //   { title: "title", description: "description", completed: true, _id: "123" },
  // ];

  const {user} = useSelector(state => state.auth)


  const dispatch = useDispatch();

  const {loading,message,error} = useSelector(state => state.message)

  const [openDialog, setOpenDialog] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const hideDialog = () => {
    setOpenDialog(!openDialog);
  };

  const addTaskHandler = async () => {
    await dispatch(addTask(title, description));
    dispatch(loadUser())
  };

  useEffect(() => {
    if(error){
      alert(error);
      dispatch({type:"clearError"})
    }
    if(message){
      alert(message)
      dispatch({type:"clearMessage"})
    }
  },[error,message,alert,dispatch])

  return (
    <>
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <ScrollView>
          <SafeAreaView>
            <Text style={styles.heading}>All Tasks</Text>
            {user && user.tasks.map((item, index) => (
              <Task
                title={item.title}
                description={item.description}
                status={item.completed}
                taskId={item._id}
                key={item._id}
              />
            ))}

            <TouchableOpacity style={styles.addBtn} onPress={hideDialog}>
              <Icon name="add-to-list" size={20} color="#900" />
            </TouchableOpacity>
          </SafeAreaView>
        </ScrollView>
      </View>
      <Dialog visible={openDialog} onDismiss={hideDialog}>
        <Dialog.Title>Add a Task</Dialog.Title>
        <Dialog.Content>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            onChangeText={setDescription}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={hideDialog}>
              <Text>CANCEL</Text>
            </TouchableOpacity>
            <Button onPress={addTaskHandler} color="#900" disabled={!title || !description || loading}>
              ADD
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    textAlign: "center",
    marginTop: 25,
    marginBottom: 20,
    color: "#fff",
    backgroundColor: "#474747",
  },
  addBtn: {
    backgroundColor: "#fff",
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    alignSelf: "center",
    marginVertical: 20,
    elevation: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 15,
  },
});
