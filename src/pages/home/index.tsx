import { useEffect } from 'react'
import { useDidHide, useDidShow, useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import styles from './index.module.scss'

function Home() {
  const router = useRouter()

  useEffect(() => {})

  useDidShow(() => {})

  useDidHide(() => {})

  return (
    <View className={styles.homePage}>
      Home
    </View>
  )
}

export default Home
