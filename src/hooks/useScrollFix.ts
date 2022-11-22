import { useLayoutEffect } from 'react'
import { $ } from '@tarojs/extend'

interface IProps {
  lock: boolean;
  scrollId: string | undefined;
}

function useScrollFix({ lock, scrollId }:IProps) {
  useLayoutEffect(() => {
    const appEl = $(`#${scrollId}`)[0]
    if (!appEl) return
    const originalTop = appEl.scrollTop
    if (lock) {
      appEl.style.overflow = 'hidden'
    } else {
      appEl.style.overflow = 'auto'
    }
    appEl.scrollTop = originalTop
  }, [lock])
}

export default useScrollFix
