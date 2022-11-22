import { Input, Text, View } from '@tarojs/components'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'

interface IProps {
  name: string;
  required?: boolean;
  label: string;
  value?: string;
  labelAlign?: 'left';
  readonly?: boolean;
  onChange?: Function;
}
function MyDoubleInput({ name, required, label, value, labelAlign, readonly, onChange }: IProps) {
  const [names, setNames] = useState<string[]>([])
  const [values, setValues] = useState<string[]>([])
  useEffect(() => {
    if (!value) return
    setValues(value?.split(','))
  }, [value])
  useEffect(() => {
    if (!name) return
    setNames(name?.split(','))
  }, [name])
  const handleInput = (i, e) => {
    const next = values
    next[i] = e.detail.value
    setValues(next)
    if (onChange) onChange(next)
  }
  return (
    <View className={`${styles.formItem} ${labelAlign === 'left' ? styles.alignLeft : ''}`}>
      <View className={styles.label}>
        {required && <Text className={styles.required}>*</Text>}
        {label}
      </View>
      <View className={styles.doubleInput}>
        {readonly ? (
          <View className={styles.readonly}>{values[0]}</View>
        ) : (
          <Input onInput={(e) => handleInput(0, e)} value={values[0]} name={names[0]} type="text" placeholder="请输入" />
        )}
        <Text>到</Text>
        {readonly ? (
          <View className={styles.readonly}>{values[1]}</View>
        ) : (
          <Input onInput={(e) => handleInput(1, e)} value={values[1]} name={names[1]} type="text" placeholder="请输入" />
        )}
      </View>
    </View>
  )
}

export default MyDoubleInput
