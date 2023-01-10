import { View } from '@tarojs/components'

function Index() {
  return (
    <View >
      <View>
        按照 React 的使用方式，maxLength={5} 不生效
      </View>
      <input className='input' maxLength={5}/>
      <View>
        不按照 React 的使用方式，maxlength={5} 生效, 但是有类型错误
      </View>
      <input className='input' maxlength={5}/>
    </View>
  )
}

export default Index
