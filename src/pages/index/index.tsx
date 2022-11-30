import { useEffect, useReducer, useState } from 'react'
import Taro, { useLoad } from '@tarojs/taro'
import { Image, Text, View } from '@tarojs/components'
import { Button, Rate } from '@nutui/nutui-react-taro'
import InfiniteScroll from '@/components/InfiniteScroll'
import styles from './index.module.scss'
import { MyDatePicker } from '@/components/FormItem'

function Index() {
  const [activityList, setActivityList] = useState<any[]>([])
  const [pageNum, setPageNum] = useState(1)
  const [noMore, setNoMore] = useState(false)
  const [refreshTimes, updateRefreshTimes] = useReducer((x) => x + 1, 0)
  const onReachBottom = () => {
    setPageNum(pageNum + 1)
  }
  const onRefresh = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, 300)
    })
  }
  useLoad(() => {
    setActivityList([
      { name: '1' },
      { name: '2' },
      { name: '3' },
      { name: '4' },
      { name: '5' },
      { name: '6' },
    ])
  })
  const handleClick = () => {
    Taro.showActionSheet({
      itemList: ['1', '2', '3'],
      success(res) {
      },
    })
  }
  return (
    <View className={styles.indexPage}>
      <MyDatePicker type="date" label="测试" name="666" />
      <Rate modelValue={3} />
      <Button onClick={handleClick}>666</Button>
    </View>
  )
}

export default Index
