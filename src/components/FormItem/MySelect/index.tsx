import { Image, Input, Text, View } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { Picker } from '@nutui/nutui-react-taro'
import arrowIcon from '@/assets/imgs/form/arrow_right.png'
import styles from './index.module.scss'

interface IProps {
  value?: string;
  name: string;
  required?: boolean;
  label: string;
  dataSource: any[] | undefined;
  labelAlign?: 'left';
  readonly?: boolean;
  onChange?: Function
}
interface ICurrVal {
  value?: any;
  text?: string;
}
function MySelect({ name, required, label, dataSource, value, labelAlign, readonly, onChange }: IProps) {
  const [pickerVisible, setPickerVisible] = useState(false)
  const [currVal, setCurrVal] = useState<ICurrVal>({})
  const [sourceArr, setSourceArr] = useState<any>([])
  const handleValueChange = (v) => {
    const ls = sourceArr?.filter((item) => item.value == v[0]) || []
    const val = ls[0]
    if (val) {
      setCurrVal(val)
      if (onChange) onChange(val.value, val)
    }
  }
  useEffect(() => {
    if (!dataSource || !dataSource[0]) return
    const arr = dataSource?.map((item) => {
      return {
        text: item.label,
        value: item.value,
      }
    })
    setSourceArr(arr)
  }, [dataSource])

  useEffect(() => {
    handleValueChange([value])
  }, [value])
  const handleClick = () => {
    if (readonly) return
    setPickerVisible(true)
  }
  return (
    <View className={`${styles.formItem} ${labelAlign === 'left' ? styles.alignLeft : ''}`}>
      <View className={styles.label}>
        {required && <Text className={styles.required}>*</Text>}
        {label}
      </View>
      <View className={styles.pickerValBox} onClick={handleClick}>
        <Input style={{ display: 'none' }} name={name} value={currVal.value}></Input>
        {!currVal.text && <View style={{ color: '#B3B5B9' }}>请选择</View>}
        {currVal.text && (
          <View>{currVal.text}</View>
        )}
        {!readonly && <Image src={arrowIcon}></Image>}
      </View>
      <Picker
        isVisible={pickerVisible}
        listData={sourceArr}
        onConfirm={handleValueChange}
        onClose={() => setPickerVisible(false)}
      />
    </View>
  )
}

export default MySelect
