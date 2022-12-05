import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal
} from "react-native";
import colors from "../constants/colors";
import { useState } from 'react'
import TodoModal from "./TodoModal";


{/* 事項版面 */}
export default TodoList = ({list}) => {
    const [showList, showListVisible] = useState(false)
    const completeCount = list.todo.filter(todo => todo.completed).length; //完成數量計算
    const remainingCount = list.todo.length - completeCount; //未完成數量計算

    const toggleListModal = () => { //顯示 事項浮動版面
        showListVisible(true)
    }
    const closeModal = () => { //關閉 事項浮動版面
        showListVisible(false)
      }


    return (
        <View>
            {/* 事項浮動版面 */}
            <Modal animationType="slide" visible={showList} onRequestClose={() => toggleListModal()}>
                <TodoModal list={list} closeModal={closeModal} />
            </Modal>
            {/* 首頁事項版面 */}
            <TouchableOpacity 
                style={[styles.listContainer, {backgroundColor: list.color}]}
                onPress={() => toggleListModal()}
            >
                {/* 事項版面: 標題 */}
                <Text style={styles.listTitle} numberOfLines={1}>
                    {list.name} 
                </Text>
                {/* 事項版面: 內容 */}
                <View>
                    <View style={{alignItems:"center"}}>
                        <Text style={styles.count}>{completeCount}</Text>
                        <Text style={styles.subtitle}>未完成</Text>
                    </View>
                    <View style={{alignItems:"center"}}>
                        <Text style={styles.count}>{remainingCount}</Text>
                        <Text style={styles.subtitle}>已完成</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12, 
        alignItems: "center",
        width: 200
    },
    listTitle: {
        //事項版面: 標題 : 文字
        fontSize: 24,
        fontWeight: "700",
        color: colors.white,
        marginBottom: 18
    },
    count: {
        //事項版面: 內容 : 數字
        fontSize: 48,
        fontWeight: "200",
        color: colors.white
    },
    subtitle: {
        //事項版面: 內容 : 標題
        fontSize: 12,
        fontWeight: "700",
        color: colors.white
    }
})


