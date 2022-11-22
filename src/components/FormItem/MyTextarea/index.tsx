import { Text, Textarea, View } from '@tarojs/components'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'

interface IProps {
  name: string;
  required?: boolean;
  label: string;
  maxlength: number;
  value?: string;
  onChange?: Function;
  className?: any;
  readonly?: boolean;
}
function MyTextarea({ name, required, label, maxlength, value, readonly, onChange, className }: IProps) {
  const [currVal, setCurrVal] = useState('')
  const handleInput = (v) => {
    setCurrVal(v)
    if (onChange) {
      onChange(v)
    }
  }
  useEffect(() => {
    setCurrVal(value || '')
  }, [value])
  return (
    <View className={`${styles.formItem} ${className}`}>
      <View className={styles.label}>
        {required && <Text className={styles.required}>*</Text>}
        {label}
      </View>
      <View className={styles.textareaBox}>
        {readonly ? (
          <View className={styles.readonly}>{value}</View>
        ) : (
          <Textarea value={value} onInput={(e) => handleInput(e.detail.value)} name={name} maxlength={maxlength} placeholder="请输入"></Textarea>
        )}
        <View className={styles.limitHint}>
          {currVal.length}
          /
          {maxlength}
        </View>
      </View>
    </View>
  )
}

export default MyTextarea
