import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router, useRouter } from "expo-router";
import { Text, View, Image, ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

import React, { useState } from 'react';
import { getTrendingMovies } from "@/services/appwrite";

export default function Index() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
    refetch: reFetchTrendingMovies,
  } = useFetch(getTrendingMovies);

  // Fetching movies with an empty query to get all movies
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: reFetchMovies,
  } = useFetch(() => fetchMovies({
    query: ''
  }));

  const onRefresh = async () => {
    setRefreshing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await reFetchMovies();
    setRefreshing(false);
  };


  if (moviesLoading || trendingMoviesLoading) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );
  }

  if (moviesError || trendingMoviesError) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <Text className="text-white">Error: {moviesError?.message
          || trendingMoviesError?.message}</Text>
      </View>
    );
  }
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        className="mt-2 pb-32"
        renderItem={({ item }) => (
          <MovieCard
            {...item}
          />
        )}

        ListHeaderComponent={
          <>
            <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
            <Text className="text-white text-lg font-bold mt-5 mb-5">
              Latest Movies
            </Text>
          </>
        }
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 100,
          paddingTop: 0,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
            progressViewOffset={top + 10}
          />
        }
      />
    </View>
  );
}
