import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import SearchBar from "@/components/SearchBar";
import { icons } from '@/constants/icons'
import EmptyState from '@/components/EmptyState'

const search = () => {

  const [searchQuery, setSearchQuery] = useState('');

  // Fetching movies with an empty query to get all movies
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset: resetMovies,
  } = useFetch(() => fetchMovies({
    query: searchQuery,
  }), false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchQuery.trim()) {
        loadMovies();
      } else {
        resetMovies();
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute z-0 w-full'
        resizeMode='cover' />
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieCard {...item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        className="mt-2 pb-32"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 100,
          paddingTop: 0,
          flexGrow: (!moviesLoading && !moviesError && searchQuery.trim()) ? 1 : undefined,
        }}
        ListHeaderComponent={
          <View>
            <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
            <SearchBar
              placeholder='Search for a movie'
              value={searchQuery}
              onChangeText={(text: string) => setSearchQuery(text)}
            />
            {moviesLoading && (
              <ActivityIndicator size='large' color='#0000ff' />
            )}
            {moviesError && (
              <Text className="text-red-500 px-5 my-3">Error: {moviesError?.message}</Text>
            )}
            {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-white text-lg font-bold mt-5 mb-5">
                Search results for {' '}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </View>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError && searchQuery.trim() ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <EmptyState title="No movies found" subtitle="Try a different search" />
            </View>
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />

    </View>
  )
}

export default search 