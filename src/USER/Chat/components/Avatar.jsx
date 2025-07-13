import React from 'react'
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from 'react-redux';

const Avatar = ({userId, name, imageUrl, width, height}) => {
    const onlineUser = useSelector(state => state?.user?.onlineUser)
    let avatarName = ""

    if(name){
      const splitName = name?.split(" ")
      if(splitName.length > 1){
        avatarName = splitName[0][0]+splitName[1][0]
      }else{
        avatarName = splitName[0][0]
      }
    }

    const bgColor = [
      'bg-slate-200',
      'bg-teal-200',
      'bg-red-200',
      'bg-green-200',
      'bg-yellow-200',
      'bg-gray-200',
      "bg-cyan-200",
      "bg-sky-200",
      "bg-blue-200"
    ]

    const randomNumber = Math.floor(Math.random() * 9)

    const isOnline = onlineUser.includes(userId)

    const containerStyle = {
      width: `${width}px`,
      height: `${height}px`,
      position: 'relative',
      overflow: 'hidden'
    }

    const imageStyle = {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }

    return (
      <div className={`text-slate-800 rounded-full font-bold relative`} style={containerStyle}>
          {imageUrl ? (
              <img
                  src={imageUrl}
                  alt={name}
                  className='rounded-full'
                  style={imageStyle}
              />
          ) : name ? (
              <div style={containerStyle} className={`rounded-full flex justify-center items-center text-lg ${bgColor[randomNumber]}`}>
                  {avatarName}
              </div>
          ) : (
            <PiUserCircle
              size={width}
              className="w-full h-full"
            />
          )}

          {isOnline && (
              <div className='bg-green-600 p-1 absolute bottom-0 right-0 rounded-full border-2 border-white'></div>
          )}
      </div>
    )
}

export default Avatar
