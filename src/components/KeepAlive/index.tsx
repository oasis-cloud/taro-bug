import { useEffect, useState } from 'react'
import { getDic } from '@/apis/baseServer'
import globalData from '@/common/globalData'

interface IProps {
  children: any;
}
function WrapperComponent({ children }: IProps) {
  const [already, setAlready] = useState(false)
  const getInitData = () => {
    const handles = {
      0: (data) => {
        console.log('DIC', data)
        globalData.dic = data
      },
    }
    Promise.all([getDic()])
      .then((res) => {
        res.forEach((data, i) => handles[i](data))
        setAlready(true)
      })
      .catch(() => {
        setAlready(true)
      })
  }
  useEffect(() => {
    getInitData()
  }, [])
  return already && children
}
const keepAlive = (Component) => {
  return function (props) {
    return (
      <WrapperComponent>
        <Component {...props} />
      </WrapperComponent>
    )
  }
}

export { keepAlive }
