import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import UploadImagesScreen from "@/components/UploadImagesScreen"; // ✅ import
import AddProject from "@/components/AddProject"; // ✅ import

export default function Page() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <SignedIn>
        

        {/* Optional: still show user + sign out */}
        <View style={styles.userInfo}>
          <Text style={styles.greeting}>
            Hello {user?.emailAddresses[0].emailAddress}
          </Text>
          <SignOutButton />
        </View>
        {/* Show UploadImagesScreen instead of just Hello */}
        {/* <UploadImagesScreen /> */}
        <AddProject />
      </SignedIn>

      <SignedOut>
        <View style={styles.authLinks}>
          <Link href="/(auth)/sign-in">
            <Text style={styles.link}>Sign in</Text>
          </Link>
          <Link href="/(auth)/sign-up">
            <Text style={styles.link}>Sign up</Text>
          </Link>
        </View>
      </SignedOut>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  userInfo: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fafafa",
  },
  greeting: { fontSize: 14, marginBottom: 8, color: "#333" },
  authLinks: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    fontSize: 16,
    marginVertical: 6,
    color: "#2563eb",
    fontWeight: "500",
  },
});
