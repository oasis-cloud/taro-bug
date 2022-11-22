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
  maxlength?: number;
  className?: any;
  onChange?: Function;
}
function MyMultiUpload({ name, required, label, value, example, maxlength = 1, className, onChange }: IProps) {
  const [currVal, setCurrVal] = useState<any>([]) // 附件ID
  useEffect(() => {
    if (!value) return
    let fileIds = value?.split(',')
    fileIds = fileIds.length >= maxlength ? fileIds.slice(0, maxlength) : fileIds
    setCurrVal(fileIds)
  }, [value])

  useEffect(() => {
    if (onChange) {
      onChange(currVal.join(','))
    }
  }, [currVal])
  const handleUpload = () => {
    uploadImage().then((fileId: string) => {
      console.log('附件ID', fileId)
      setCurrVal([...currVal, fileId])
    })
  }
  const deleteImage = (idx) => {
    const newVal = currVal
    newVal.splice(idx, 1)
    console.log(newVal)
    setCurrVal([...newVal])
  }
  return (
    <View className={`${styles.formItem} ${className}`}>
      <View className={styles.label}>
        {required && <Text className={styles.required}>*</Text>}
        {label}
      </View>
      <View className={styles.uploadBox}>
        <Input style={{ display: 'none' }} name={name} value={currVal.join(',')}></Input>
        <View className={styles.uploadArea}>
          {
            currVal.map((item, idx) => (
              <View className={styles.uploadItem} key={item}>
                <Image className={styles.preview} src={getImgUrl(item)}></Image>
                <Image className={styles.del} src={closeIcon} onClick={() => deleteImage(idx)} />
              </View>
            ))
          }
          {
            currVal.length < maxlength && (
              <View className={styles.uploadItem}>
                <View className={styles.add} onClick={() => handleUpload()}>
                  <Image src={addIcon}></Image>
                </View>
              </View>
            )
          }
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

export default MyMultiUpload
