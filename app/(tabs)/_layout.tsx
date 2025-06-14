import { View, Text, Image, useWindowDimensions, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { icons } from '@/constants/icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const iconMap: { [key: string]: any } = {
    'index': icons.home,
    'search': icons.search,
    'saved': icons.save,
    'profile': icons.person,
};

const titleMap: { [key: string]: string } = {
    'index': 'Home',
    'search': 'Search',
    'saved': 'Saved',
    'profile': 'Profile',
};

// Icon that is not focused
const StaticIcon = ({ icon }: { icon: any }) => (
    <View className='flex-1 justify-center items-center'>
        <Image
            source={icon}
            tintColor="#A8B5DB"
            className='size-5'
            resizeMode='contain'
        />
    </View>
);

// Icon that is focused, inside the blob
const AnimatedIcon = ({ icon, title }: { icon: any, title: string }) => (
    <View className='flex-row justify-center items-center'>
        <Image
            source={icon}
            tintColor="#151312"
            className='size-5'
            resizeMode='contain'
        />
        <Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
    </View>
);

const AnimatedTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const { width } = useWindowDimensions();
    // The tab bar has marginHorizontal: 20, so we subtract 40 from the total width.
    const TAB_BAR_WIDTH = width - 40;
    const TAB_WIDTH = TAB_BAR_WIDTH / state.routes.length;
    const translateX = useSharedValue(0);

    const handlePress = (index: number) => {
        navigation.navigate(state.routes[index].name);
    };

    React.useEffect(() => {
        translateX.value = withSpring(state.index * TAB_WIDTH, {
            damping: 18,
            stiffness: 120,
        });
    }, [state.index, TAB_WIDTH, translateX]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
            width: TAB_WIDTH,
            height: '100%',
            position: 'absolute',
            // I'm using a solid color as a placeholder for the highlight image.
            // You can replace this with a LinearGradient or an ImageBackground.
            backgroundColor: '#FFA500',
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
        };
    });

    return (
        <View style={styles.tabBarContainer}>
            <Animated.View style={animatedStyle}>
                <AnimatedIcon
                    icon={iconMap[state.routes[state.index].name]}
                    title={titleMap[state.routes[state.index].name]}
                />
            </Animated.View>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                return (
                    <Pressable
                        key={route.key}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => handlePress(index)}
                    >
                        {!isFocused && <StaticIcon icon={iconMap[route.name]} />}
                    </Pressable>
                );
            })}
        </View>
    );
};

const _layout = () => {
    return (
        <Tabs
            tabBar={props => <AnimatedTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen name="index" />
            <Tabs.Screen name="search" />
            <Tabs.Screen name="saved" />
            <Tabs.Screen name="profile" />
        </Tabs>
    );
};

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 36,
        left: 20,
        right: 20,
        height: 52,
        borderRadius: 50,
        backgroundColor: '#0f0D23',
        borderWidth: 1,
        borderColor: '#0f0D23',
    },
});

export default _layout;