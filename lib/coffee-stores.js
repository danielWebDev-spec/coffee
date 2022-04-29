// initialize unsplash
import { createApi } from "unsplash-js";

// on your server
const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const getUrlForCoffeeStores = (latLong, limit, query) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&radius=16094&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  try {
    const photos = await unsplashApi.search.getPhotos({
      query: "coffee shop",
      // page: 1,
      perPage: 10,
      // color: "green",
      orientation: "landscape",
    });

    const unsplashResults = photos.response.results;

    const photosResponse = unsplashResults.map(
      (result) => result.urls["small"]
    );

    return photosResponse;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCoffeeStores = async (
  latLong = "29.193614435756047,-81.07031683829798",
  limit = 6
) => {
  try {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
      },
    };

    const photos = await getListOfCoffeeStorePhotos();

    const response = await fetch(
      getUrlForCoffeeStores(latLong, limit, "coffee"),
      options
    );

    const data = await response.json();

    return (
      data.results.map((result, idx) => {
        const neighborhood = result.location.neighborhood;

        return {
          id: result.fsq_id,
          address: result.location.address || "",
          name: result.name,
          neighborhood:
            (neighborhood && neighborhood.length > 0 && neighborhood[0]) ||
            result.location.cross_street ||
            "",
          imgUrl: photos[idx],
        };
      }) || []
    );
  } catch (error) {
    if (
      !process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY ||
      !process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
    ) {
      console.error(
        "🚨 Make sure to setup your API keys, checkout the docs on Github 🚨"
      );
    }
    console.log("Something went wrong fetching coffee stores", error);
    return [];
  }
};
