import { Input, Text, View } from '@tarojs/components'
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
function MyInput({ name, required, label, value, labelAlign, readonly, onChange }: IProps) {
  const handleInput = (e) => {
    const val = e.detail.value
    if (onChange) onChange(val)
  }
  return (
    <View className={`${styles.formItem} ${labelAlign === 'left' ? styles.alignLeft : ''}`}>
      <View className={styles.label}>
        {required && <Text className={styles.required}>*</Text>}
        {label}
      </View>
      {readonly ? (
        <View className={styles.readonly}>{value}</View>
      ) : (
        <Input onInput={handleInput} value={value} name={name} type="text" placeholder="请输入" />
      )}
    </View>
  )
}

export default MyInput
