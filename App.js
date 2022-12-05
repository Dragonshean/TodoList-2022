import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "./constants/colors";
import tempData from "./global/tempData";
import TodoList from './components/TodoList'
import { useState } from "react"
import AddListModal from "./components/AddListModal";



export default function App() {

  const [addTodoVisible, setAddTodoVisible] = useState(false) //新增事項浮動版面 是否顯示控制
  const [lists, setLists] = useState(tempData) //事項資料

  const toggleAddTodoModal = () => { //顯示 新增事項浮動版面
    setAddTodoVisible(true)
  }

  const closeModal = () => {  // 關閉  新增事項浮動版面
    setAddTodoVisible(false)
  }


  const renderList = (list) => { // 首頁下方 待辦事項區塊  連動TodoList.js
    return (
      <TodoList list={list} />
    )
  }

  // TODO 要完成新增功能  不會顯示在首頁  要解決
  const addList = ({list}) => {
    setLists((list) => {
      return [...list, {...list, key: lists.length + 1, todo: []}]
    })
  }


  return (
    <View style={styles.container}>
      {/* 新增事項浮動版面 */}
      <Modal animationType="slide" visible= {addTodoVisible} onRequestClose={() => toggleAddTodoModal()}>
        <AddListModal closeModal={closeModal} addList={addList} />
      </Modal>
      {/* 標題:待辦事項 區塊 */}
      <View style={{ flexDirection: "row" }}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          待辦 <Text style={styles.titleRight}>事項</Text>
        </Text>
        <View style={styles.divider} />
      </View>
      {/* 新增按鈕 文字  區塊 */}
      <View style={{ marginVertical: 48 }}>
        <TouchableOpacity style={styles.addList} onPress= { () => toggleAddTodoModal()}>
          <AntDesign name="plus" size={16} color={colors.pink} />
        </TouchableOpacity>
        <Text style={styles.add}>新增</Text>
      </View>
      {/* 事項版面 區塊 */}
      <View style={{ height: 275, paddingLeft: 32 }}>
        <FlatList
          data={lists}
          keyExtractor={item => item.name}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderList(item)}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    //標題左右橫線
    backgroundColor: colors.lightBlue,
    height: 5,
    flex: 1,
    alignSelf: "center",
    borderRadius: 10,
  },
  title: {
    //標題左邊字
    fontSize: 38,
    fontWeight: "800",
    color: colors.black,
    paddingHorizontal: 64,
  },
  titleRight: {
    //標題右邊字
    fontWeight: "300",
    color: colors.blue,
  },
  addList: {
    //新增按鈕
    borderWidth: 2,
    borderColor: colors.red,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    //新增文字
    color: colors.red,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});
