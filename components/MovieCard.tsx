import { View, Text, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'
import { BlurView } from 'expo-blur'
import * as Haptics from 'expo-haptics'

const MovieCard = ({ id, poster_path, title, vote_average, release_date }: Movie) => {
    const [isLongPressed, setIsLongPressed] = useState(false);

    const handleLongPress = async () => {
        // Trigger haptic feedback
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setIsLongPressed(true);
    };

    const formatDate = (date: string) => {
        if (!date) return 'Unknown';
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    return (
        <Link href={`/movies/${id}`} asChild>
            <Pressable 
                className='w-[30%]'
                onLongPress={handleLongPress}
                onPressOut={() => setIsLongPressed(false)}
                delayLongPress={200}
            >
                <View className='relative'>
                    <Image
                        source={{
                            uri: poster_path
                                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                                : 'https://via.placeholder.com/150'
                        }}
                        className='w-full h-40 rounded-lg mb-2'
                        resizeMode='cover'
                    />
                    {isLongPressed && (
                        <BlurView
                            intensity={70}
                            tint="dark"
                            className='absolute top-0 left-0 right-0 bottom-0 rounded-lg items-center justify-center px-2'
                        >
                            <Text className='text-white text-center font-bold mb-1'>
                                Release Date
                            </Text>
                            <Text className='text-white text-center mb-4'>
                                {formatDate(release_date)}
                            </Text>
                            <View className='flex-row justify-center items-center gap-1'>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Image 
                                        key={star}
                                        source={icons.star}
                                        className='size-4'
                                        style={{
                                            opacity: star <= Math.round(vote_average / 2) ? 1 : 0.3
                                        }}
                                    />
                                ))}
                            </View>
                            <Text className='text-white text-center mt-1'>
                                {Math.round(vote_average / 2)}/5
                            </Text>
                        </BlurView>
                    )}
                </View>
                <Text className='text-sm font-bold text-white' numberOfLines={1}>{title}</Text>
                <View className='flex-row items-center justify-start gap-x-1'>
                    <Image source={icons.star} className='size-4' />
                    <Text className='text-sm text-white font-bold uppercase'>{Math.round(vote_average / 2)}</Text>
                </View>
                <View className='flex-row items-center justify-between'>
                    <Text className='text-sm text-light-300 font-medium mt-1'>
                        {release_date?.split('-')[0]}
                    </Text>
                </View>
            </Pressable>
        </Link>
    )
}

export default MovieCard