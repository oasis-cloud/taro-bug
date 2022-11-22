import { Image, Input, Text, View } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { getImgUrl, uploadImage } from '@/common/utils'
import addIcon from '@/assets/imgs/form/add.png'
import closeIcon from '@/assets/imgs/form/close.png'
import styles from './index.module.scss'

interface IProps {
  name: string;
  required?: boolean;
  label: string;
  value?: string;
  example?: any;
  readonly?: boolean;
  onChange?: Function
}
function MyUpload({ name, required, label, value, example, readonly, onChange }: IProps) {
  const [currVal, setCurrVal] = useState<string>('') // 附件ID
  const handleUpload = () => {
    if (readonly) return
    uploadImage().then((fileId: string) => {
      console.log('附件ID', fileId)
      setCurrVal(fileId)
      if (onChange) onChange(fileId)
    })
  }
  const deleteImage = () => {
    setCurrVal('')
  }
  useEffect(() => {
    setCurrVal(value || '')
  }, [value])
  return (
    <View className={styles.formItem}>
      <View className={styles.label}>
        {required && <Text className={styles.required}>*</Text>}
        {label}
      </View>
      <View className={styles.uploadBox}>
        <Input style={{ display: 'none' }} name={name} value={currVal}></Input>
        <View className={styles.upload}>
          {currVal ? (
            <Image className={styles.preview} src={getImgUrl(currVal)}></Image>
          ) : (
            <View className={styles.add} onClick={() => handleUpload()}>
              <Image src={addIcon}></Image>
            </View>
          )}
          {currVal && !readonly && <Image className={styles.del} src={closeIcon} onClick={deleteImage}></Image>}
        </View>
        {example && (
          <View className={styles.example}>
            <View>示例</View>
            <Image src={example}></Image>
          </View>
        )}
      </View>
    </View>
  )
}

export default MyUpload
