import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../constants/colors";
import backGroundColor from "../constants/backGroundColor";
import tempData from "../global/tempData";


{/* 新增事項浮動版面 */}
const AddListModal = ({ closeModal, addList }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState(backGroundColor[0]);

  const changeHandler = (value) => {
    //使用useState跟TextInput 做連動
    setName(value);
  };

  {/* 新增事項 設定 */}
  const createTodo = (name, color) => { 
    // TODO 2022/12/4 想辦法完成name color 設定 : 完成~
    const list = { name, color }

    addList({list});
    setName("");//清除輸入區域
    closeModal();//關閉浮動版面
  }

  {/* 事項的版面顏色 設定 */}
  const renderColors = () => { //在backGroundColor.js  設定顏色
    return backGroundColor.map(color => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => setColor(color)}
        />
      );
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" >
        <TouchableOpacity style={styles.closeIcon} onPress={closeModal}>
            <AntDesign name="close" size={24} color={colors.black} />
        </TouchableOpacity>

        <View style={styles.addTodoModal}>
            <Text style={styles.title}>建立待辦事項</Text>

            {/*輸入區域*/}
            <TextInput
            style={styles.input}
            placeholder="要做啥?"
            value={name}
            onChangeText={changeHandler}
            />

            <View style={styles.colorSelectView} >
                {renderColors()}
            </View>

            {/*建立按鈕*/}
            <TouchableOpacity
            style={[styles.create, { backgroundColor: color }]}
            onPress={() => createTodo(name, color)}
            >
            <Text style={styles.createText}>建立~</Text>
            </TouchableOpacity>

        </View>

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    //右上叉叉設定
    position: "absolute",
    top: 64,
    right: 32,
  },
  addTodoModal: {
    //中間區塊設定
    alignSelf: "stretch",
    marginHorizontal: 32,
  },
  title: {
    //待辦事項 文字設定
    fontSize: 28,
    fontWeight: "800",
    color: colors.black,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    //輸入文字區塊
    borderWidth: 2,
    borderColor: colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    //建立按鈕
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  createText: {
    //建立按鈕文字
    color: colors.white,
    fontWeight: "600",
    fontSize: 20
  },
  colorSelectView: {
    //顏色方塊排列
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
  },
  colorSelect: {
    //顏色方塊
    width: 30,
    height: 30,
    borderRadius: 4
  },
});

export default AddListModal;
