import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";

{/* 事項浮動版面 */}
const TodoModal = ({ list, closeModal }) => {
  const taskCount = list.todo.length; 
  const completedCount = list.todo.filter((todo) => todo.completed).length;

{/* 浮動版面 設定 */}
  const renderTodo = (todo) => {
    return (
      <View style={styles.todoContainer}>
        {/* 事項浮動版面 : 事項區塊 : 確認小框框 */}
        <TouchableOpacity>
          <Ionicons
            name={todo.completed ? "ios-square" : "ios-square-outline"} 
            size={24}
            color={colors.gray}
            style={{ width: 32 }}
          />
        </TouchableOpacity>
        {/* 事項浮動版面 : 事項區塊 : 事項文字 */}
        <Text
          style={[
            styles.todo,
            {
              textDecorationLine: todo.completed ? "line-through" : "none",
              color: todo.completed ? colors.gray : colors.black,
            },
        ]}>
          {todo.title}
        </Text>
      </View>
    );
  };

  return (
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
            完成了 {taskCount} 項中的 {completedCount} 項
          </Text>
        </View>
      </View>
    {/* 事項浮動版面 : 事項區塊 */}    
      <View style={[styles.section, { flex: 3 }]}>
        <FlatList
          data={list.todo}
          renderItem={({ item }) => renderTodo(item)}
          keyExtractor={(item) => item.title}
          contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
          showsVerticalScrollIndicator={false} // 邊邊滾動軸去掉
        />
      </View>
    {/* 事項浮動版面 : 輸入區塊 */}    
      <KeyboardAvoidingView
        style={[styles.section, styles.footer]}
        behavior="padding"
      >
        {/* 事項浮動版面 : 輸入區塊 : 輸入文字 */}
        <TextInput style={[styles.input, { borderColor: list.color }]} />
        {/* 事項浮動版面 : 輸入區塊 : 輸入方塊 */}
        <TouchableOpacity
          style={[styles.addTodo, { backgroundColor: list.color }]}
        >
          <AntDesign name="plus" size={16} color={colors.white} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    fontSize: 16,
  },
});

export default TodoModal;
