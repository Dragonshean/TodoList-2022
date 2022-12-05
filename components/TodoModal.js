import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard
} from "react-native";
import { useState } from 'react'
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";

{/* 事項浮動版面 */}
const TodoModal = ({ list, closeModal, updateList }) => {
  const taskCount = list.todo.length; 
  const completedCount = list.todo.filter((todo) => todo.completed).length;

  const [newTodo, setNewTodo] = useState('')  

  const toggleTodoCompleted = (index) => { //事項浮動版面 : 事項區塊  改變設定
    list.todo[index].completed = !list.todo[index].completed;
    updateList(list);
  }

  const changeHandler = (text) => { //事項浮動版面 : 輸入區塊 : 輸入文字
    //使用useState跟TextInput 做連動
    setNewTodo(text);
  };

  const addTodo = () => { //新增 tempData 裡面的todo
    list.todo.push({ title:newTodo, completed: false });

    updateList(list); //更新tempData
    setNewTodo(''); //清空輸入區域
    Keyboard.dismiss(); //按完新增  收起鍵盤
  }


{/* 浮動版面 設定 */}
  const renderTodo = (todo, index) => {
    return (
      <View style={styles.todoContainer}>
        {/* 事項浮動版面 : 事項區塊 : 確認小框框 */}
        <TouchableOpacity onPress={() => toggleTodoCompleted(index)}>
          <Ionicons
            name={todo.completed ? "checkbox" : "ios-square"} 
            size={30}
            color={todo.completed ? colors.button : colors.gray}
            style={{ width: 40 }}
          />
        </TouchableOpacity>
        {/* 事項浮動版面 : 事項區塊 : 事項文字 */}
        <Text
          style={[
              styles.todo,
              {
                  textDecorationLine: todo.completed ? "line-through" : "none",
                  color: todo.completed ? colors.lightGray : colors.red,
                },
            ]}>
          {todo.title}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <SafeAreaView style={styles.container}>
        {/* 事項浮動版面 : 右上角叉叉 */}
        <TouchableOpacity
            style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
            onPress={closeModal}
        >
            <AntDesign name="close" size={24} color={colors.black} />
        </TouchableOpacity>
        {/* 事項浮動版面 : 標題區塊 */}
        <View
            style={[
            styles.section,
            styles.header,
            { borderBottomColor: list.color },
            ]}
        >
            {/* 事項浮動版面 : 標題區塊 : 標題文字 */}
            <View>
            <Text style={styles.title}>{list.name}</Text>
            <Text style={styles.taskCount}>
                總共 {taskCount} 項 - 完成 {completedCount} 項
            </Text>
            </View>
        </View>
        {/* 事項浮動版面 : 事項區塊 */}    
        <View style={[styles.section, { flex: 3 }]}>
            <FlatList
            data={list.todo}
            renderItem={({ item, index }) => renderTodo(item, index)}
            keyExtractor={(item) => item.title}
            contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
            showsVerticalScrollIndicator={false} // 邊邊滾動軸去掉
            />
        </View>
        {/* 事項浮動版面 : 輸入區塊 */}    
        <View
            style={[styles.section, styles.footer]}
        >
            {/* 事項浮動版面 : 輸入區塊 : 輸入文字 */}
            <TextInput 
                value={newTodo} 
                onChangeText={changeHandler} 
                style={[styles.input, { borderColor: list.color }]} 
            />
            {/* 事項浮動版面 : 輸入區塊 : 輸入方塊 */}
            <TouchableOpacity
            style={[styles.addTodo, { backgroundColor: list.color }]}
            onPress={() => addTodo()}
            >
            <AntDesign name="plus" size={16} color={colors.white} />
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    // 區塊設定
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    // 標題區塊
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    //標題文字 : 上方
    fontSize: 30,
    fontWeight: "800",
    color: colors.black,
  },
  taskCount: {
    // 標題文字 : 下方
    fontSize: 20,
    marginTop: 4,
    marginBottom: 16,
    color: colors.red,
    fontWeight: "600",
  },
  footer: {
    //輸入區塊
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    //輸入區塊 : 輸入文字
    flex: 1,
    height: 48,
    borderWidth: 2,
    marginRight: 8,
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  addTodo: {
    //輸入區塊 : 輸入方塊
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  todoContainer: {
    //事項區塊
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  todo: {
    //事項區塊 : 事項文字
    color: colors.black,
    fontWeight: "700",
    fontSize: 25,
  },
});

export default TodoModal;
