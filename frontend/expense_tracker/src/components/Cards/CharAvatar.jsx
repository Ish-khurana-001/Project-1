import React from 'react'
import { getInitials } from '../../utils/helper'

const CharAvatar = ({ fullName, width, height, style }) => {
  return (
    <div className={`${width || 'w-12'} ${height || 'h-12'} flex items-center justify-center rounded-full bg-gray-100 text-gray-900 font-medium dark:bg-slate-800 dark:text-slate-100 ${style || ''}`}>
        {getInitials(fullName || "")}
    </div>
  )
}

export default CharAvatar
