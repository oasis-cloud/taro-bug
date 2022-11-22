import { Image, ScrollView, Text, View } from '@tarojs/components'
import { useEffect, useRef, useState } from 'react'
import { PullToRefresh } from '@nutui/nutui-react-taro'
import loadingGif from '@/assets/imgs/loading.gif'
import styles from './index.module.scss'

interface IProps {
  children: any;
  noMore: boolean;
  onReachBottom: Function;
  reloadDeps?: any; // reloadDeps改变会回到列表顶部
  onRefresh?: () => Promise<any>
  refresherEnabled?: boolean
}
function InfiniteScroll({
  children,
  noMore,
  onReachBottom,
  reloadDeps,
  onRefresh,
  refresherEnabled = false,
}: IProps) {
  const scrollBoxRef = useRef<HTMLElement>()
  const [scrollTop, setScrollTop] = useState(0)
  useEffect(() => {
    setScrollTop(0)
  }, [reloadDeps])
  const onScrollToLower = () => {
    if (noMore) return
    onReachBottom()
  }
  return (
    <View className={styles.container}>
      <PullToRefresh disabled={!refresherEnabled} onRefresh={onRefresh}>
        <ScrollView
          ref={scrollBoxRef}
          scrollY
          className={styles.scrollBox}
          scrollTop={scrollTop}
          onScrollToLower={onScrollToLower}
        >
          {children}
          {noMore ? (
            <View className={styles.noMore}>{children[0] ? '暂无更多' : '未查询到数据'}</View>
          ) : (
            <View className={styles.loadMore}>
              <Image className={styles.loading} src={loadingGif} />
              <Text>加载中</Text>
            </View>
          )}
        </ScrollView>
      </PullToRefresh>
    </View>
  )
}

export default InfiniteScroll
