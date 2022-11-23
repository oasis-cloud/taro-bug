import { Image, Input, Text, View } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { DatePicker } from '@nutui/nutui-react-taro'
import arrowIcon from '@/assets/imgs/form/arrow_right.png'
import styles from './index.module.scss'

interface IProps {
  name: string;
  required?: boolean;
  label: string;
  value?: any;
  labelAlign?: 'left';
  minDate?: Date;
  maxDate?: Date;
  type: 'date' | 'time' | 'year-month' | 'month-day' | 'datehour' | 'datetime';
  readonly?: boolean;
  onChange?: Function
}
function MyDatePicker({
  name,
  required,
  label,
  value,
  labelAlign,
  type,
  minDate,
  maxDate,
  readonly,
  onChange,
}: IProps) {
  const [pickerVisible, setPickerVisible] = useState(false)
  const [currVal, setCurrVal] = useState(value)
  const handles = {
    datetime: (arr) => {
      const date = arr.slice(0, 3)
      const time = arr.slice(3)
      return `${date.join('-')} ${time.join(':')}`
    },
    date: (arr) => {
      const date = arr.slice(0, 3)
      return date.join('-')
    },
  }
  const handleValueChange = (v) => {
    console.log(v)
    const val = handles[type](v)
    setCurrVal(val)
    if (onChange) onChange(val)
  }
  const handleClick = () => {
    if (readonly) return
    setPickerVisible(true)
  }
  useEffect(() => {
    setCurrVal(value)
  }, [value])
  return (
    <View className={`${styles.formItem} ${labelAlign === 'left' ? styles.alignLeft : ''}`}>
      <View className={styles.label}>
        {required && <Text className={styles.required}>*</Text>}
        {label}
      </View>
      <View className={styles.pickerValBox} onClick={handleClick}>
        <Input style={{ display: 'none' }} name={name} value={currVal}></Input>
        {!currVal && <View style={{ color: '#B3B5B9' }}>请选择</View>}
        {currVal && (
          <View>{currVal}</View>
        )}
        {!readonly && <Image src={arrowIcon}></Image>}
      </View>
      <DatePicker
        modelValue={currVal ? new Date(currVal) : new Date()}
        title={label}
        minDate={minDate}
        maxDate={maxDate}
        visible={pickerVisible}
        type={type}
        onCloseDatePicker={() => setPickerVisible(false)}
        onConfirmDatePicker={handleValueChange}
      />
    </View>
  )
}

export default MyDatePicker
