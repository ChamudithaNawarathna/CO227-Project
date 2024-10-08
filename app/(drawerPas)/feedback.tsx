import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";
import { ThemedText } from "@/components/CommonModules/ThemedText";

interface Testimonial {
  id: number;
  name: string;
  userType: string;
  rating: number;
  note: string;
}

const FeedbackScreen = () => {
  const { baseURL, credits, myTickets } = useAppContext();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch testimonials from the backend
    axios
      .get(`${baseURL}/feedback/get/`)
      .then((response) => {
        setTestimonials(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch feedback.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ThemedText>Loading...</ThemedText>;
  }

  if (error) {
    return <ThemedText>{error}</ThemedText>;
  }

  return (
    <View>
      <FlatList
        data={testimonials}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <ThemedText>Name: {item.name}</ThemedText>
            <ThemedText>User Type: {item.userType}</ThemedText>
            <ThemedText>Rating: {item.rating}</ThemedText>
            <ThemedText>Note: {item.note}</ThemedText>
          </View>
        )}
      />
    </View>
  );
};

export default FeedbackScreen;
