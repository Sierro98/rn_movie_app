import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'; // Assuming no_movies_found is exported from here or directly imported

interface EmptyStateProps {
    title: string;
    subtitle: string;
}

const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <View className='justify-center items-center px-4'>
      <Image 
        source={images.no_movies_found} 
        className='w-[270px] h-[215px]' 
        resizeMode='contain'
      />
      <Text className='text-xl text-center font-psemibold text-white mt-2'>{title}</Text>
      <Text className='font-pmedium text-sm text-gray-100'>{subtitle}</Text>
    </View>
  )
}

export default EmptyState
