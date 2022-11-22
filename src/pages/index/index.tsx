import { useEffect, useReducer, useState } from 'react'
import Taro, { useLoad } from '@tarojs/taro'
import { Image, Text, View } from '@tarojs/components'
import { Button } from '@nutui/nutui-react-taro'
import InfiniteScroll from '@/components/InfiniteScroll'
import styles from './index.module.scss'

function Index() {
  const [activityList, setActivityList] = useState<any[]>([])
  const [pageNum, setPageNum] = useState(1)
  const [noMore, setNoMore] = useState(false)
  const [refreshTimes, updateRefreshTimes] = useReducer((x) => x + 1, 0)
  const onReachBottom = () => {
    setPageNum(pageNum + 1)
  }
  const onRefresh = () => {
    debugger
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
  return (
    <View className={styles.indexPage}>
      <View className={styles.listBox}>
        <InfiniteScroll
          refresherEnabled
          onRefresh={onRefresh}
          noMore={noMore}
          onReachBottom={onReachBottom}
          reloadDeps={refreshTimes}
        >
          {activityList.map((item) => (
            <View className={styles.listItem} key={item.id}>
              {item.name}
            </View>
          ))}
        </InfiniteScroll>
      </View>
      <Button type="danger" onClick={() => updateRefreshTimes()} className={styles.btn}>点这里回顶部</Button>
    </View>
  )
}

export default Index
