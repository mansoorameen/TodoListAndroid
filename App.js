import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Keyboard,
  Animated,
  Easing,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function App() {
  const [newTodo, setNewTodo] = useState();
  const [todoList, setTodoList] = useState([]);
  const [checked, setChecked] = useState(0);

  const todoInputHandler = (enteredText) => {
    setNewTodo({
      name: enteredText,
      id: Date.now(),
      isChecked: false,
    });
  };

  const addTodoHandler = () => {
    setTodoList([...todoList, newTodo]);
    setNewTodo("");
    Keyboard.dismiss();
  };

  const clearTodoHandler = () => {
    setTodoList([]);
    setNewTodo();
  };

  let spinValue = new Animated.Value(0);

  // First set up animation
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="I am going to.."
          style={styles.input}
          onChangeText={todoInputHandler}
          value={newTodo?.name}
        />
        <View style={styles.button}>
          <Button title="Add" onPress={addTodoHandler} disabled={!newTodo} />
        </View>
      </View>

      <View style={styles.head}>
        <Text style={styles.heading}>Your Todo List:</Text>

        <Icon
          name="remove"
          size={30}
          color="#bf1313"
          style={{ marginTop: 5, marginLeft: 35 }}
          onPress={clearTodoHandler}
        />
      </View>
      {todoList.length ? (
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.todoList}>
            {todoList.map((item) => (
              <View key={item.id}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <View
                    style={{
                      justifyContent: "center",
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    <Icon
                      name="check-circle-o"
                      size={30}
                      color={item.isChecked ? "grey" : "green"}
                      onPress={() => {
                        item.isChecked = !item.isChecked;
                        setChecked(checked + 1);
                      }}
                    />
                  </View>

                  <View style={styles.todoTextGrid}>
                    <Text
                      style={
                        item.isChecked
                          ? [styles.todo, styles.strike]
                          : styles.todo
                      }
                    >
                      {item.name}
                    </Text>
                  </View>

                  <View
                    style={{
                      // borderColor: "yellow",
                      // borderWidth: 1,
                      justifyContent: "center",
                      paddingHorizontal: 10,
                    }}
                  >
                    <Icon
                      name="trash-o"
                      size={25}
                      color="red"
                      onPress={() => {
                        setTodoList(todoList.filter((i) => i.id !== item.id));
                      }}
                    />
                  </View>
                </View>

                {todoList[todoList.length - 1] === item ? (
                  <Text></Text>
                ) : (
                  <View
                    style={{
                      borderBottomColor: "brown",
                      borderBottomWidth: 1,
                      marginVertical: 10,
                      // marginHorizontal: 10,
                      marginHorizontal: 45,
                    }}
                  ></View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      ) : !newTodo ? (
        <View style={{ margin: "10%", marginTop: "50%" }}>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <Icon
              name="rocket"
              size={80}
              color="#bf1313"
              style={{
                transform: [{ rotateY: "180deg" }],
                position: "absolute",
                left: 0,
              }}
            />
          </Animated.View>
          <View
            style={{
              alignItems: "center",
              padding: 10,
              backgroundColor: "white",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "black",
              }}
            >
              Let's add some todos for today. Remember-
              <Text style={{ backgroundColor: "yellow", color: "black" }}>
                "everything great was once zero"
              </Text>
            </Text>
          </View>
        </View>
      ) : (
        <Text />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
  inputContainer: {
    flexDirection: "column",
    marginTop: "20%",
  },
  input: {
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    marginTop: 30,
    marginHorizontal: 40,
  },
  button: {
    marginHorizontal: 40,
    marginTop: 5,
  },
  head: {
    display: "flex",
    flexDirection: "row",
    marginTop: 60,
    justifyContent: "space-between",
    marginHorizontal: 35,
    marginBottom: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "brown",
  },
  todoList: {
    marginHorizontal: 15,
    // borderColor: "red",
    // borderWidth: 1,
  },
  todoTextGrid: {
    width: "75%",
    // borderColor: "yellow",
    // borderWidth: 1,
    // backgroundColor: "skyblue",
  },
  todo: {
    fontWeight: "bold",
    fontSize: 20,
  },
  strike: {
    textDecorationLine: "line-through",
    color: "grey",
  },
});
