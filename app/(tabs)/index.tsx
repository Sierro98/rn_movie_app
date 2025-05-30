import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router, useRouter } from "expo-router";
import { Text, View, Image, ScrollView, ActivityIndicator } from "react-native";

export default function Index() {
  const router = useRouter();
  // Fetching movies with an empty query to get all movies
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({
    query: ''
  }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10
        }}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {moviesLoading ? (
          <ActivityIndicator
            size='large'
            color='#0000ff'
            className="mt-10 self-center" />
        ) : moviesError ? (
          <Text className="text-white">Error: {moviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder='Search for a movie' />
            <>
              <Text
                className="text-white text-lg font-bold mt-5 mb-3">
                Latest Movies
              </Text>
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
